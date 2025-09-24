import torch 
import torch.nn as nn 
import numpy as np 
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor 
from sklearn.preprocessing import StandardScaler 
import joblib 
import asyncio 
from typing import Dict, List, Tuple 
 
class GeoPropAIModel(nn.Module): 
    def __init__(self, input_dim=50, hidden_dims=[256, 128, 64]): 
        super().__init__() 
        self.layers = nn.ModuleList() 
        prev_dim = input_dim 
        for hidden_dim in hidden_dims: 
            self.layers.append(nn.Linear(prev_dim, hidden_dim)) 
            self.layers.append(nn.ReLU()) 
            self.layers.append(nn.Dropout(0.2)) 
            prev_dim = hidden_dim 
        self.output = nn.Linear(prev_dim, 1) 
