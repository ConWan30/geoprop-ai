import httpx 
import asyncio 
from typing import Dict, Any, List 
import json 
import os 
 
class WarzoneAPI: 
    def __init__(self): 
        self.api_key = os.getenv("ACTIVISION_API_KEY") 
        self.base_url = "https://my.callofduty.com/api/papi-client" 
 
    async def get_player_stats(self, username: str, platform: str = "battle") -, Any]: 
        async with httpx.AsyncClient() as client: 
            response = await client.get( 
                f"{self.base_url}/stats/cod/v1/title/mw/platform/{platform}/gamer/{username}/profile/type/wz", 
                headers={"Authorization": f"Bearer {self.api_key}"} 
            ) 
            return response.json() 
