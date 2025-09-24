'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Trophy, DollarSign, TrendingUp, Clock, Users, Gamepad2 } from 'lucide-react'
import BettingInterface from '@/components/BettingInterface'
import BettingSlip from '@/components/BettingSlip'
import LiveMatches from '@/components/LiveMatches'
import ApiStatus from '@/components/ApiStatus'

interface Bet {
  id: string
  game: string
  player: string
  prop: string
  odds: string
  decimalOdds: number
  stake: number
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('live-betting')
  const [bettingSlip, setBettingSlip] = useState<Bet[]>([])
  const [balance, setBalance] = useState(2847.50)

  const addToBettingSlip = (bet: Bet) => {
    setBettingSlip(prev => {
      const existing = prev.find(b => b.id === bet.id)
      if (existing) return prev
      return [...prev, { ...bet, stake: 10 }]
    })
  }

  const removeFromBettingSlip = (betId: string) => {
    setBettingSlip(prev => prev.filter(b => b.id !== betId))
  }

  const updateStake = (betId: string, stake: string) => {
    setBettingSlip(prev => prev.map(b =>
      b.id === betId ? { ...b, stake: parseFloat(stake) || 0 } : b
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.div
                className="text-2xl font-bold text-emerald-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <Trophy className="w-8 h-8 inline mr-2" />
                GeoProp AI
              </motion.div>
              <div className="text-sm text-gray-400">
                Live Esports Betting Platform
              </div>
            </div>

            <div className="flex items-center gap-6">
              <ApiStatus />
              <div className="flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-lg border border-emerald-500/30">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-lg text-emerald-400">
                  ${balance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Navigation */}
          <div className="flex gap-1 mb-6 bg-gray-800/50 p-1 rounded-lg">
            {[
              { id: 'live-betting', label: 'Live Betting', icon: Clock },
              { id: 'tournaments', label: 'Tournaments', icon: Trophy },
              { id: 'players', label: 'Players', icon: Users },
              { id: 'props', label: 'Props', icon: Gamepad2 }
            ].map(tab => (
              <button
                key={tab.id}
                className={`flex-1 px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-black font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'live-betting' && (
            <div className="space-y-6">
              <LiveMatches onAddToBettingSlip={addToBettingSlip} />
              <BettingInterface onAddToBettingSlip={addToBettingSlip} />
            </div>
          )}

          {activeTab === 'tournaments' && (
            <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Upcoming Tournaments</h3>
              <p className="text-gray-400">Major esports events and championships</p>
            </div>
          )}

          {activeTab === 'players' && (
            <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
              <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Player Statistics</h3>
              <p className="text-gray-400">Individual player performance data</p>
            </div>
          )}

          {activeTab === 'props' && (
            <div className="bg-gray-800/50 rounded-lg p-8 text-center border border-gray-700">
              <Gamepad2 className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Proposition Bets</h3>
              <p className="text-gray-400">Specialized betting markets</p>
            </div>
          )}
        </div>

        {/* Betting Slip */}
        <div className="lg:col-span-1">
          <BettingSlip
            bets={bettingSlip}
            onRemoveBet={removeFromBettingSlip}
            onUpdateStake={updateStake}
            balance={balance}
            onPlaceBets={(totalStake) => {
              setBalance(prev => prev - totalStake)
              setBettingSlip([])
            }}
          />
        </div>
      </div>
    </div>
  )
}