# Integration Guide 
 
## GeoProp AI SDK Integration 
 
### Installation 
 
```bash 
npm install @geoprop/ai-sdk 
``` 
 
### Basic Usage 
 
```javascript 
import { GeoPropSDK } from '@geoprop/ai-sdk'; 
 
const sdk = new GeoPropSDK({ 
  apiKey: 'your-api-key', 
  environment: 'production' 
}); 
 
// Create a prop bet 
const bet = await sdk.createPropBet({ 
  gameId: 'warzone-match-123', 
  playerId: 'player-456', 
  metric: 'kills', 
  threshold: 5, 
  location: { lat: 37.7749, lon: -122.4194 } 
}); 
``` 
