"use client"

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Package, 
  CloudRain, 
  Brain, 
  TrendingUp, 
  Users, 
  Settings,
  Home as HomeIcon,
  BarChart3,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Sprout,
  Sun,
  Droplets,
  Wind,
  ArrowRight,
  Plus,
  Search,
  Filter,
  Bell,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  MessageCircle,
  Bot,
  MapPin,
  BookOpen
} from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
import LoginModal from '@/components/LoginModal'
import LocationSelector from '@/components/LocationSelector'
import { useAuth } from '@/contexts/AuthContext'
import InventoryManagement from '@/features/inventory/InventoryManagement'
import AICropAdvisor from '@/features/ai-crop-advisor/AICropAdvisor'
import WeatherDashboard from '@/features/weather/WeatherDashboard'
import MarketDashboard from '@/features/market/MarketDashboard'
import AIChat from '@/features/ai-chat/AIChat'

// Mock data - in real app this would come from API/database
const mockProducts = [
  { id: 1, name: 'Wheat Seeds', quantity: 150, unit: 'kg', price: 2500, supplier: 'Agro Supply Co.', status: 'in-stock', expirationDate: '2024-12-31' },
  { id: 2, name: 'Fertilizer NPK', quantity: 25, unit: 'bags', price: 1800, supplier: 'Fertilizer Ltd.', status: 'low-stock', expirationDate: '2024-06-30' },
  { id: 3, name: 'Pesticides', quantity: 0, unit: 'liters', price: 1200, supplier: 'Crop Care Inc.', status: 'out-of-stock', expirationDate: '2024-08-15' },
]

const mockWeather = {
  temperature: 28,
  description: 'Partly Cloudy',
  humidity: 65,
  forecast: [
    { day: 'Mon', temp: 28, rain: 20 },
    { day: 'Tue', temp: 26, rain: 60 },
    { day: 'Wed', temp: 24, rain: 80 },
  ]
}

// Mock notifications
const mockNotifications = [
  { id: 1, title: 'Low Stock Alert', message: 'Fertilizer NPK is running low', type: 'warning', time: '2 hours ago' },
  { id: 2, title: 'Weather Warning', message: 'Heavy rain expected tomorrow', type: 'info', time: '4 hours ago' },
  { id: 3, title: 'Price Update', message: 'Wheat prices increased by 5%', type: 'success', time: '6 hours ago' },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString))
}

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)

  const tabs = [
    { id: 'overview', name: 'Overview', icon: HomeIcon, color: 'from-amber-500 to-orange-600' },
    { id: 'inventory', name: 'Inventory', icon: Package, color: 'from-green-500 to-emerald-600' },
    { id: 'weather', name: 'Weather', icon: CloudRain, color: 'from-sky-500 to-blue-600' },
    { id: 'ai-tools', name: 'AI Tools', icon: Brain, color: 'from-purple-500 to-indigo-600' },
    { id: 'ai-chat', name: 'AI Chat', icon: MessageCircle, color: 'from-purple-500 to-pink-600' },
    { id: 'market', name: 'Market', icon: TrendingUp, color: 'from-orange-500 to-amber-600' },
    { id: 'community', name: 'Community', icon: Users, color: 'from-teal-500 to-green-600' },
  ]

  const quickActions = [
    { title: 'Add Product', icon: Plus, color: 'bg-green-500', action: () => setActiveTab('inventory') },
    { title: 'Check Weather', icon: Sun, color: 'bg-sky-500', action: () => setActiveTab('weather') },
    { title: 'AI Advice', icon: Brain, color: 'bg-purple-500', action: () => setActiveTab('ai-tools') },
    { title: 'AI Chat', icon: MessageCircle, color: 'bg-purple-500', action: () => setActiveTab('ai-chat') },
    { title: 'Market Prices', icon: TrendingUp, color: 'bg-amber-500', action: () => setActiveTab('market') },
  ]

  const stats = [
    { title: 'Total Products', value: '24', icon: Package, color: 'text-green-600', bgColor: 'bg-green-50' },
    { title: 'Low Stock Items', value: '3', icon: AlertTriangle, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { title: 'Expiring Soon', value: '2', icon: Clock, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { title: 'Total Value', value: '₹45,200', icon: DollarSign, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // In a real app, this would search across all modules
      alert(`Searching for: ${searchTerm}`)
      setSearchOpen(false)
      setSearchTerm('')
    }
  }

  const handleNotificationClick = (notification: { title: string; message: string }) => {
    alert(`Notification: ${notification.title} - ${notification.message}`)
    setNotificationsOpen(false)
  }

  const handleUserAction = (action: string) => {
    switch (action) {
      case 'profile':
        alert('Opening user profile...')
        break
      case 'settings':
        alert('Opening settings...')
        break
      case 'logout':
        if (confirm('Are you sure you want to logout?')) {
          alert('Logging out...')
        }
        break
    }
    setUserMenuOpen(false)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.dropdown-container')) {
        setSearchOpen(false)
        setNotificationsOpen(false)
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Modern Header */}
      <header className="border-b border-slate-200 shadow-sm sticky top-0 z-50" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2"
              >
                <Menu className="w-6 h-6" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                  <Sprout className="w-6 h-6 text-white animate-bounce" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Smart Kisan</h1>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Intelligent Farming Solutions</p>
                    {user?.location && (
                      <>
                        <span style={{ color: 'var(--muted-foreground)' }}>•</span>
                        <div className="flex items-center space-x-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                          <MapPin className="w-3 h-3" />
                          <span>{user.location.city}, {user.location.state}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative dropdown-container">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2"
                  onClick={() => setSearchOpen(!searchOpen)}
                >
                  <Search className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </Button>
                
                {/* Search Dropdown */}
                {searchOpen && (
                  <div className="absolute right-0 top-12 w-80 border border-slate-200 rounded-xl shadow-lg p-4 z-50" style={{ backgroundColor: 'var(--card)' }}>
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search products, weather, market..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 h-10"
                          autoFocus
                        />
                      </div>
                      <div className="mt-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                        Press Enter to search
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative dropdown-container">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-2 relative"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                >
                  <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full"></span>
                </Button>
                
                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 top-12 w-80 border border-slate-200 rounded-xl shadow-lg z-50" style={{ backgroundColor: 'var(--card)' }}>
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {mockNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === 'warning' ? 'bg-amber-500' :
                              notification.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <h4 className="font-medium" style={{ color: 'var(--foreground)' }}>{notification.title}</h4>
                                                              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{notification.message}</p>
                                <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-slate-200">
                      <Button variant="ghost" className="w-full text-sm">
                        View All Notifications
                      </Button>
                    </div>
                  </div>
                )}
              </div>

                                     {/* Theme Toggle */}
              <ThemeToggle />

         {/* User Menu */}
         <div className="relative dropdown-container">
           <Button
             variant="ghost"
             size="sm"
             className="p-2"
             onClick={() => setUserMenuOpen(!userMenuOpen)}
           >
                                <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
           </Button>
                
                {/* User Dropdown */}
                           {userMenuOpen && (
                             <div className="absolute right-0 top-12 w-48 border border-slate-200 rounded-xl shadow-lg z-50" style={{ backgroundColor: 'var(--card)' }}>
               {isAuthenticated ? (
                 <>
                   <div className="p-4 border-b border-slate-200">
                     <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                         <User className="w-5 h-5 text-white" />
                       </div>
                       <div>
                         <h4 className="font-semibold" style={{ color: 'var(--foreground)' }}>{user?.name || 'Farmer'}</h4>
                                                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{user?.email}</p>
                       </div>
                     </div>
                   </div>
                   <div className="p-2">
                     <Button
                       variant="ghost"
                       className="w-full justify-start"
                       onClick={() => {
                         setShowLocationModal(true)
                         setUserMenuOpen(false)
                       }}
                     >
                       <MapPin className="w-4 h-4 mr-3" />
                       Location: {user?.location?.city}
                     </Button>
                     <Button
                       variant="ghost"
                       className="w-full justify-start"
                       onClick={() => handleUserAction('profile')}
                     >
                       <User className="w-4 h-4 mr-3" />
                       Profile
                     </Button>
                     <Button
                       variant="ghost"
                       className="w-full justify-start"
                       onClick={() => handleUserAction('settings')}
                     >
                       <Settings className="w-4 h-4 mr-3" />
                       Settings
                     </Button>
                     <Button
                       variant="ghost"
                       className="w-full justify-start text-rose-600 hover:text-rose-700"
                       onClick={() => {
                         logout()
                         setUserMenuOpen(false)
                       }}
                     >
                       <LogOut className="w-4 h-4 mr-3" />
                       Logout
                     </Button>
                   </div>
                 </>
               ) : (
                 <div className="p-4">
                   <p className="text-sm text-slate-600 mb-3">Sign in to access all features</p>
                   <Button
                     className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                     onClick={() => {
                       setShowLoginModal(true)
                       setUserMenuOpen(false)
                     }}
                   >
                     Sign In
                   </Button>
                 </div>
               )}
             </div>
           )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Modern Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`} style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-slate-200" style={{ backgroundColor: 'var(--muted)' }}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>Navigation</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-1"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex-1 p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                                      <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                        isActive
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                          : ''
                      }`}
                      style={{ 
                        backgroundColor: isActive ? undefined : 'transparent',
                        '--hover-bg': 'var(--muted)'
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'var(--muted)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} style={{ color: isActive ? 'white' : 'var(--muted-foreground)' }} />
                    <span className="font-medium" style={{ color: isActive ? 'white' : 'var(--foreground)' }}>{tab.name}</span>
                    {isActive && <ArrowRight className="w-4 h-4 ml-auto text-white" />}
                  </button>
                )
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-slate-200" style={{ backgroundColor: 'var(--muted)' }}>
              <Button variant="ghost" className="w-full justify-start hover:text-slate-900" style={{ color: 'var(--muted-foreground)' }}>
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
                  <main className="flex-1 lg:ml-0">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-7xl mx-auto px-6 py-8">
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Welcome back, Farmer! 👋</h2>
                <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>Here's what's happening with your farm today.</p>
              </div>

              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--foreground)' }}>Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={action.action}
                      className="rounded-xl p-6 border border-slate-200 transition-all duration-300 group text-left transform hover:-translate-y-1"
                      style={{ backgroundColor: 'var(--card)', animationDelay: `${index * 100}ms` }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 animate-pulse`}>
                        <action.icon className="w-6 h-6 text-white group-hover:animate-spin" />
                      </div>
                      <h4 className="font-semibold transition-colors duration-300" style={{ color: 'var(--foreground)' }}>
                        {action.title}
                      </h4>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Farm Overview</h3>
                  <Button
                    onClick={() => setActiveTab('ai-chat')}
                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 animate-pulse"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Ask AI Assistant
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                      <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: 'var(--card)' }}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium mb-1" style={{ color: 'var(--muted-foreground)' }}>{stat.title}</p>
                              <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                              <Icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Weather Card */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'var(--card)' }}>
                  <CardHeader className="bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <CloudRain className="w-6 h-6 animate-pulse" />
                      <span>Weather Forecast</span>
                    </CardTitle>
                    <CardDescription className="text-sky-100">
                      Plan your farming activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-sky-600 mb-2 animate-pulse">
                        {mockWeather.temperature}°C
                      </div>
                      <p className="text-lg mb-2" style={{ color: 'var(--foreground)' }}>{mockWeather.description}</p>
                      <p style={{ color: 'var(--muted-foreground)' }}>Humidity: {mockWeather.humidity}%</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {mockWeather.forecast.map((day, index) => (
                        <div key={index} className="text-center p-3 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors duration-300">
                          <div className="text-sm font-medium mb-1" style={{ color: 'var(--foreground)' }}>{day.day}</div>
                          <div className="text-lg font-bold text-sky-600 mb-1">{day.temp}°C</div>
                          <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{day.rain}% rain</div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => setActiveTab('weather')}
                      className="w-full mt-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      View Full Forecast
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Inventory */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'var(--card)' }}>
                  <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="w-6 h-6 animate-bounce" />
                      <span>Recent Inventory</span>
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      Latest updates in your inventory
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {mockProducts.slice(0, 2).map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 transform hover:scale-105">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full animate-pulse ${
                              product.status === 'in-stock' ? 'bg-green-500' :
                              product.status === 'low-stock' ? 'bg-amber-500' : 'bg-orange-500'
                            }`} />
                            <div>
                              <h4 className="font-medium" style={{ color: 'var(--foreground)' }}>{product.name}</h4>
                              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                                {product.quantity} {product.unit} • {product.supplier}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-green-600">{formatCurrency(product.price)}</div>
                            {product.expirationDate && (
                              <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                                Expires: {formatDate(product.expirationDate)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      onClick={() => setActiveTab('inventory')}
                      variant="outline" 
                      className="w-full mt-4 border-green-300 text-green-700 hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                    >
                      Manage Inventory
                    </Button>
                  </CardContent>
                </Card>

                {/* AI Chat Preview */}
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'var(--card)' }}>
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="w-6 h-6 animate-pulse" />
                      <span>AI Chat Assistant</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                      Get instant farming advice
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 flex-1">
                          <p className="text-sm text-slate-700">
                            "Hello! I can help with crop advice, pest control, soil management, and more. What would you like to know?"
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 flex-1">
                          <p className="text-sm text-slate-700">
                            "How to control pests naturally?"
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 flex-1">
                          <p className="text-sm text-slate-700">
                            "Try neem oil, companion planting, and beneficial insects..."
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setActiveTab('ai-chat')}
                      className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105"
                    >
                      Start Chatting
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Inventory Tab */}
          {activeTab === 'inventory' && (
            <InventoryManagement />
          )}

          {/* AI Tools Tab */}
          {activeTab === 'ai-tools' && (
            <AICropAdvisor />
          )}

          {/* AI Chat Tab */}
          {activeTab === 'ai-chat' && (
            <AIChat />
          )}

          {/* Weather Tab */}
          {activeTab === 'weather' && (
            <WeatherDashboard />
          )}

          {/* Market Tab */}
          {activeTab === 'market' && (
            <MarketDashboard />
          )}

          {/* Community Tab */}
          {activeTab === 'community' && (
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Farmer Community 🌾</h2>
                <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>Connect, learn, and grow together with fellow farmers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Discussion Forums */}
                <div className="rounded-xl p-6 border border-slate-200 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Discussion Forums</h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Join conversations about crop techniques, pest control, and farming innovations.
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white">
                    Join Discussions
                  </Button>
                </div>

                {/* Expert Q&A */}
                <div className="rounded-xl p-6 border border-slate-200 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Expert Q&A</h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Get answers from agricultural experts and experienced farmers.
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                    Ask Questions
                  </Button>
                </div>

                {/* Local Groups */}
                <div className="rounded-xl p-6 border border-slate-200 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Local Groups</h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Connect with farmers in your area for local knowledge sharing.
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white">
                    Find Local Groups
                  </Button>
                </div>

                {/* Success Stories */}
                <div className="rounded-xl p-6 border border-slate-200 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Success Stories</h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Learn from successful farming practices and inspiring stories.
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                    Read Stories
                  </Button>
                </div>

                {/* Events & Workshops */}
                <div className="rounded-xl p-6 border border-slate-200 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Events & Workshops</h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Attend farming workshops, webinars, and community events.
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white">
                    View Events
                  </Button>
                </div>

                {/* Knowledge Base */}
                <div className="rounded-xl p-6 border border-slate-200 transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>Knowledge Base</h3>
                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                    Access a comprehensive library of farming guides and resources.
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white">
                    Browse Resources
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for any unknown tabs */}
          {!['overview', 'inventory', 'ai-tools', 'weather', 'market', 'community'].includes(activeTab) && (
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sprout className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                  Welcome to Smart Kisan!
                </h2>
                <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                  Your comprehensive farming management solution. Use the navigation menu to explore different features.
                </p>
                <div className="mt-8">
                  <Button 
                    onClick={() => setActiveTab('overview')}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Go to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          )}
      </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Floating AI Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setActiveTab('ai-chat')}
          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 animate-bounce"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      <LocationSelector 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
    </div>
  )
}
