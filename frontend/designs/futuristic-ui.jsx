// GeoProp AI - Futuristic UI/UX Interface Design
// Inspired by cyberpunk, holographic, and neural network aesthetics

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GeoPropFuturisticUI = () => {
  const [activeTab, setActiveTab] = useState('neural-bets');
  const [trustScore, setTrustScore] = useState(87);
  const [activeBets, setActiveBets] = useState([]);
  const [aiPredictions, setAiPredictions] = useState([]);

  return (
    <div className="geoprop-quantum-interface">
      {/* Holographic Background */}
      <div className="quantum-background">
        <div className="neural-grid"></div>
        <div className="particle-field"></div>
        <div className="energy-streams"></div>
      </div>

      {/* Main HUD Interface */}
      <div className="main-hud-container">

        {/* Header - Neural Command Center */}
        <motion.header
          className="neural-header"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20 }}
        >
          <div className="holo-logo">
            <div className="logo-core">GeoProp</div>
            <div className="logo-neural-ring"></div>
            <div className="logo-data-stream">AI</div>
          </div>

          {/* Trust Score Hologram */}
          <div className="trust-score-holo">
            <div className="circular-progress" data-score={trustScore}>
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="progress-bg"/>
                <circle
                  cx="50" cy="50" r="45"
                  className="progress-fill"
                  style={{ strokeDasharray: `${trustScore * 2.83} 283` }}
                />
              </svg>
              <div className="score-display">
                <span className="score-number">{trustScore}</span>
                <span className="score-label">TRUST</span>
              </div>
            </div>
            <div className="trust-particles"></div>
          </div>

          {/* Neural Network Status */}
          <div className="neural-status">
            <div className="status-indicator active">
              <div className="pulse-ring"></div>
              <div className="status-dot"></div>
            </div>
            <span className="status-text">NEURAL SYNC ACTIVE</span>
          </div>
        </motion.header>

        {/* Main Interface Tabs */}
        <div className="quantum-tabs">
          {[
            { id: 'neural-bets', label: 'Neural Bets', icon: '🧠' },
            { id: 'ai-predictions', label: 'AI Oracle', icon: '🔮' },
            { id: 'depin-network', label: 'DePIN Grid', icon: '🌐' },
            { id: 'iotex-vault', label: 'IoTeX Vault', icon: '⚡' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              className={`quantum-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="tab-icon">{tab.icon}</div>
              <div className="tab-label">{tab.label}</div>
              <div className="tab-energy-bar"></div>
            </motion.button>
          ))}
        </div>

        {/* Neural Betting Interface */}
        <AnimatePresence mode="wait">
          {activeTab === 'neural-bets' && (
            <motion.div
              className="neural-betting-interface"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {/* Live Game Feed */}
              <div className="holographic-game-feed">
                <div className="feed-header">
                  <h3>LIVE WARZONE NEURAL FEED</h3>
                  <div className="sync-indicator">
                    <div className="sync-pulse"></div>
                    <span>SYNC: 99.7%</span>
                  </div>
                </div>

                {/* Player Cards with AI Predictions */}
                <div className="player-cards-grid">
                  {[
                    {
                      name: 'ShroudGG',
                      prediction: 'High Kill Potential',
                      confidence: 94,
                      currentKills: 3,
                      targetKills: 8,
                      aiScore: 'OPTIMAL'
                    },
                    {
                      name: 'NinjaFortnite',
                      prediction: 'Top 5 Finish',
                      confidence: 87,
                      currentRank: 15,
                      targetRank: 5,
                      aiScore: 'PROBABLE'
                    }
                  ].map((player, index) => (
                    <motion.div
                      key={index}
                      className="neural-player-card"
                      whileHover={{ scale: 1.02 }}
                    >
                      {/* Holographic Player Avatar */}
                      <div className="player-holo-avatar">
                        <div className="avatar-core"></div>
                        <div className="avatar-energy-field"></div>
                        <div className="neural-connections"></div>
                      </div>

                      {/* Player Stats Matrix */}
                      <div className="stats-matrix">
                        <div className="player-name-holo">{player.name}</div>
                        <div className="ai-prediction">{player.prediction}</div>

                        {/* Real-time Progress Bar */}
                        <div className="neural-progress">
                          <div className="progress-label">PROGRESS</div>
                          <div className="progress-holo-bar">
                            <div
                              className="progress-fill-neural"
                              style={{
                                width: `${(player.currentKills / player.targetKills) * 100}%`
                              }}
                            ></div>
                          </div>
                          <div className="progress-stats">
                            {player.currentKills}/{player.targetKills}
                          </div>
                        </div>

                        {/* AI Confidence Meter */}
                        <div className="confidence-holo">
                          <div className="confidence-ring">
                            <svg viewBox="0 0 60 60">
                              <circle cx="30" cy="30" r="25" className="conf-bg"/>
                              <circle
                                cx="30" cy="30" r="25"
                                className="conf-fill"
                                style={{
                                  strokeDasharray: `${player.confidence * 1.57} 157`
                                }}
                              />
                            </svg>
                            <div className="conf-percentage">{player.confidence}%</div>
                          </div>
                          <div className="ai-score-badge">{player.aiScore}</div>
                        </div>
                      </div>

                      {/* Neural Bet Button */}
                      <motion.button
                        className="neural-bet-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="button-energy"></div>
                        <span>NEURAL BET</span>
                        <div className="button-particles"></div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quantum Bet Constructor */}
              <div className="quantum-bet-constructor">
                <div className="constructor-header">
                  <h3>QUANTUM BET CONSTRUCTOR</h3>
                  <div className="ai-assistance">
                    <div className="ai-pulse"></div>
                    <span>AI ASSIST: ACTIVE</span>
                  </div>
                </div>

                {/* Holographic Bet Configuration */}
                <div className="bet-config-holo">
                  <div className="config-section">
                    <label className="holo-label">TARGET METRIC</label>
                    <div className="metric-selector">
                      {['KILLS', 'DAMAGE', 'PLACEMENT', 'TIME'].map((metric) => (
                        <div key={metric} className="metric-holo-button">
                          <div className="metric-energy"></div>
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="config-section">
                    <label className="holo-label">BET AMOUNT (IOTX)</label>
                    <div className="amount-holo-input">
                      <input type="number" placeholder="0.00" />
                      <div className="input-energy-field"></div>
                    </div>
                  </div>

                  <div className="config-section">
                    <label className="holo-label">AI RECOMMENDATION</label>
                    <div className="ai-recommendation-panel">
                      <div className="recommendation-core">
                        <div className="rec-icon">🤖</div>
                        <div className="rec-text">
                          "Based on neural analysis, this bet has 89% success probability.
                          Recommended stake: 0.25 IOTX"
                        </div>
                      </div>
                      <div className="neural-pathways"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Action Buttons */}
        <div className="floating-actions">
          <motion.button
            className="fab neural-assistant"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="fab-energy"></div>
            <span>🧠</span>
          </motion.button>

          <motion.button
            className="fab quantum-vault"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="fab-energy"></div>
            <span>⚡</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default GeoPropFuturisticUI;