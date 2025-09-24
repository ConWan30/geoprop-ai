import pytest 
from unittest.mock import Mock, patch, AsyncMock 
from core.ioid_security import IoIDSecurity 
 
class TestIoIDSecurity: 
    def test_ioid_initialization(self): 
        ioid = IoIDSecurity() 
        assert ioid.ioid_api is not None 
 
    @pytest.mark.asyncio 
    @patch('core.ioid_security.jwt.decode') 
    async def test_verify_token(self, mock_jwt): 
        mock_jwt.return_value = {"device_id": "test-device-123"} 
 
        ioid = IoIDSecurity() 
        with patch.object(ioid, 'verify_device_integrity', new_callable=AsyncMock) as mock_verify: 
            mock_verify.return_value = {"status": "verified"} 
            result = await ioid.verify_ioid_token("dummy.jwt.token") 
            assert result["status"] == "verified" 
