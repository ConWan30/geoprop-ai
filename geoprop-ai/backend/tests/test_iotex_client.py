import pytest 
from unittest.mock import Mock, patch 
from blockchain.iotex_client import IoTeXClient 
 
class TestIoTeXClient: 
    def test_client_initialization(self): 
        client = IoTeXClient() 
        assert client.chain_id == 4689 
        assert "iotex" in client.rpc_url 
 
    @pytest.mark.asyncio 
    @patch('blockchain.iotex_client.Web3') 
    async def test_get_balance(self, mock_web3): 
        mock_web3.return_value.eth.get_balance.return_value = 1000000000000000000 
        mock_web3.return_value.from_wei.return_value = 1.0 
 
        client = IoTeXClient() 
        balance = await client.get_iotx_balance("0x1234567890123456789012345678901234567890") 
        assert balance == 1.0 
