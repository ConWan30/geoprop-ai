'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Target, Brain, TrendingUp, Star, Users, Gamepad2 } from 'lucide-react'
import axios from 'axios'

interface PropBet {
  id: string
  game: string
  player: string
  prop: string
  line: string
  overOdds: string
  underOdds: string
  overDecimal: number
  underDecimal: number
  prediction: number
  confidence: number
  category: string
}

interface BettingInterfaceProps {
  onAddToBettingSlip: (bet: any) => void
}

const mockPropBets: PropBet[] = [
  {
    id: 'p1',
    game: 'Warzone Pacific',
    player: 'Scump',
    prop: 'Kills',
    line: '15.5',
    overOdds: '+110',
    underOdds: '-130',
    overDecimal: 2.10,
    underDecimal: 1.77,
    prediction: 85,
    confidence: 92,
    category: 'Performance'
  },
  {
    id: 'p2',
    game: 'Warzone Pacific',
    player: 'Simp',
    prop: 'Damage',
    line: '3500',
    overOdds: '-110',
    underOdds: '-110',
    overDecimal: 1.91,
    underDecimal: 1.91,
    prediction: 78,
    confidence: 88,
    category: 'Performance'
  },
  {
    id: 'p3',
    game: 'CS2',
    player: 'ZywOo',
    prop: 'Headshot %',
    line: '45.5%',
    overOdds: '+120',
    underOdds: '-140',
    overDecimal: 2.20,
    underDecimal: 1.71,
    prediction: 92,
    confidence: 95,
    category: 'Accuracy'
  },
  {
    id: 'p4',
    game: 'Valorant',
    player: 'TenZ',
    prop: 'First Kills',
    line: '2.5',
    overOdds: '+105',
    underOdds: '-125',
    overDecimal: 2.05,
    underDecimal: 1.80,
    prediction: 71,
    confidence: 83,
    category: 'Performance'
  }
]

export default function BettingInterface({ onAddToBettingSlip }: BettingInterfaceProps) {
  const [propBets, setPropBets] = useState<PropBet[]>(mockPropBets)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [loading, setLoading] = useState(false)

  const categories = ['All', 'Performance', 'Accuracy', 'Team Stats']

  const filteredBets = selectedCategory === 'All'
    ? propBets
    : propBets.filter(bet => bet.category === selectedCategory)

  const addBet = (bet: PropBet, side: 'over' | 'under') => {
    const betData = {
      id: `${bet.id}-${side}`,
      game: bet.game,
      player: bet.player,
      prop: `${bet.prop} ${side === 'over' ? 'Over' : 'Under'} ${bet.line}`,
      odds: side === 'over' ? bet.overOdds : bet.underOdds,
      decimalOdds: side === 'over' ? bet.overDecimal : bet.underDecimal,
      stake: 0
    }
    onAddToBettingSlip(betData)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-500" />
          AI-Powered Player Props
        </h2>

        {/* Category Filter */}
        <div className="flex gap-1 bg-gray-800/50 p-1 rounded-lg">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-emerald-500 text-black'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Props Grid */}
      <div className="grid gap-4">
        {filteredBets.map((bet, index) => (
          <motion.div
            key={bet.id}
            className="bg-gray-800/50 rounded-lg border border-gray-700 p-4 hover:border-gray-600 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              {/* Player Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">{bet.player}</div>
                  <div className="text-sm text-gray-400">{bet.game}</div>
                </div>
              </div>

              {/* AI Prediction */}
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-purple-400 font-medium">
                    {bet.prediction}% confidence
                  </span>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(bet.confidence / 20)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Prop Details */}
            <div className="mb-4">
              <div className="text-lg font-semibold text-white mb-1">
                {bet.prop} - {bet.line}
              </div>
              <div className="text-sm text-gray-400 capitalize">
                {bet.category} • Player Prop
              </div>
            </div>

            {/* Betting Options */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => addBet(bet, 'over')}
                className="bg-gray-700/50 hover:bg-emerald-500/20 border border-gray-600 hover:border-emerald-500/50 rounded-lg p-4 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Over {bet.line}</div>
                  <div className="text-xl font-bold text-white group-hover:text-emerald-400">
                    {bet.overOdds}
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => addBet(bet, 'under')}
                className="bg-gray-700/50 hover:bg-emerald-500/20 border border-gray-600 hover:border-emerald-500/50 rounded-lg p-4 transition-all group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Under {bet.line}</div>
                  <div className="text-xl font-bold text-white group-hover:text-emerald-400">
                    {bet.underOdds}
                  </div>
                </div>
              </motion.button>
            </div>

            {/* AI Insight */}
            <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">AI Insight</span>
              </div>
              <div className="text-xs text-gray-300">
                Based on recent performance and matchup analysis, recommends{' '}
                <span className="text-purple-300 font-medium">
                  {bet.prediction > 60 ? 'Over' : 'Under'} {bet.line}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBets.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <Gamepad2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No props available for this category</p>
        </div>
      )}
    </div>
  )
}