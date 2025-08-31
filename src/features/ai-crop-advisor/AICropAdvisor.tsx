"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Sprout, 
  Zap, 
  Target, 
  BarChart3,
  Sun,
  Droplets,
  Thermometer,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  ArrowRight,
  Brain,
  Leaf,
  Clock
} from 'lucide-react'

interface CropRecommendation {
  cropName: string
  rating: number
  isRecommended: boolean
  reason: string
  precautions: string[]
  bestTime: string
  waterNeeds: string
  soilType: string
  yield: string
  marketDemand: string
}

interface FarmConditions {
  soilType: string
  season: string
  rainfall: string
  temperature: string
  location: string
}

export default function AICropAdvisor() {
  const [farmConditions, setFarmConditions] = useState<FarmConditions>({
    soilType: '',
    season: '',
    rainfall: '',
    temperature: '',
    location: ''
  })
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Mountain', 'Desert', 'Peaty', 'Saline']
  const seasons = ['Rabi', 'Kharif', 'Zaid', 'All Year']
  const rainfallLevels = ['Low (< 500mm)', 'Medium (500-1000mm)', 'High (> 1000mm)']
  const temperatureRanges = ['Cool (10-20°C)', 'Moderate (20-30°C)', 'Hot (30-40°C)', 'Very Hot (>40°C)']

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-emerald-600 bg-emerald-50 border-emerald-200'
    if (rating >= 6) return 'text-amber-600 bg-amber-50 border-amber-200'
    if (rating >= 4) return 'text-orange-600 bg-orange-50 border-orange-200'
    return 'text-rose-600 bg-rose-50 border-rose-200'
  }

  const getRatingIcon = (rating: number) => {
    if (rating >= 8) return <CheckCircle className="w-6 h-6 text-emerald-600" />
    if (rating >= 6) return <Target className="w-6 h-6 text-amber-600" />
    if (rating >= 4) return <AlertTriangle className="w-6 h-6 text-orange-600" />
    return <XCircle className="w-6 h-6 text-rose-600" />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock AI recommendations based on conditions
    const mockRecommendations: CropRecommendation[] = [
      {
        cropName: 'Wheat',
        rating: 9,
        isRecommended: true,
        reason: 'Excellent match for your soil and climate conditions. Wheat thrives in alluvial soil with moderate rainfall during Rabi season.',
        precautions: ['Ensure proper drainage', 'Monitor for rust disease', 'Apply balanced NPK fertilizer'],
        bestTime: 'October to November',
        waterNeeds: 'Moderate - 400-500mm during growing season',
        soilType: 'Alluvial, Black',
        yield: 'High - 4-5 tons per hectare',
        marketDemand: 'Very High - Government procurement at MSP'
      },
      {
        cropName: 'Mustard',
        rating: 8,
        isRecommended: true,
        reason: 'Good choice for your conditions. Mustard is drought-resistant and suitable for your soil type.',
        precautions: ['Control aphid infestation', 'Avoid waterlogging', 'Use certified seeds'],
        bestTime: 'October to November',
        waterNeeds: 'Low - 300-400mm',
        soilType: 'Alluvial, Red',
        yield: 'Medium - 1.5-2 tons per hectare',
        marketDemand: 'High - Good oil demand'
      },
      {
        cropName: 'Rice',
        rating: 6,
        isRecommended: false,
        reason: 'Moderate suitability. Rice requires more water than your current rainfall conditions.',
        precautions: ['Ensure adequate irrigation', 'Monitor water levels', 'Control weeds'],
        bestTime: 'June to July',
        waterNeeds: 'High - 1000-1500mm',
        soilType: 'Alluvial, Clay',
        yield: 'Medium - 3-4 tons per hectare',
        marketDemand: 'High - Stable demand'
      },
      {
        cropName: 'Cotton',
        rating: 4,
        isRecommended: false,
        reason: 'Low suitability due to temperature and rainfall constraints. Cotton prefers warmer, drier conditions.',
        precautions: ['Requires extensive irrigation', 'Monitor for bollworm', 'Manage soil salinity'],
        bestTime: 'May to June',
        waterNeeds: 'Medium - 600-800mm',
        soilType: 'Black, Red',
        yield: 'Low - 1-2 tons per hectare',
        marketDemand: 'Medium - Export demand'
      }
    ]
    
    setRecommendations(mockRecommendations)
    setShowResults(true)
    setIsLoading(false)
  }

  const resetForm = () => {
    setFarmConditions({
      soilType: '',
      season: '',
      rainfall: '',
      temperature: '',
      location: ''
    })
    setShowResults(false)
    setRecommendations([])
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg mb-6">
          <Brain className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>AI Crop Advisor</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          Get intelligent crop recommendations based on your farm conditions. Our AI analyzes soil, weather, 
          and market factors to suggest the best crops for maximum yield and profit.
        </p>
      </div>

      {!showResults ? (
        /* Farm Conditions Form */
        <Card className="border-0 shadow-xl max-w-4xl mx-auto" style={{ backgroundColor: 'var(--card)' }}>
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center space-x-3 text-2xl">
              <Target className="w-7 h-7" />
              <span>Enter Your Farm Conditions</span>
            </CardTitle>
            <CardDescription className="text-purple-100 text-lg">
              Provide details about your farm to get personalized crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Soil Type */}
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center" style={{ color: 'var(--foreground)' }}>
                    <Leaf className="w-5 h-5 mr-2 text-emerald-600" />
                    Soil Type
                  </label>
                  <select
                    required
                    value={farmConditions.soilType}
                    onChange={(e) => setFarmConditions({...farmConditions, soilType: e.target.value})}
                    className="w-full h-12 px-4 text-lg border-2 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                  >
                    <option value="">Select Soil Type</option>
                    {soilTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Season */}
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center" style={{ color: 'var(--foreground)' }}>
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    Growing Season
                  </label>
                  <select
                    required
                    value={farmConditions.season}
                    onChange={(e) => setFarmConditions({...farmConditions, season: e.target.value})}
                    className="w-full h-12 px-4 text-lg border-2 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                  >
                    <option value="">Select Season</option>
                    {seasons.map((season) => (
                      <option key={season} value={season}>{season}</option>
                    ))}
                  </select>
                </div>

                {/* Rainfall */}
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center" style={{ color: 'var(--foreground)' }}>
                    <Droplets className="w-5 h-5 mr-2 text-cyan-600" />
                    Rainfall Level
                  </label>
                  <select
                    required
                    value={farmConditions.rainfall}
                    onChange={(e) => setFarmConditions({...farmConditions, rainfall: e.target.value})}
                    className="w-full h-12 px-4 text-lg border-2 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                  >
                    <option value="">Select Rainfall Level</option>
                    {rainfallLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Temperature */}
                <div>
                  <label className="block text-sm font-semibold mb-3 flex items-center" style={{ color: 'var(--foreground)' }}>
                    <Thermometer className="w-5 h-5 mr-2 text-orange-600" />
                    Temperature Range
                  </label>
                  <select
                    required
                    value={farmConditions.temperature}
                    onChange={(e) => setFarmConditions({...farmConditions, temperature: e.target.value})}
                    className="w-full h-12 px-4 text-lg border-2 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl"
                    style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                  >
                    <option value="">Select Temperature Range</option>
                    {temperatureRanges.map((range) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold mb-3 flex items-center" style={{ color: 'var(--foreground)' }}>
                  <MapPin className="w-5 h-5 mr-2 text-rose-600" />
                  Farm Location (Optional)
                </label>
                <Input
                  placeholder="e.g., Punjab, Haryana, Uttar Pradesh"
                  value={farmConditions.location}
                  onChange={(e) => setFarmConditions({...farmConditions, location: e.target.value})}
                  className="h-12 text-lg border-2 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 rounded-xl"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--input)', color: 'var(--foreground)' }}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 text-xl font-bold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Analyzing Conditions...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Brain className="w-6 h-6" />
                    <span>Get AI Recommendations</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        /* Results Section */
        <div className="space-y-8">
          {/* Results Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>AI Crop Recommendations</h2>
            <p className="text-lg mb-6" style={{ color: 'var(--muted-foreground)' }}>
              Based on your farm conditions, here are the best crops to grow
            </p>
            <Button 
              onClick={resetForm}
              variant="outline"
              className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 text-lg rounded-xl"
            >
              Get New Recommendations
            </Button>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendations.map((crop, index) => (
              <Card 
                key={index} 
                className={`border-0 shadow-xl transition-all duration-300 transform hover:scale-105 ${
                  crop.isRecommended 
                    ? 'bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-50 border-2 border-emerald-200' 
                    : 'bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 border-2 border-rose-200'
                }`}
              >
                <CardContent className="p-6">
                  {/* Crop Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{crop.cropName}</h3>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`px-4 py-2 rounded-full text-lg font-bold border-2 ${getRatingColor(crop.rating)}`}>
                          Rating: {crop.rating}/10
                        </div>
                        {crop.isRecommended ? (
                          <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full font-semibold">
                            Recommended
                          </div>
                        ) : (
                          <div className="px-3 py-1 bg-rose-100 text-rose-800 text-sm rounded-full font-semibold">
                            Not Recommended
                          </div>
                        )}
                      </div>
                    </div>
                    {getRatingIcon(crop.rating)}
                  </div>

                  {/* Reason */}
                  <div className="bg-white/60 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-blue-600" />
                      Why This Crop?
                    </h4>
                    <p className="text-slate-700">{crop.reason}</p>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-white/60 rounded-lg p-3">
                      <span className="text-sm text-slate-600">Best Time:</span>
                      <div className="font-semibold text-slate-900">{crop.bestTime}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <span className="text-sm text-slate-600">Water Needs:</span>
                      <div className="font-semibold text-slate-900">{crop.waterNeeds}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <span className="text-sm text-slate-600">Expected Yield:</span>
                      <div className="font-semibold text-slate-900">{crop.yield}</div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3">
                      <span className="text-sm text-slate-600">Market Demand:</span>
                      <div className="font-semibold text-slate-900">{crop.marketDemand}</div>
                    </div>
                  </div>

                  {/* Precautions */}
                  <div className="bg-white/60 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
                      Precautions
                    </h4>
                    <ul className="space-y-1">
                      {crop.precautions.map((precaution, idx) => (
                        <li key={idx} className="text-slate-700 flex items-start">
                          <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {precaution}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full ${
                      crop.isRecommended 
                        ? 'bg-emerald-600 hover:bg-emerald-700' 
                        : 'bg-slate-600 hover:bg-slate-700'
                    } text-white`}
                  >
                    {crop.isRecommended ? 'Plan This Crop' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Farming Tip */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Pro Farming Tip</h4>
                  <p className="text-slate-700 leading-relaxed">
                    Always consider crop rotation to maintain soil health and prevent pest buildup. 
                    The AI recommendations are based on current conditions, but seasonal variations 
                    may affect actual performance. Monitor weather forecasts and adjust your plans accordingly.
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
