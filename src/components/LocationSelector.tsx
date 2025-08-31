"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MapPin, Search, Navigation, Globe, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface Location {
  city: string
  state: string
  country: string
  coordinates?: {
    lat: number
    lng: number
  }
}

interface LocationSelectorProps {
  isOpen: boolean
  onClose: () => void
}

// Popular Indian farming locations
const popularLocations = [
  { city: 'Punjab', state: 'Punjab', country: 'India' },
  { city: 'Haryana', state: 'Haryana', country: 'India' },
  { city: 'Uttar Pradesh', state: 'Uttar Pradesh', country: 'India' },
  { city: 'Maharashtra', state: 'Maharashtra', country: 'India' },
  { city: 'Karnataka', state: 'Karnataka', country: 'India' },
  { city: 'Tamil Nadu', state: 'Tamil Nadu', country: 'India' },
  { city: 'Gujarat', state: 'Gujarat', country: 'India' },
  { city: 'Rajasthan', state: 'Rajasthan', country: 'India' },
  { city: 'Madhya Pradesh', state: 'Madhya Pradesh', country: 'India' },
  { city: 'West Bengal', state: 'West Bengal', country: 'India' },
]

export default function LocationSelector({ isOpen, onClose }: LocationSelectorProps) {
  const { user, updateLocation } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredLocations, setFilteredLocations] = useState(popularLocations)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  useEffect(() => {
    if (searchTerm) {
      const filtered = popularLocations.filter(location =>
        location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.state.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredLocations(filtered)
    } else {
      setFilteredLocations(popularLocations)
    }
  }, [searchTerm])

  const handleLocationSelect = (location: Location) => {
    updateLocation(location)
    onClose()
  }

  const getCurrentLocation = () => {
    setIsGettingLocation(true)
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          
          // In a real app, you would reverse geocode these coordinates
          // For now, we'll use a default location
          const currentLocation: Location = {
            city: 'Current Location',
            state: 'Detected',
            country: 'India',
            coordinates: { lat: latitude, lng: longitude }
          }
          
          updateLocation(currentLocation)
          setIsGettingLocation(false)
          onClose()
        },
        (error) => {
          console.error('Error getting location:', error)
          setIsGettingLocation(false)
          alert('Unable to get your location. Please select manually.')
        }
      )
    } else {
      setIsGettingLocation(false)
      alert('Geolocation is not supported by your browser.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
             <Card className="w-full max-w-2xl border-0 shadow-2xl max-h-[80vh] overflow-hidden bg-white dark:bg-slate-800">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                               <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">Select Location</CardTitle>
               <CardDescription className="text-slate-600 dark:text-slate-400">
                 Choose your farming location for personalized recommendations
               </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Location */}
          {user?.location && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-green-900">Current Location</h3>
                  <p className="text-sm text-green-700">
                    {user.location.city}, {user.location.state}, {user.location.country}
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          )}

          {/* Get Current Location */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
            >
              {isGettingLocation ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Getting Location...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 mr-2" />
                  Use My Current Location
                </>
              )}
            </Button>
          </div>

          {/* Search */}
          <div>
                         <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
               Search Locations
             </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cities or states..."
                className="pl-10 h-12"
              />
            </div>
          </div>

          {/* Popular Locations */}
          <div>
                         <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-3 flex items-center">
               <Globe className="w-4 h-4 mr-2" />
               Popular Farming Locations
             </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {filteredLocations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                                     className="p-3 text-left border border-slate-200 dark:border-slate-600 rounded-lg hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                >
                                     <div className="font-medium text-slate-900 dark:text-slate-100">{location.city}</div>
                   <div className="text-sm text-slate-600 dark:text-slate-400">{location.state}, {location.country}</div>
                </button>
              ))}
            </div>
          </div>

          {filteredLocations.length === 0 && (
            <div className="text-center py-8">
              <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                             <p className="text-slate-600 dark:text-slate-400">No locations found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
