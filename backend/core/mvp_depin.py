import asyncio
import json
from typing import Dict, Any, Optional
from .software_verification import SoftwareVerification
import httpx
import time

class MVPDePINSystem:
    """MVP DePIN system using software verification and progressive trust"""

    def __init__(self):
        self.software_verifier = SoftwareVerification()
        self.trust_levels = {
            "basic": {"min_score": 30, "max_bet": 10},      # Software only
            "verified": {"min_score": 60, "max_bet": 50},   # + Email/Phone
            "trusted": {"min_score": 80, "max_bet": 200},   # + ID verification
            "premium": {"min_score": 95, "max_bet": 1000}   # + Hardware attestation
        }

    async def register_device(self, user_id: str) -> Dict[str, Any]:
        """Register device with progressive verification"""

        # Step 1: Generate software fingerprint
        device_data = await self.software_verifier.generate_device_fingerprint()

        # Step 2: Basic device checks
        verification_checks = await self._run_verification_checks(device_data)

        # Step 3: Assign trust level
        trust_level = self._assign_trust_level(device_data["trust_score"])

        return {
            "device_id": device_data["device_id"],
            "user_id": user_id,
            "trust_level": trust_level,
            "max_bet_amount": self.trust_levels[trust_level]["max_bet"],
            "verification_checks": verification_checks,
            "registered_at": int(time.time()),
            "next_upgrade_path": self._get_upgrade_path(trust_level)
        }

    async def _run_verification_checks(self, device_data: Dict) -> Dict[str, bool]:
        """Run available verification checks"""
        checks = {
            "device_fingerprint": True,  # Always available
            "network_stability": await self._check_network_stability(),
            "gaming_hardware": self._detect_gaming_hardware(device_data),
            "geolocation": await self._verify_basic_location(),
            "process_integrity": self._check_running_processes(),
        }
        return checks

    def _detect_gaming_hardware(self, device_data: Dict) -> bool:
        """Detect if device has gaming-capable hardware"""
        fingerprint = device_data.get("fingerprint", {})

        # Check for gaming indicators
        has_gaming_cpu = fingerprint.get("cpu_count", 0) >= 4
        has_gaming_memory = fingerprint.get("memory_total", 0) > 8_000_000_000  # 8GB+

        return has_gaming_cpu and has_gaming_memory

    async def _check_network_stability(self) -> bool:
        """Basic network connectivity check"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get("https://api.iotex.io/health", timeout=5)
                return response.status_code == 200
        except:
            return False

    async def _verify_basic_location(self) -> bool:
        """Basic IP-based location verification"""
        try:
            async with httpx.AsyncClient() as client:
                # Use IP geolocation service
                response = await client.get("http://ip-api.com/json", timeout=5)
                data = response.json()
                return data.get("status") == "success"
        except:
            return False

    def _check_running_processes(self) -> bool:
        """Check for suspicious processes that might indicate cheating"""
        try:
            import psutil
            suspicious_processes = [
                "cheatengine", "artmoney", "gameguardian",
                "gamehack", "speedhack", "trainer"
            ]

            running_processes = [proc.name().lower() for proc in psutil.process_iter()]

            for suspicious in suspicious_processes:
                if any(suspicious in proc for proc in running_processes):
                    return False
            return True
        except:
            return True  # Default to true if can't check

    def _assign_trust_level(self, trust_score: int) -> str:
        """Assign trust level based on score"""
        if trust_score >= 95:
            return "premium"
        elif trust_score >= 80:
            return "trusted"
        elif trust_score >= 60:
            return "verified"
        else:
            return "basic"

    def _get_upgrade_path(self, current_level: str) -> Dict[str, Any]:
        """Provide path to upgrade trust level"""
        upgrade_paths = {
            "basic": {
                "next_level": "verified",
                "requirements": [
                    "Verify email address",
                    "Add phone number",
                    "Complete 10 successful bets"
                ]
            },
            "verified": {
                "next_level": "trusted",
                "requirements": [
                    "Upload government ID",
                    "Complete video verification call",
                    "Maintain 30-day betting history"
                ]
            },
            "trusted": {
                "next_level": "premium",
                "requirements": [
                    "Connect hardware security key",
                    "Install GeoProp verification app",
                    "Enable biometric authentication"
                ]
            }
        }

        return upgrade_paths.get(current_level, {"next_level": "maximum", "requirements": []})

    async def validate_bet_request(self, device_id: str, bet_amount: float) -> Dict[str, Any]:
        """Validate if device can place this bet"""
        # In production, this would query database
        # For MVP, we'll simulate device lookup

        mock_device = {
            "trust_level": "verified",
            "max_bet_amount": 50,
            "recent_activity": "normal"
        }

        if bet_amount > mock_device["max_bet_amount"]:
            return {
                "allowed": False,
                "reason": f"Bet amount ${bet_amount} exceeds limit ${mock_device['max_bet_amount']}",
                "upgrade_path": self._get_upgrade_path(mock_device["trust_level"])
            }

        return {
            "allowed": True,
            "trust_level": mock_device["trust_level"],
            "remaining_limit": mock_device["max_bet_amount"] - bet_amount
        }