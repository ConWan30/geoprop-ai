from fastapi import APIRouter, Depends, HTTPException 
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials 
import jwt 
import os 
 
router = APIRouter(prefix="/api/v1/auth", tags=["auth"]) 
security = HTTPBearer() 
