from scipy.stats import kruskal

group1 = [1, 1, 1, 1, 50, 1, 2, 1, 1, 1]
group2 = [2, 2, 2, 2, 2, 2, 3, 2, 2, 2]
group3 = [3, 3, 3, 3, 3, 3, 4, 3, 3, 3]

statistic, p_value = kruskal(group1, group2, group3)

print("H statistic:", statistic)
print("p-value:", p_value)
