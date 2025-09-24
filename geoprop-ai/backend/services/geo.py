import geopy 
from geopy.distance import geodesic 
import asyncio 
from typing import Dict, Tuple, List 
import httpx 
 
class GeoService: 
    def __init__(self): 
        self.ipapi_key = os.getenv("IPAPI_KEY") 
 
    async def get_location_from_ip(self, ip_address: str) -, float]: 
        async with httpx.AsyncClient() as client: 
            response = await client.get( 
                f"http://api.ipapi.com/{ip_address}?access_key={self.ipapi_key}" 
            ) 
            data = response.json() 
            return {"lat": data["latitude"], "lon": data["longitude"]} 
