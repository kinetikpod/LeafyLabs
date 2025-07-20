from sklearn.preprocessing import LabelEncoder
from sklearn.base import BaseEstimator, TransformerMixin
import numpy as np


class BinaryLabelEncoder(BaseEstimator, TransformerMixin):
    def __init__(self):
        self.label_encoders = {}

    def fit(self, X, y=None):
        for col in X.columns:
            le = LabelEncoder()
            le.fit(X[col])
            self.label_encoders[col] = le
        return self

    def transform(self, X):
        X_encoded = X.copy()
        for col in X.columns:
            le = self.label_encoders[col]
            X_encoded[col] = le.transform(X[col])
        return X_encoded

    def get_feature_names_out(self, input_features=None):
        return np.array(input_features)
