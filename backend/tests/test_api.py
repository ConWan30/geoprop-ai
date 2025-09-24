import pytest
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert "status" in response.json()

def test_create_prop_bet_unauthorized():
    bet_data = {
        "gameId": "test-game",
        "playerId": "test-player",
        "metric": "kills",
        "threshold": 5,
        "location": {"lat": 37.7749, "lon": -122.4194}
    }
    response = client.post("/api/v1/prop-bets", json=bet_data)
    assert response.status_code == 401