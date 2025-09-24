'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, DollarSign, TrendingUp, Zap } from 'lucide-react'

interface Bet {
  id: string
  game: string
  player: string
  prop: string
  odds: string
  decimalOdds: number
  stake: number
}

interface BettingSlipProps {
  bets: Bet[]
  onRemoveBet: (betId: string) => void
  onUpdateStake: (betId: string, stake: string) => void
  balance: number
  onPlaceBets: (totalStake: number) => void
}

export default function BettingSlip({ bets, onRemoveBet, onUpdateStake, balance, onPlaceBets }: BettingSlipProps) {
  const [betType, setBetType] = useState<'single' | 'parlay'>('single')

  const totalStake = bets.reduce((sum, bet) => sum + bet.stake, 0)
  const totalPayout = betType === 'single'
    ? bets.reduce((sum, bet) => sum + (bet.stake * bet.decimalOdds), 0)
    : bets.length > 0 ? (totalStake * bets.reduce((prod, bet) => prod * bet.decimalOdds, 1)) : 0

  const profit = totalPayout - totalStake

  const handlePlaceBets = () => {
    if (totalStake > 0 && totalStake <= balance) {
      onPlaceBets(totalStake)
    }
  }

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gray-900/80 px-4 py-3 border-b border-gray-700">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-400" />
          Betting Slip
        </h3>
      </div>

      {bets.length === 0 ? (
        <div className="p-6 text-center text-gray-400">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
            <DollarSign className="w-8 h-8" />
          </div>
          <p>Add bets to your slip</p>
          <p className="text-sm mt-1">Click odds to add selections</p>
        </div>
      ) : (
        <div className="p-4">
          {/* Bet Type Toggle */}
          {bets.length > 1 && (
            <div className="flex gap-1 mb-4 bg-gray-900 p-1 rounded">
              <button
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all ${
                  betType === 'single'
                    ? 'bg-emerald-500 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setBetType('single')}
              >
                Singles
              </button>
              <button
                className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-all ${
                  betType === 'parlay'
                    ? 'bg-emerald-500 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={() => setBetType('parlay')}
              >
                Parlay
              </button>
            </div>
          )}

          {/* Bet Items */}
          <div className="space-y-3 mb-4">
            {bets.map((bet, index) => (
              <motion.div
                key={bet.id}
                className="bg-gray-900/60 rounded-lg p-3 border border-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 truncate">{bet.game}</div>
                    <div className="font-medium text-white text-sm">
                      {bet.player} - {bet.prop}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-sm font-mono">
                      {bet.odds}
                    </span>
                    <button
                      onClick={() => onRemoveBet(bet.id)}
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {betType === 'single' && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Stake:</span>
                    <input
                      type="number"
                      value={bet.stake}
                      onChange={(e) => onUpdateStake(bet.id, e.target.value)}
                      className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white w-20"
                      min="0"
                      step="0.01"
                    />
                    <span className="text-xs text-gray-400">
                      Win: ${(bet.stake * bet.decimalOdds).toFixed(2)}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Parlay Stake Input */}
          {betType === 'parlay' && bets.length > 1 && (
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-yellow-400">Parlay Stake</span>
                <input
                  type="number"
                  value={totalStake}
                  onChange={(e) => {
                    const stake = parseFloat(e.target.value) || 0
                    const perBet = stake / bets.length
                    bets.forEach(bet => onUpdateStake(bet.id, perBet.toString()))
                  }}
                  className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm text-white w-24"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="text-xs text-gray-400">
                Combined odds: {bets.reduce((prod, bet) => prod * bet.decimalOdds, 1).toFixed(2)}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="border-t border-gray-600 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Stake:</span>
              <span className="text-white font-mono">${totalStake.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Potential Payout:</span>
              <span className="text-emerald-400 font-mono">${totalPayout.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-gray-300">Potential Profit:</span>
              <span className="text-emerald-300 font-mono flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                ${profit.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Place Bet Button */}
          <motion.button
            onClick={handlePlaceBets}
            disabled={totalStake === 0 || totalStake > balance}
            className={`w-full mt-4 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
              totalStake === 0 || totalStake > balance
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-emerald-500/25'
            }`}
            whileHover={totalStake > 0 && totalStake <= balance ? { scale: 1.02 } : {}}
            whileTap={totalStake > 0 && totalStake <= balance ? { scale: 0.98 } : {}}
          >
            <DollarSign className="w-5 h-5" />
            {totalStake > balance ? 'Insufficient Balance' : 'Place Bet'}
          </motion.button>

          {totalStake > balance && (
            <p className="text-red-400 text-xs text-center mt-2">
              Balance: ${balance.toFixed(2)}
            </p>
          )}
        </div>
      )}
    </div>
  )
}