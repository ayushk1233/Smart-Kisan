"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Search,
  MapPin,
  Phone,
  Mail,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Clock,
  AlertTriangle,
  Info,
  ShoppingCart,
  Users,
  Target,
  Filter,
  X,
  ChevronDown,
  Globe,
  TrendingUpIcon
} from 'lucide-react'

interface MarketPrice {
  cropName: string
  currentPrice: number
  previousPrice: number
  change: number
  changePercent: number
  unit: string
  market: string
  lastUpdated: string
  trend: 'up' | 'down' | 'stable'
  image: string
}

interface Trader {
  id: string
  name: string
  company: string
  location: string
  phone: string
  email: string
  rating: number
  crops: string[]
  minQuantity: string
  paymentTerms: string
  lastContact: string
  verified: boolean
}

interface MarketTrend {
  cropName: string
  trend: 'bullish' | 'bearish' | 'stable'
  forecast: string
  factors: string[]
  recommendation: string
  confidence: number
}

export default function MarketDashboard() {
  const [searchCrop, setSearchCrop] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All India')
  const [selectedCategory, setSelectedCategory] = useState('All Crops')
  const [showFilters, setShowFilters] = useState(false)
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([])
  const [traders, setTraders] = useState<Trader[]>([])
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const locations = [
    'All India', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Maharashtra', 
    'Rajasthan', 'Gujarat', 'Madhya Pradesh', 'West Bengal', 'Bihar',
    'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Odisha'
  ]

  const cropCategories = [
    'All Crops', 'Grains', 'Pulses', 'Oilseeds', 'Vegetables', 'Fruits', 'Cash Crops'
  ]

  // Mock market data - in real app this would come from market APIs
  useEffect(() => {
    const fetchMarketData = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockPrices: MarketPrice[] = [
        {
          cropName: 'Wheat',
          currentPrice: 2200,
          previousPrice: 2100,
          change: 100,
          changePercent: 4.76,
          unit: 'per quintal',
          market: 'Mandi Board, Punjab',
          lastUpdated: '2 hours ago',
          trend: 'up',
          image: '🌾'
        },
        {
          cropName: 'Rice',
          currentPrice: 1800,
          previousPrice: 1850,
          change: -50,
          changePercent: -2.70,
          unit: 'per quintal',
          market: 'APMC, Maharashtra',
          lastUpdated: '1 hour ago',
          trend: 'down',
          image: '🍚'
        },
        {
          cropName: 'Mustard',
          currentPrice: 5200,
          previousPrice: 5200,
          change: 0,
          changePercent: 0,
          unit: 'per quintal',
          market: 'Mandi Board, Rajasthan',
          lastUpdated: '3 hours ago',
          trend: 'stable',
          image: '🟡'
        },
        {
          cropName: 'Cotton',
          currentPrice: 6500,
          previousPrice: 6400,
          change: 100,
          changePercent: 1.56,
          unit: 'per quintal',
          market: 'Cotton Corporation',
          lastUpdated: '4 hours ago',
          trend: 'up',
          image: '🧶'
        },
        {
          cropName: 'Sugarcane',
          currentPrice: 350,
          previousPrice: 345,
          change: 5,
          changePercent: 1.45,
          unit: 'per quintal',
          market: 'Sugar Mills, UP',
          lastUpdated: '5 hours ago',
          trend: 'up',
          image: '🎋'
        },
        {
          cropName: 'Potato',
          currentPrice: 1200,
          previousPrice: 1250,
          change: -50,
          changePercent: -4.00,
          unit: 'per quintal',
          market: 'APMC, West Bengal',
          lastUpdated: '2 hours ago',
          trend: 'down',
          image: '🥔'
        }
      ]

      const mockTraders: Trader[] = [
        {
          id: '1',
          name: 'Rajesh Kumar',
          company: 'Kumar Agro Traders',
          location: 'Punjab',
          phone: '+91 98765 43210',
          email: 'rajesh@kumaragro.com',
          rating: 4.8,
          crops: ['Wheat', 'Rice', 'Mustard'],
          minQuantity: '100 quintals',
          paymentTerms: 'Cash on delivery',
          lastContact: '2 days ago',
          verified: true
        },
        {
          id: '2',
          name: 'Priya Sharma',
          company: 'Sharma Exports',
          location: 'Maharashtra',
          phone: '+91 87654 32109',
          email: 'priya@sharmaexports.com',
          rating: 4.6,
          crops: ['Rice', 'Cotton', 'Sugarcane'],
          minQuantity: '50 quintals',
          paymentTerms: '30 days credit',
          lastContact: '1 week ago',
          verified: true
        },
        {
          id: '3',
          name: 'Amit Patel',
          company: 'Patel Commodities',
          location: 'Gujarat',
          phone: '+91 76543 21098',
          email: 'amit@patelcommodities.com',
          rating: 4.9,
          crops: ['Cotton', 'Groundnut', 'Sesame'],
          minQuantity: '200 quintals',
          paymentTerms: 'Advance payment',
          lastContact: '3 days ago',
          verified: false
        }
      ]

      const mockTrends: MarketTrend[] = [
        {
          cropName: 'Wheat',
          trend: 'bullish',
          forecast: 'Prices expected to rise 5-8% in next 2 weeks',
          factors: ['Government procurement at MSP', 'Lower production this season', 'Export demand'],
          recommendation: 'Hold stocks for better prices',
          confidence: 85
        },
        {
          cropName: 'Rice',
          trend: 'bearish',
          forecast: 'Prices may decline 3-5% due to surplus supply',
          factors: ['Good monsoon this year', 'Higher production', 'Export restrictions'],
          recommendation: 'Consider selling soon to avoid losses',
          confidence: 78
        },
        {
          cropName: 'Mustard',
          trend: 'stable',
          forecast: 'Prices likely to remain stable with minor fluctuations',
          factors: ['Balanced supply-demand', 'Steady oil demand', 'Normal production'],
          recommendation: 'Can sell at current prices or wait for slight improvement',
          confidence: 92
        }
      ]

      setMarketPrices(mockPrices)
      setTraders(mockTraders)
      setMarketTrends(mockTrends)
      setIsLoading(false)
    }

    fetchMarketData()
  }, [])

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <ArrowUpRight className="w-5 h-5 text-emerald-600" />
    if (trend === 'down') return <ArrowDownRight className="w-5 h-5 text-rose-600" />
    return <TrendingUp className="w-5 h-5 text-slate-600" />
  }

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    if (trend === 'down') return 'text-rose-600 bg-rose-50 border-rose-200'
    return 'text-slate-600 bg-slate-50 border-slate-200'
  }

  const getMarketTrendColor = (trend: 'bullish' | 'bearish' | 'stable') => {
    if (trend === 'bullish') return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    if (trend === 'bearish') return 'text-rose-600 bg-rose-50 border-rose-200'
    return 'text-slate-600 bg-slate-50 border-slate-200'
  }

  const filteredPrices = marketPrices.filter(price => 
    price.cropName.toLowerCase().includes(searchCrop.toLowerCase()) &&
    (selectedLocation === 'All India' || price.market.includes(selectedLocation))
  )

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      {/* Modern Header */}
      <div className="border-b shadow-sm" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg mb-6">
              <TrendingUpIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Market Analytics
            </h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
              Get real-time market prices, analyze trends, and connect with reliable traders
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Enhanced Search & Filters */}
        <div className="rounded-2xl shadow-lg border p-6 mb-8" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
                <Input
                  placeholder="Search for crops, markets, or traders..."
                  value={searchCrop}
                  onChange={(e) => setSearchCrop(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg border-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                />
              </div>
            </div>

            {/* Location Dropdown */}
            <div className="relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="h-14 px-6 text-lg border-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl appearance-none pr-12 cursor-pointer"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
              >
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: 'var(--muted-foreground)' }} />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="h-14 px-6 text-lg border-2 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-xl appearance-none pr-12 cursor-pointer"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
              >
                {cropCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: 'var(--muted-foreground)' }} />
            </div>

            {/* Filter Toggle */}
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters ? "default" : "outline"}
              className={`h-14 px-6 text-lg rounded-xl ${
                showFilters 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'border-2 hover:bg-slate-50'
              }`}
              style={!showFilters ? { borderColor: 'var(--border)', color: 'var(--foreground)' } : {}}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Price Range</label>
                  <div className="flex space-x-2">
                    <Input placeholder="Min" className="h-10" />
                    <Input placeholder="Max" className="h-10" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Rating</label>
                  <select className="w-full h-10 border border-slate-200 rounded-lg px-3">
                    <option>All Ratings</option>
                    <option>4.5+ Stars</option>
                    <option>4.0+ Stars</option>
                    <option>3.5+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Terms</label>
                  <select className="w-full h-10 border border-slate-200 rounded-lg px-3">
                    <option>All Terms</option>
                    <option>Cash on Delivery</option>
                    <option>Advance Payment</option>
                    <option>Credit Terms</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-slate-600">Loading market data...</p>
          </div>
        ) : (
          <>
            {/* Market Prices Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-slate-900">Live Market Prices</h2>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>Rising</span>
                  <div className="w-3 h-3 bg-rose-500 rounded-full ml-4"></div>
                  <span>Falling</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrices.map((price, index) => (
                  <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{price.image}</div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900">{price.cropName}</h3>
                            <p className="text-sm text-slate-500">{price.market}</p>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold border ${getTrendColor(price.trend)}`}>
                          {getTrendIcon(price.trend)}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="text-center bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4">
                          <div className="text-4xl font-bold text-slate-900">₹{price.currentPrice.toLocaleString()}</div>
                          <div className="text-sm text-slate-600">{price.unit}</div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-slate-50 rounded-lg p-3">
                            <span className="text-slate-600">Previous:</span>
                            <div className="font-semibold text-slate-900">₹{price.previousPrice.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <span className="text-slate-600">Change:</span>
                            <div className={`font-bold ${price.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {price.change >= 0 ? '+' : ''}₹{price.change} ({price.changePercent}%)
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center text-xs text-slate-500 bg-slate-100 rounded-lg py-2">
                          Updated: {price.lastUpdated}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Market Trends */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Market Trends & Analysis</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {marketTrends.map((trend, index) => (
                  <Card key={index} className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-slate-900">{trend.cropName}</h3>
                        <div className={`px-4 py-2 rounded-full text-sm font-bold border ${getMarketTrendColor(trend.trend)}`}>
                          {trend.trend.charAt(0).toUpperCase() + trend.trend.slice(1)}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                          <h4 className="font-semibold text-slate-900 mb-2">Forecast</h4>
                          <p className="text-slate-700">{trend.forecast}</p>
                          <div className="mt-2 flex items-center space-x-2">
                            <span className="text-sm text-slate-600">Confidence:</span>
                            <div className="flex-1 bg-slate-200 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full" 
                                style={{ width: `${trend.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-semibold text-slate-700">{trend.confidence}%</span>
                          </div>
                        </div>
                        
                        <div className="bg-slate-50 rounded-xl p-4">
                          <h4 className="font-semibold text-slate-900 mb-2">Key Factors</h4>
                          <ul className="space-y-2">
                            {trend.factors.map((factor, idx) => (
                              <li key={idx} className="text-slate-700 flex items-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {factor}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                          <h4 className="font-semibold text-emerald-900 mb-1">Recommendation</h4>
                          <p className="text-emerald-800">{trend.recommendation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Traders Directory */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Trusted Traders</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {traders.map((trader) => (
                  <Card key={trader.id} className="border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-xl font-bold text-slate-900">{trader.name}</h3>
                            {trader.verified && (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">✓</span>
                              </div>
                            )}
                          </div>
                          <p className="text-slate-600">{trader.company}</p>
                        </div>
                        <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className="text-sm font-semibold text-amber-700">{trader.rating}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4" />
                          <span>{trader.location}</span>
                        </div>
                        
                        <div className="bg-slate-50 rounded-xl p-3">
                          <h4 className="font-semibold text-slate-900 mb-2">Crops</h4>
                          <div className="flex flex-wrap gap-2">
                            {trader.crops.map((crop, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                                {crop}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-slate-50 rounded-lg p-3">
                            <span className="text-slate-600">Min Quantity:</span>
                            <div className="font-semibold text-slate-900">{trader.minQuantity}</div>
                          </div>
                          <div className="bg-slate-50 rounded-lg p-3">
                            <span className="text-slate-600">Payment:</span>
                            <div className="font-semibold text-slate-900">{trader.paymentTerms}</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-11">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 h-11">
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                        </div>
                        
                        <div className="text-center text-xs text-slate-500 bg-slate-100 rounded-lg py-2">
                          Last contact: {trader.lastContact}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Market Insights */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Market Insights & Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">Best Selling Time</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Wheat prices typically peak during March-April. Consider holding stocks 
                      until then for better returns. Monitor government procurement announcements.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900">Market Risks</h4>
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      Monitor weather forecasts and government policies. Sudden changes can 
                      significantly impact crop prices. Stay updated with market news.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
