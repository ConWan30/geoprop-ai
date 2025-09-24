from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks 
from fastapi.middleware.cors import CORSMiddleware 
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials 
import asyncio 
from typing import List, Optional 
from pydantic import BaseModel 
import os 
 
app = FastAPI(title="GeoProp AI", version="1.0.0") 
 
app.add_middleware( 
    CORSMiddleware, 
    allow_origins=["*"], 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"], 
) 
