import httpx 
import asyncio 
from typing import Dict, Any, List 
import json 
import os 
 
class DePINVerification: 
    def __init__(self): 
        self.depin_api = os.getenv("DEPIN_API_URL", "https://api.iotex.io/depin/v1") 
        self.api_key = os.getenv("DEPIN_API_KEY") 
 
    async def verify_device_network(self, device_id: str) -, Any]: 
        async with httpx.AsyncClient() as client: 
            response = await client.get( 
                f"{self.depin_api}/devices/{device_id}/verify", 
                headers={"Authorization": f"Bearer {self.api_key}"} 
            ) 
            return response.json() 
