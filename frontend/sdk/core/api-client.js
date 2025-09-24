export class GeoPropAPI {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || 'https://api.geoprop.ai';
    this.apiKey = config.apiKey;
    this.headers = {
      'Content-Type': 'application/json',
      ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` })
    };
  }

  async createPropBet(betData) {
    const response = await fetch(`${this.baseUrl}/api/v1/prop-bets`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(betData)
    });
    return response.json();
  }

  async getPrediction(gameData) {
    const response = await fetch(`${this.baseUrl}/api/v1/predictions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(gameData)
    });
    return response.json();
  }

  async getPlayerStats(playerId, gameId) {
    const response = await fetch(`${this.baseUrl}/api/v1/players/${playerId}/stats?game=${gameId}`, {
      headers: this.headers
    });
    return response.json();
  }
}