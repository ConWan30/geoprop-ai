import httpx 
import asyncio 
import json 
from typing import Dict, Any, List 
import os 
 
class RealmsOracle: 
    def __init__(self): 
        self.api_url = os.getenv("REALMS_API_URL", "https://api.iotex.io/realms/v1") 
        self.api_key = os.getenv("REALMS_API_KEY") 
 
    async def get_game_data(self, game_id: str, player_id: str) -, Any]: 
        async with httpx.AsyncClient() as client: 
            response = await client.get( 
                f"{self.api_url}/game-data/{game_id}/{player_id}", 
                headers={"Authorization": f"Bearer {self.api_key}"} 
            ) 
            return response.json() 
