from scipy.stats import (
    shapiro,
    levene,
    ttest_rel,
    wilcoxon,
    ttest_ind,
    mannwhitneyu,
    f_oneway,
    kruskal,
    friedmanchisquare,
)
from app.stat.schemes import TtestRequest, StatResponse, AnovaResponse, AnovaRequest
import pandas as pd
import pingouin as pg
from core.logger import logger


class StatService:
    def __init__(self):
        self.alpha = 0.05

    def run_ttest(self, data: TtestRequest) -> StatResponse:
        if data.paired:
            return self._run_paired_test(data)
        return self._run_unpaired_test(data)

    def run_group_test(self, data: AnovaRequest) -> AnovaResponse:
        return self._run_group_test(data)

    # =======================
    # PRIVATE METHOD SECTION
    # =======================

    def _run_paired_test(self, data: TtestRequest) -> StatResponse:
        n1, n2 = len(data.group1), len(data.group2)
        if n1 != n2:
            logger.error(
                "Paired test error: group1 size (%d) != group2 size (%d)", n1, n2
            )
            raise ValueError("For paired test, both groups must have the same size")

        diff = [x - y for x, y in zip(data.group1, data.group2)]
        normal = self._is_normal(diff)

        if normal:
            result = ttest_rel(data.group1, data.group2)
            test_type = "paired sample T-test"
        else:
            result = wilcoxon(data.group1, data.group2)
            test_type = "Wilcoxon signed-rank test"

        return self._build_stat_response(result, test_type)

    def _run_unpaired_test(self, data: TtestRequest) -> StatResponse:
        normal1 = self._is_normal(data.group1)
        normal2 = self._is_normal(data.group2)
        normal = normal1 and normal2

        equal_var = self._is_variance_equal_2groups(data.group1, data.group2)

        if normal:
            if equal_var:
                result = ttest_ind(data.group1, data.group2, equal_var=True)
                test_type = "independent T-test"
            else:
                result = ttest_ind(data.group1, data.group2, equal_var=False)
                test_type = "Welch’s T-test"
        else:
            result = mannwhitneyu(data.group1, data.group2, alternative="two-sided")
            test_type = "Mann-Whitney U test"

        return self._build_stat_response(result, test_type)

    def _run_group_test(self, data: AnovaRequest) -> AnovaResponse:
        groups = data.groups
        if len(groups) < 3:
            logger.error(
                "Group test error: less than 3 groups provided (%d groups)", len(groups)
            )
            raise ValueError(
                "At least 3 groups are required for ANOVA, Kruskal-Wallis, or Friedman test."
            )

        num_subjects = len(groups[0])
        if not all(len(g) == num_subjects for g in groups):
            raise ValueError("All conditions must have the same number of subjects.")

        all_normal = self._is_normal_all(groups)

        if data.repeated:
            return self._run_repeated_anova(groups, all_normal)

        equal_var = self._is_variance_equal(groups)
        if all_normal and equal_var:
            result = f_oneway(*groups)
            test_type = "One-way ANOVA"
        else:
            result = kruskal(*groups)
            test_type = "Kruskal-Wallis H test"

        return self._build_anova_response(result, test_type)

    def _run_repeated_anova(
        self, groups: list[list[float]], all_normal: bool
    ) -> AnovaResponse:
        if all_normal:
            df_wide = pd.DataFrame(groups).T
            df_wide["id"] = df_wide.index + 1
            df_long = pd.melt(
                df_wide, id_vars="id", var_name="group", value_name="score"
            )

            try:
                pg_result = pg.rm_anova(
                    dv="score",
                    within="group",
                    subject="id",
                    data=df_long,
                    detailed=True,
                )
                stat = pg_result["F"].iloc[0]
                p_value = pg_result["p-unc"].iloc[0]
                test_type = "Repeated Measures ANOVA (Pingouin)"

                conclusion = (
                    "Reject H0, there is a significant difference between the groups"
                    if p_value < self.alpha
                    else "Fail to reject H0, there is no significant difference between the groups"
                )

                return AnovaResponse(
                    stat=round(stat, 4),
                    p_value=round(p_value, 4),
                    conclusion=conclusion,
                    test_type=test_type,
                )
            except Exception as e:
                raise RuntimeError(f"Repeated measures ANOVA failed: {str(e)}")
        else:
            result = friedmanchisquare(*groups)
            test_type = "Friedman test"
            return self._build_anova_response(result, test_type)

    def _build_stat_response(self, result, test_type: str) -> StatResponse:
        stat = round(result.statistic, 4)
        p_value = round(result.pvalue, 4)

        conclusion = (
            "Reject H0, there is a significant difference between group 1 and group 2"
            if p_value < self.alpha
            else "Fail to reject H0, there is no significant difference between group 1 and group 2"
        )

        return StatResponse(
            stat=stat,
            p_value=p_value,
            conclusion=conclusion,
            test_type=test_type,
        )

    def _build_anova_response(self, result, test_type: str) -> AnovaResponse:
        stat = round(result.statistic, 4)
        p_value = round(result.pvalue, 4)

        conclusion = (
            "Reject H0, there is a significant difference between the groups"
            if p_value < self.alpha
            else "Fail to reject H0, there is no significant difference between the groups"
        )
        return AnovaResponse(
            stat=stat,
            p_value=p_value,
            conclusion=conclusion,
            test_type=test_type,
        )

    # ============================
    # PRIVATE HELPER FUNCTIONS
    # ============================

    def _is_normal(self, data: list[float]) -> bool:
        return shapiro(data).pvalue > self.alpha

    def _is_normal_all(self, groups: list[list[float]]) -> bool:
        return all(self._is_normal(group) for group in groups)

    def _is_variance_equal(self, groups: list[list[float]]) -> bool:
        return levene(*groups).pvalue > self.alpha

    def _is_variance_equal_2groups(
        self, group1: list[float], group2: list[float]
    ) -> bool:
        return levene(group1, group2).pvalue > self.alpha
