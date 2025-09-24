// SPDX-License-Identifier: MIT 
pragma solidity 0.8.19; 
 
import "@openzeppelin/contracts/access/Ownable.sol"; 
 
contract GameOracle is Ownable { 
    struct GameResult { 
        string gameId; 
        string playerId; 
        string metric; 
        uint256 actualValue; 
        uint256 timestamp; 
        bool verified; 
    } 
 
    mapping(bytes32 => GameResult) public gameResults; 
    mapping(address => bool) public authorizedReporters; 
 
    event ResultReported(bytes32 indexed resultId, string gameId, uint256 value); 
 
    function reportResult( 
        string memory gameId, 
        string memory playerId, 
        string memory metric, 
        uint256 actualValue 
    ) external { 
        require(authorizedReporters[msg.sender], "Unauthorized reporter"); 
 
        bytes32 resultId = keccak256(abi.encodePacked(gameId, playerId, metric)); 
        gameResults[resultId] = GameResult({ 
            gameId: gameId, 
            playerId: playerId, 
            metric: metric, 
            actualValue: actualValue, 
            timestamp: block.timestamp, 
            verified: true 
        }); 
 
        emit ResultReported(resultId, gameId, actualValue); 
    } 
} 
