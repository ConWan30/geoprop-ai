'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Target, Brain, Globe, Shield, TrendingUp } from 'lucide-react'
import BettingInterface from '@/components/BettingInterface'
import ApiStatus from '@/components/ApiStatus'

export default function Home() {
  const [trustScore, setTrustScore] = useState(87)
  const [activeTab, setActiveTab] = useState('neural-bets')

  return (
    <main className="min-h-screen p-4">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-8"
      >
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-iotex-primary via-cyber-neon to-cyber-pink bg-clip-text text-transparent animate-glow">
          GeoProp AI
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Decentralized Esports Betting • IoTeX Blockchain • AI-Powered
        </p>

        {/* Trust Score */}
        <motion.div
          className="inline-block cyber-border p-4 holographic"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-3">
            <Shield className="text-iotex-primary w-6 h-6" />
            <span className="text-lg">Trust Score: </span>
            <span className="text-2xl font-bold text-iotex-primary">{trustScore}%</span>
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden ml-2">
              <motion.div
                className="h-full bg-gradient-to-r from-iotex-primary to-cyber-green"
                initial={{ width: 0 }}
                animate={{ width: `${trustScore}%` }}
                transition={{ duration: 2 }}
              />
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* API Status */}
      <ApiStatus />

      {/* Navigation Tabs */}
      <motion.div
        className="flex justify-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex gap-2 cyber-border p-2 rounded-xl bg-black/20">
          {[
            { id: 'neural-bets', label: 'Neural Bets', icon: Brain },
            { id: 'live-feed', label: 'Live Feed', icon: Zap },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'geo-props', label: 'Geo Props', icon: Globe }
          ].map(tab => (
            <motion.button
              key={tab.id}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-iotex-primary text-black font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {activeTab === 'neural-bets' && <BettingInterface />}

        {activeTab === 'live-feed' && (
          <div className="cyber-border p-8 text-center">
            <Zap className="w-16 h-16 text-iotex-primary mx-auto mb-4 animate-pulse-cyber" />
            <h3 className="text-2xl font-bold mb-2">Live Tournament Feed</h3>
            <p className="text-gray-400">Real-time esports data streaming...</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="cyber-border p-8 text-center">
            <TrendingUp className="w-16 h-16 text-cyber-green mx-auto mb-4 animate-neural" />
            <h3 className="text-2xl font-bold mb-2">AI Analytics Hub</h3>
            <p className="text-gray-400">Performance metrics and predictions</p>
          </div>
        )}

        {activeTab === 'geo-props' && (
          <div className="cyber-border p-8 text-center">
            <Globe className="w-16 h-16 text-cyber-neon mx-auto mb-4 animate-pulse-cyber" />
            <h3 className="text-2xl font-bold mb-2">Geo-Localized Props</h3>
            <p className="text-gray-400">Location-based betting opportunities</p>
          </div>
        )}
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="text-center mt-16 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>Powered by IoTeX Blockchain • DePIN Infrastructure • AI-Driven Predictions</p>
      </motion.footer>
    </main>
  )
}