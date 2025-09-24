# API Documentation 
 
## GeoProp AI API 
 
Base URL: `https://api.geoprop.ai/api/v1` 
 
### Authentication 
 
All requests require ioID authentication: 
 
```http 
Authorization: Bearer YOUR_IOID_TOKEN 
``` 
 
### Endpoints 
 
#### POST /prop-bets 
 
Create a new prop bet. 
 
```json 
{ 
  "gameId": "warzone-match-123", 
  "playerId": "player-456", 
  "metric": "kills", 
  "threshold": 5, 
  "location": { 
    "lat": 37.7749, 
    "lon": -122.4194 
  } 
} 
``` 
