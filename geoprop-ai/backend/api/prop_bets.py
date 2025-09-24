from fastapi import APIRouter, HTTPException 
from typing import List, Dict, Any 
from pydantic import BaseModel 
import asyncio 
 
router = APIRouter(prefix="/api/v1/prop-bets", tags=["prop-bets"]) 
 
class PropBetRequest(BaseModel): 
    game_id: str 
    player_id: str 
    metric: str 
    threshold: float 
    location: Dict[str, float] 
