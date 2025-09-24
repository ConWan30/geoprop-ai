from web3 import Web3 
import asyncio 
import json 
import os 
from typing import Dict, Any, Optional 
import httpx 
 
class IoTeXClient: 
    def __init__(self): 
        self.rpc_url = os.getenv("IOTEX_RPC_URL", "https://babel-api.mainnet.iotex.io") 
        self.web3 = Web3(Web3.HTTPProvider(self.rpc_url)) 
        self.chain_id = 4689 
        self.realms_api = "https://api.iotex.io/realms/v1" 
 
    async def get_iotx_balance(self, address: str) -
        try: 
            balance_wei = self.web3.eth.get_balance(address) 
            return self.web3.from_wei(balance_wei, 'ether') 
        except Exception as e: 
            raise Exception(f"Failed to get IOTX balance: {e}") 
