'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Brain, Zap, TrendingUp, DollarSign } from 'lucide-react'
import axios from 'axios'

interface Bet {
  id: string
  game: string
  player: string
  prop: string
  odds: string
  prediction: number
  confidence: number
  status: string
}

interface AIData {
  prediction: number
  confidence: number
  factors: string[]
}

export default function BettingInterface() {
  const [activeBets, setActiveBets] = useState<Bet[]>([])
  const [aiPrediction, setAiPrediction] = useState<AIData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActiveBets()
    fetchAIPrediction()
  }, [])

  const fetchActiveBets = async () => {
    try {
      const response = await axios.get('/api/v1/bets/active')
      setActiveBets(response.data.bets || [])
    } catch (error) {
      console.log('Using mock data for bets')
      setActiveBets([
        {
          id: '1',
          game: 'Warzone Pacific',
          player: 'Scump',
          prop: 'Kills > 15',
          odds: '+150',
          prediction: 85,
          confidence: 92,
          status: 'active'
        },
        {
          id: '2',
          game: 'Warzone Pacific',
          player: 'Simp',
          prop: 'Damage > 3500',
          odds: '-110',
          prediction: 78,
          confidence: 88,
          status: 'active'
        }
      ])
    }
    setLoading(false)
  }

  const fetchAIPrediction = async () => {
    try {
      const response = await axios.post('/api/v1/ai/predict', {
        game: 'warzone',
        player: 'scump',
        prop: 'kills'
      })
      setAiPrediction(response.data)
    } catch (error) {
      console.log('Using mock AI data')
      setAiPrediction({
        prediction: 85,
        confidence: 92,
        factors: ['Recent form: Excellent', 'Map preference: High', 'Team synergy: Strong']
      })
    }
  }

  const createBet = async (betData: any) => {
    try {
      await axios.post('/api/v1/bets/create', betData)
      fetchActiveBets() // Refresh bets
    } catch (error) {
      console.log('Mock bet created')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          className="w-16 h-16 border-4 border-iotex-primary border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* AI Prediction Panel */}
      <motion.div
        className="cyber-border p-6 holographic"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-iotex-primary animate-pulse-cyber" />
          <h3 className="text-2xl font-bold">Neural AI Prediction</h3>
        </div>

        {aiPrediction && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-iotex-primary mb-2">
                {aiPrediction.prediction}%
              </div>
              <div className="text-lg text-gray-300">Win Probability</div>
            </div>

            <div className="cyber-border p-4 bg-black/20">
              <div className="flex justify-between items-center mb-2">
                <span>Confidence Score</span>
                <span className="text-cyber-green font-bold">{aiPrediction.confidence}%</span>
              </div>
              <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyber-green to-iotex-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${aiPrediction.confidence}%` }}
                  transition={{ duration: 2 }}
                />
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-2 text-iotex-primary">Key Factors:</h4>
              {aiPrediction.factors.map((factor, index) => (
                <motion.div
                  key={index}
                  className="text-sm text-gray-300 mb-1 flex items-center gap-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Zap className="w-3 h-3 text-cyber-neon" />
                  {factor}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Active Bets */}
      <motion.div
        className="cyber-border p-6"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-cyber-neon animate-neural" />
          <h3 className="text-2xl font-bold">Active Props</h3>
        </div>

        <div className="space-y-4">
          {activeBets.map((bet, index) => (
            <motion.div
              key={bet.id}
              className="cyber-border p-4 bg-gradient-to-r from-black/40 to-iotex-dark/20 hover:from-iotex-primary/10 hover:to-cyber-neon/10 transition-all duration-300"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-bold text-iotex-primary">{bet.game}</div>
                  <div className="text-lg">{bet.player} - {bet.prop}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyber-green">{bet.odds}</div>
                  <div className="text-sm text-gray-400">odds</div>
                </div>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-iotex-primary" />
                  <span className="text-sm">AI Prediction: {bet.prediction}%</span>
                </div>
                <div className="text-sm text-gray-400">
                  Confidence: {bet.confidence}%
                </div>
              </div>

              <button
                onClick={() => createBet({
                  game: bet.game,
                  player: bet.player,
                  prop: bet.prop,
                  amount: 100
                })}
                className="w-full cyber-button flex items-center justify-center gap-2"
              >
                <DollarSign className="w-5 h-5" />
                Place Bet
              </button>
            </motion.div>
          ))}
        </div>

        {activeBets.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No active props available</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}