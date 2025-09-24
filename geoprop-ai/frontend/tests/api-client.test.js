import { GeoPropAPI } from '../sdk/core/api-client.js'; 
 
// Mock fetch 
global.fetch = jest.fn(); 
 
describe('GeoPropAPI', () => { 
  let api; 
 
  beforeEach(() => { 
    api = new GeoPropAPI({ 
      baseUrl: 'https://test-api.geoprop.ai', 
      apiKey: 'test-key' 
    }); 
    fetch.mockClear(); 
  }); 
 
  test('should create prop bet successfully', async () => { 
    const mockResponse = { 
      betId: 'bet-123', 
      status: 'created' 
    }; 
 
    fetch.mockResolvedValueOnce({ 
      ok: true, 
      json: async () => mockResponse 
    }); 
 
    const betData = { 
      gameId: 'test-game', 
      playerId: 'test-player', 
      metric: 'kills', 
      threshold: 5 
    }; 
 
    const result = await api.createPropBet(betData); 
    expect(result).toEqual(mockResponse); 
    expect(fetch).toHaveBeenCalledWith( 
      'https://test-api.geoprop.ai/api/v1/prop-bets', 
      expect.objectContaining({ 
        method: 'POST', 
        headers: expect.objectContaining({ 
          'Authorization': 'Bearer test-key' 
        }) 
      }) 
    ); 
  }); 
}); 
