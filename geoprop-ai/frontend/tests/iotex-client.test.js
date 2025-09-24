import { IoTeXClient } from '../sdk/core/iotex-client.js'; 
 
describe('IoTeXClient', () => { 
  let client; 
 
  beforeEach(() => { 
    client = new IoTeXClient(); 
  }); 
 
  test('should initialize with correct chain ID', () => { 
    expect(client.chainId).toBe(4689); 
  }); 
 
  test('should have correct RPC URL', () => { 
    expect(client.rpcUrl).toContain('iotex'); 
  }); 
 
  test('should throw error when no wallet found', async () => { 
    // Mock no ethereum 
    delete window.ethereum; 
    await expect(client.connectWallet()).rejects.toThrow('No Web3 wallet found'); 
  }); 
}); 
