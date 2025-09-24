import jwt 
import httpx 
import asyncio 
from typing import Dict, Any, Optional 
from cryptography.hazmat.primitives import hashes 
from cryptography.hazmat.primitives.asymmetric import ec 
import os 
 
class IoIDSecurity: 
    def __init__(self): 
        self.ioid_api = os.getenv("IOID_API_URL", "https://api.ioid.io/v1") 
        self.api_key = os.getenv("IOID_API_KEY") 
 
    async def verify_ioid_token(self, token: str) -, Any]: 
        try: 
            decoded = jwt.decode(token, options={"verify_signature": False}) 
            device_id = decoded.get("device_id") 
            return await self.verify_device_integrity(device_id) 
        except jwt.InvalidTokenError: 
            raise Exception("Invalid ioID token") 
