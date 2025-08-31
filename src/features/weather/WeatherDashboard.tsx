"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  Wind, 
  Droplets, 
  Thermometer, 
  MapPin, 
  Search,
  AlertTriangle,
  Info,
  Calendar,
  Clock,
  Eye,
  Umbrella,
  Sprout,
  ArrowRight
} from 'lucide-react'

interface WeatherData {
  location: string
  current: {
    temp: number
    condition: string
    humidity: number
    windSpeed: number
    visibility: number
    uvIndex: number
    feelsLike: number
  }
  forecast: Array<{
    date: string
    day: string
    temp: number
    condition: string
    rainChance: number
    windSpeed: number
  }>
  alerts: Array<{
    type: 'warning' | 'info' | 'danger'
    title: string
    description: string
    icon: React.ReactNode
  }>
}

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [searchLocation, setSearchLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState('Punjab, India')

  // Mock weather data - in real app this would come from weather API
  const fetchWeatherData = async (location: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const mockData: WeatherData = {
      location: location,
      current: {
        temp: 28,
        condition: 'Partly Cloudy',
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        uvIndex: 7,
        feelsLike: 30
      },
      forecast: [
        {
          date: 'Today',
          day: 'Mon',
          temp: 28,
          condition: 'Partly Cloudy',
          rainChance: 20,
          windSpeed: 12
        },
        {
          date: 'Tomorrow',
          day: 'Tue',
          temp: 26,
          condition: 'Light Rain',
          rainChance: 60,
          windSpeed: 15
        },
        {
          date: 'Day 3',
          day: 'Wed',
          temp: 24,
          condition: 'Heavy Rain',
          rainChance: 80,
          windSpeed: 18
        },
        {
          date: 'Day 4',
          day: 'Thu',
          temp: 25,
          condition: 'Cloudy',
          rainChance: 40,
          windSpeed: 10
        },
        {
          date: 'Day 5',
          day: 'Fri',
          temp: 27,
          condition: 'Sunny',
          rainChance: 10,
          windSpeed: 8
        }
      ],
      alerts: [
        {
          type: 'warning',
          title: 'Rain Expected Tomorrow',
          description: '60% chance of rain. Plan outdoor activities accordingly.',
          icon: <Umbrella className="w-5 h-5 text-amber-600" />
        },
        {
          type: 'info',
          title: 'Good Planting Conditions',
          description: 'Weather is favorable for planting wheat and mustard crops.',
          icon: <Sprout className="w-5 h-5 text-emerald-600" />
        }
      ]
    }
    
    setWeatherData(mockData)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchWeatherData(selectedLocation)
  }, [selectedLocation])

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) {
      return <CloudRain className="w-8 h-8 text-cyan-600" />
    } else if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) {
      return <Cloud className="w-8 h-8 text-slate-600" />
    } else if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) {
      return <Sun className="w-8 h-8 text-amber-600" />
    }
    return <Cloud className="w-8 h-8 text-slate-600" />
  }

  const getConditionColor = (condition: string) => {
    const lowerCondition = condition.toLowerCase()
    if (lowerCondition.includes('rain')) return 'text-cyan-600'
    if (lowerCondition.includes('sun') || lowerCondition.includes('clear')) return 'text-amber-600'
    return 'text-slate-600'
  }

  const handleSearch = () => {
    if (searchLocation.trim()) {
      setSelectedLocation(searchLocation.trim())
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg mb-6">
          <CloudRain className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Weather Dashboard</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          Get real-time weather updates and forecasts to make informed decisions about your farming activities. 
          Monitor conditions that affect crop growth and plan irrigation schedules.
        </p>
      </div>

      {/* Location Search */}
             <Card className="border-0 shadow-xl mb-8 max-w-4xl mx-auto" style={{ backgroundColor: 'var(--card)' }}>
        <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-xl">
          <CardTitle className="flex items-center space-x-3 text-2xl">
            <MapPin className="w-7 h-7" />
            <span>Search Location</span>
          </CardTitle>
          <CardDescription className="text-cyan-100 text-lg">
            Enter your farm location for personalized weather updates
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex space-x-4">
            <Input
              placeholder="e.g., Punjab, Haryana, UP, Maharashtra"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="border-2 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 text-lg h-12 flex-1 rounded-xl"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button 
              onClick={handleSearch}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-bold rounded-xl shadow-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
          <p className="text-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Current location: <span className="font-semibold text-cyan-600">{selectedLocation}</span>
          </p>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-xl" style={{ color: 'var(--muted-foreground)' }}>Fetching weather data...</p>
        </div>
      ) : weatherData && (
        <div className="space-y-8">
          {/* Current Weather */}
          <Card className="border-0 shadow-xl" style={{ backgroundColor: 'var(--card)' }}>
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Thermometer className="w-7 h-7" />
                <span>Current Weather</span>
              </CardTitle>
              <CardDescription className="text-cyan-100 text-lg">
                Real-time weather conditions for {weatherData.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Main Weather Display */}
                <div className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                    {getWeatherIcon(weatherData.current.condition)}
                    <div>
                      <h2 className="text-6xl font-bold" style={{ color: 'var(--foreground)' }}>{weatherData.current.temp}°C</h2>
                      <p className={`text-2xl font-semibold ${getConditionColor(weatherData.current.condition)}`}>
                        {weatherData.current.condition}
                      </p>
                      <p style={{ color: 'var(--muted-foreground)' }}>Feels like {weatherData.current.feelsLike}°C</p>
                    </div>
                  </div>
                </div>

                {/* Weather Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cyan-50 rounded-xl p-4 text-center border border-cyan-200">
                    <Droplets className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Humidity</p>
                    <p className="text-2xl font-bold text-cyan-700">{weatherData.current.humidity}%</p>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 text-center border border-emerald-200">
                    <Wind className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Wind Speed</p>
                    <p className="text-2xl font-bold text-emerald-700">{weatherData.current.windSpeed} km/h</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                    <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Visibility</p>
                    <p className="text-2xl font-bold text-purple-700">{weatherData.current.visibility} km</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-200">
                    <Sun className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                    <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>UV Index</p>
                    <p className="text-2xl font-bold text-amber-700">{weatherData.current.uvIndex}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5-Day Forecast */}
          <Card className="border-0 shadow-xl" style={{ backgroundColor: 'var(--card)' }}>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Calendar className="w-7 h-7" />
                <span>5-Day Forecast</span>
              </CardTitle>
              <CardDescription className="text-blue-100 text-lg">
                Plan your farming activities with confidence
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 text-center border border-cyan-200 hover:shadow-lg transition-shadow">
                    <p className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>{day.day}</p>
                    <div className="flex justify-center mb-3">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <p className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>{day.temp}°C</p>
                    <p className={`text-sm font-medium ${getConditionColor(day.condition)} mb-2`}>
                      {day.condition}
                    </p>
                                         <div className="space-y-1">
                       <div className="flex items-center justify-between text-xs">
                         <span style={{ color: 'var(--muted-foreground)' }}>Rain:</span>
                         <span className="font-semibold text-cyan-600">{day.rainChance}%</span>
                       </div>
                       <div className="flex items-center justify-between text-xs">
                         <span style={{ color: 'var(--muted-foreground)' }}>Wind:</span>
                         <span className="font-semibold text-emerald-600">{day.windSpeed} km/h</span>
                       </div>
                     </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

                     {/* Weather Alerts */}
           {weatherData.alerts.length > 0 && (
             <Card className="border-0 shadow-xl" style={{ backgroundColor: 'var(--card)' }}>
              <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-xl">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <AlertTriangle className="w-7 h-7" />
                  <span>Weather Alerts & Farming Tips</span>
                </CardTitle>
                <CardDescription className="text-amber-100 text-lg">
                  Important information for your farming activities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {weatherData.alerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-xl border-2 ${
                      alert.type === 'warning' ? 'bg-amber-50 border-amber-300' :
                      alert.type === 'danger' ? 'bg-rose-50 border-rose-300' :
                      'bg-cyan-50 border-cyan-300'
                    }`}>
                      <div className="flex items-start space-x-3">
                        {alert.icon}
                        <div>
                                                     <h4 className="font-semibold mb-1" style={{ color: 'var(--foreground)' }}>{alert.title}</h4>
                           <p style={{ color: 'var(--muted-foreground)' }}>{alert.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

                     {/* Farming Recommendations */}
           <Card className="border-0 shadow-xl" style={{ backgroundColor: 'var(--card)' }}>
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <Sprout className="w-7 h-7" />
                <span>Farming Recommendations</span>
              </CardTitle>
              <CardDescription className="text-emerald-100 text-lg">
                Weather-based advice for your crops
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2 flex items-center">
                    <Info className="w-5 h-5 mr-2" />
                    Irrigation Planning
                  </h4>
                  <p className="text-emerald-800 text-sm">
                    With {weatherData.forecast[1]?.rainChance}% chance of rain tomorrow, 
                    consider reducing irrigation today to avoid waterlogging.
                  </p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-200">
                  <h4 className="font-semibold text-cyan-900 mb-2 flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Activity Timing
                  </h4>
                  <p className="text-cyan-800 text-sm">
                    UV index is {weatherData.current.uvIndex} - avoid spraying pesticides 
                    during peak sun hours (10 AM - 2 PM).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
