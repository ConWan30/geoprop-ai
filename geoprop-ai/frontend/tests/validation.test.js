import { validateBetData, formatIOTX, calculateDistance } from '../sdk/utils/validation.js'; 
 
describe('Validation Utils', () => { 
  describe('validateBetData', () => { 
    test('should pass with valid bet data', () => { 
      const validData = { 
        gameId: 'game-123', 
        playerId: 'player-456', 
        metric: 'kills', 
        threshold: 5, 
        location: { lat: 37.7749, lon: -122.4194 } 
      }; 
 
      expect(() => validateBetData(validData)).not.toThrow(); 
    }); 
 
    test('should throw error with missing required fields', () => { 
      const invalidData = { 
        gameId: 'game-123' 
        // missing other required fields 
      }; 
 
      expect(() => validateBetData(invalidData)).toThrow('Missing required field'); 
    }); 
  }); 
 
  describe('formatIOTX', () => { 
    test('should format IOTX correctly', () => { 
      expect(formatIOTX('1000000000000000000')).toBe('1.0000'); 
      expect(formatIOTX('500000000000000000')).toBe('0.5000'); 
    }); 
  }); 
 
  describe('calculateDistance', () => { 
    test('should calculate distance between coordinates', () => { 
      const coord1 = { lat: 37.7749, lon: -122.4194 }; // San Francisco 
      const coord2 = { lat: 40.7589, lon: -73.9851 };  // New York 
 
      const distance = calculateDistance(coord1, coord2); 
      expect(distance).toBeGreaterThan(0); 
      expect(distance).toBeLessThan(5000); // Should be reasonable distance 
    }); 
  }); 
}); 
