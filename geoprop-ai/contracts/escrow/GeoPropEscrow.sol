// SPDX-License-Identifier: MIT 
pragma solidity 0.8.19; 
 
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol"; 
 
contract GeoPropEscrow is ReentrancyGuard, Ownable { 
    struct Bet { 
        address player; 
        uint256 amount; 
        string gameId; 
        string playerId; 
        string metric; 
        uint256 threshold; 
        int256 latitude; 
        int256 longitude; 
        uint256 timestamp; 
        BetStatus status; 
        uint256 oracleResults; 
    } 
 
    enum BetStatus { PENDING, ACTIVE, WON, LOST, CANCELLED } 
 
    mapping(uint256 => Bet) public bets; 
    mapping(address => bool) public authorizedOracles; 
    uint256 public nextBetId = 1; 
    uint256 public platformFeePercent = 500; // 5 
 
    event BetCreated(uint256 indexed betId, address indexed player, uint256 amount); 
    event BetSettled(uint256 indexed betId, bool won, uint256 payout); 
 
    function createBet( 
        string memory gameId, 
        string memory playerId, 
        string memory metric, 
        uint256 threshold, 
        int256 latitude, 
        int256 longitude 
    ) external payable returns (uint256) { 
        require(msg.value > 0, "Bet amount must be greater than 0"); 
 
        uint256 betId = nextBetId++; 
        bets[betId] = Bet({ 
            player: msg.sender, 
            amount: msg.value, 
            gameId: gameId, 
            playerId: playerId, 
            metric: metric, 
            threshold: threshold, 
            latitude: latitude, 
            longitude: longitude, 
            timestamp: block.timestamp, 
            status: BetStatus.PENDING, 
            oracleResults: 0 
        }); 
 
        emit BetCreated(betId, msg.sender, msg.value); 
        return betId; 
    } 
} 
