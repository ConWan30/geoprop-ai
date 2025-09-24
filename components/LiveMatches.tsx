'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Eye, Zap, Target } from 'lucide-react'

interface Match {
  id: string
  game: string
  tournament: string
  team1: string
  team2: string
  score1: number
  score2: number
  status: 'live' | 'upcoming'
  startTime: string
  viewers: number
  markets: Market[]
}

interface Market {
  id: string
  type: string
  name: string
  odds: { [key: string]: { odds: string, decimalOdds: number } }
}

interface LiveMatchesProps {
  onAddToBettingSlip: (bet: any) => void
}

const mockMatches: Match[] = [
  {
    id: '1',
    game: 'Warzone Pacific',
    tournament: 'CDL Major Championship',
    team1: 'OpTic Gaming',
    team2: 'FaZe Clan',
    score1: 2,
    score2: 1,
    status: 'live',
    startTime: 'Live Now',
    viewers: 45230,
    markets: [
      {
        id: 'm1',
        type: 'match_winner',
        name: 'Match Winner',
        odds: {
          team1: { odds: '+120', decimalOdds: 2.20 },
          team2: { odds: '-150', decimalOdds: 1.67 }
        }
      },
      {
        id: 'm2',
        type: 'total_maps',
        name: 'Total Maps',
        odds: {
          over: { odds: '+110', decimalOdds: 2.10 },
          under: { odds: '-130', decimalOdds: 1.77 }
        }
      }
    ]
  },
  {
    id: '2',
    game: 'CS2',
    tournament: 'ESL Pro League',
    team1: 'Team Liquid',
    team2: 'Cloud9',
    score1: 0,
    score2: 0,
    status: 'upcoming',
    startTime: '15:30 EST',
    viewers: 0,
    markets: [
      {
        id: 'm3',
        type: 'match_winner',
        name: 'Match Winner',
        odds: {
          team1: { odds: '-110', decimalOdds: 1.91 },
          team2: { odds: '-110', decimalOdds: 1.91 }
        }
      }
    ]
  }
]

export default function LiveMatches({ onAddToBettingSlip }: LiveMatchesProps) {
  const [matches, setMatches] = useState<Match[]>(mockMatches)

  const addBet = (match: Match, market: Market, selection: string, odds: any) => {
    const bet = {
      id: `${match.id}-${market.id}-${selection}`,
      game: match.game,
      player: `${match.team1} vs ${match.team2}`,
      prop: `${market.name} - ${selection}`,
      odds: odds.odds,
      decimalOdds: odds.decimalOdds,
      stake: 0
    }
    onAddToBettingSlip(bet)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Zap className="w-6 h-6 text-red-500" />
          Live & Upcoming Matches
        </h2>
        <div className="text-sm text-gray-400">
          {matches.filter(m => m.status === 'live').length} live matches
        </div>
      </div>

      {matches.map((match, index) => (
        <motion.div
          key={match.id}
          className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Match Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-emerald-400">{match.game}</span>
                  {match.status === 'live' && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-400">{match.tournament}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-300">{match.startTime}</div>
                {match.viewers > 0 && (
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Eye className="w-3 h-3" />
                    {match.viewers.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Teams and Score */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-center">
                  <div className="font-bold text-white">{match.team1}</div>
                  {match.status === 'live' && (
                    <div className="text-2xl font-bold text-emerald-400">{match.score1}</div>
                  )}
                </div>
                <div className="text-gray-500 font-bold">VS</div>
                <div className="text-center">
                  <div className="font-bold text-white">{match.team2}</div>
                  {match.status === 'live' && (
                    <div className="text-2xl font-bold text-emerald-400">{match.score2}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Betting Markets */}
          <div className="p-4 space-y-4">
            {match.markets.map(market => (
              <div key={market.id}>
                <div className="text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  {market.name}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(market.odds).map(([selection, odds]) => (
                    <motion.button
                      key={selection}
                      onClick={() => addBet(match, market, selection, odds)}
                      className="bg-gray-700/50 hover:bg-emerald-500/20 border border-gray-600 hover:border-emerald-500/50 rounded-lg p-3 transition-all group"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-sm text-white font-medium capitalize">
                        {selection === 'team1' ? match.team1 :
                         selection === 'team2' ? match.team2 : selection}
                      </div>
                      <div className="text-lg font-bold text-emerald-400 group-hover:text-emerald-300">
                        {odds.odds}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}

            {/* View More Markets */}
            <button className="w-full py-2 text-sm text-gray-400 hover:text-white transition-colors border border-gray-600 rounded-lg hover:bg-gray-700/30">
              View All Markets ({Math.floor(Math.random() * 25) + 15})
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}