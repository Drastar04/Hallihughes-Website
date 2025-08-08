"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RefreshCw, Server } from "lucide-react"
import { apiService, type BackendStatus, type ApiInfo } from "@/lib/api"

export function BackendStatus() {
  const [healthStatus, setHealthStatus] = useState<BackendStatus | null>(null)
  const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const fetchBackendData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Fetch health status and API info using the API service
      const [healthData, infoData] = await Promise.all([
        apiService.getHealthStatus(),
        apiService.getApiInfo()
      ])
      
      setHealthStatus(healthData)
      setApiInfo(infoData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to backend')
      setHealthStatus(null)
      setApiInfo(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchBackendData()
  }, [])

  if (!mounted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Backend Status
          </CardTitle>
          <CardDescription>
            Django API connection status and information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Backend Status
        </CardTitle>
        <CardDescription>
          Django API connection status and information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Connecting to backend...
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <XCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {healthStatus && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Health Status:</span>
              <Badge variant={healthStatus.status === 'healthy' ? 'default' : 'destructive'}>
                {healthStatus.status === 'healthy' ? (
                  <CheckCircle className="h-3 w-3 mr-1" />
                ) : (
                  <XCircle className="h-3 w-3 mr-1" />
                )}
                {healthStatus.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600">{healthStatus.message}</p>
          </div>
        )}

        {apiInfo && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">API Version:</span>
              <Badge variant="secondary">{apiInfo.version}</Badge>
            </div>
            <p className="text-sm text-gray-600">{apiInfo.description}</p>
          </div>
        )}

        <Button 
          onClick={fetchBackendData} 
          disabled={loading}
          size="sm"
          variant="outline"
          className="w-full"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  )
} 