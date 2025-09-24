'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, Wifi } from 'lucide-react'
import axios from 'axios'

interface ApiStatus {
  status: 'online' | 'offline' | 'degraded'
  message: string
  responseTime?: number
  blockchain?: boolean
}

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    status: 'offline',
    message: 'Checking...'
  })

  useEffect(() => {
    checkApiHealth()
    const interval = setInterval(checkApiHealth, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkApiHealth = async () => {
    const startTime = Date.now()

    try {
      // Try to reach the backend API service
      const response = await axios.get('/api/health', { timeout: 5000 })
      const responseTime = Date.now() - startTime

      setApiStatus({
        status: 'online',
        message: 'GeoProp AI Backend Online',
        responseTime,
        blockchain: response.data.blockchain_status === 'connected'
      })
    } catch (error) {
      // If API fails, try direct backend URL
      try {
        const response = await axios.get('https://geoprop-ai-backend.up.railway.app/health', { timeout: 5000 })
        const responseTime = Date.now() - startTime

        setApiStatus({
          status: 'online',
          message: 'Backend API Online',
          responseTime,
          blockchain: response.data?.blockchain_status === 'connected'
        })
      } catch (backendError) {
        setApiStatus({
          status: 'offline',
          message: 'Backend Offline - Demo Mode',
          responseTime: undefined,
          blockchain: false
        })
      }
    }
  }

  const getStatusIcon = () => {
    switch (apiStatus.status) {
      case 'online':
        return <CheckCircle className="w-5 h-5 text-cyber-green" />
      case 'degraded':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'offline':
        return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusColor = () => {
    switch (apiStatus.status) {
      case 'online':
        return 'border-cyber-green/50 bg-cyber-green/10'
      case 'degraded':
        return 'border-yellow-500/50 bg-yellow-500/10'
      case 'offline':
        return 'border-red-500/50 bg-red-500/10'
    }
  }

  return (
    <motion.div
      className={`mb-8 mx-auto max-w-md p-4 rounded-lg border ${getStatusColor()}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <div className="font-bold text-sm">{apiStatus.message}</div>
            {apiStatus.responseTime && (
              <div className="text-xs text-gray-400">
                Response: {apiStatus.responseTime}ms
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {apiStatus.blockchain !== undefined && (
            <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
              apiStatus.blockchain ? 'bg-iotex-primary/20 text-iotex-primary' : 'bg-gray-700 text-gray-400'
            }`}>
              <Wifi className="w-3 h-3" />
              IoTeX
            </div>
          )}

          <motion.div
            className={`w-3 h-3 rounded-full ${
              apiStatus.status === 'online' ? 'bg-cyber-green' :
              apiStatus.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            animate={{
              scale: apiStatus.status === 'online' ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 2,
              repeat: apiStatus.status === 'online' ? Infinity : 0,
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}