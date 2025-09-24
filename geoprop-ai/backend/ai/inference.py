import asyncio 
import torch 
import numpy as np 
from typing import Dict, Any, List 
import time 
import logging 
 
class InferenceEngine: 
    def __init__(self, model_path: str): 
        self.model = torch.load(model_path) 
        self.model.eval() 
        self.scaler = joblib.load(f"{model_path.replace('.pth', '_scaler.pkl')}") 
 
    async def predict(self, features: Dict[str, Any]) -
        start_time = time.time() 
        processed_features = self._preprocess_features(features) 
        with torch.no_grad(): 
            prediction = self.model(processed_features) 
        inference_time = time.time() - start_time 
        logging.info(f"Inference completed in {inference_time:.3f}s") 
        return prediction.item() 
