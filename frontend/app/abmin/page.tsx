"use client"

import { useState, useEffect } from "react"
import { ProjectManager } from "@/components/project-manager"
import { BackendStatus } from "@/components/backend-status"
import { AdminAuth } from "@/components/admin-auth"
import { QuoteManager } from "@/components/quote-manager"
import { ErrorBoundary } from "@/components/error-boundary"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Settings, Database, LogOut, FileText, Users } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if admin is already authenticated
    const adminAuth = sessionStorage.getItem('adminAuthenticated')
    if (adminAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated')
    setIsAuthenticated(false)
  }

  if (!mounted) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  }

  if (!isAuthenticated) {
    return <AdminAuth onLogin={handleLogin} />
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">System Administration</span>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="hidden sm:block text-sm text-gray-600">Administrator</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your Hallihughes system, projects, and customer quotes</p>
        </div>

        <Tabs defaultValue="system" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  System Status
                </CardTitle>
                <CardDescription>
                  Monitor backend connectivity and system health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BackendStatus />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Project Management
                </CardTitle>
                <CardDescription>
                  Create, edit, and manage geological and water projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Quote Management
                </CardTitle>
                <CardDescription>
                  Manage customer quote requests and responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuoteManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Management
                </CardTitle>
                <CardDescription>
                  Manage system users and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">User management coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      </div>
    </ErrorBoundary>
  )
} 