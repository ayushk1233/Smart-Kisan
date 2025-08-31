'use client';

import { useState } from 'react';
import { 
  HomeIcon, Package, CloudRain, Brain, MessageCircle, TrendingUp, 
  Users, MapPin, Sprout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import LocationSelector from '@/components/LocationSelector';
import { ThemeToggle } from '@/components/ThemeToggle';
import Overview from '@/components/Overview';
import { useRouter } from 'next/navigation';

// Constants
const tabs = [
  { id: '/', name: 'Overview', icon: HomeIcon, color: 'from-amber-500 to-orange-600' },
  { id: '/inventory', name: 'Inventory', icon: Package, color: 'from-green-500 to-emerald-600' },
  { id: '/weather', name: 'Weather', icon: CloudRain, color: 'from-sky-500 to-blue-600' },
  { id: '/ai-advisor', name: 'AI Tools', icon: Brain, color: 'from-purple-500 to-indigo-600' },
  { id: '/ai-chat', name: 'AI Chat', icon: MessageCircle, color: 'from-purple-500 to-pink-600' },
  { id: '/market', name: 'Market', icon: TrendingUp, color: 'from-orange-500 to-amber-600' },
  { id: '/community', name: 'Community', icon: Users, color: 'from-teal-500 to-green-600' },
];

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen">
        <Hero onLogin={() => setShowLoginModal(true)} />
        <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Welcome to Smart Kisan</h1>
              <div className="flex items-center space-x-2">
                <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>Your Daily Farm Overview</p>
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
          
          <div className="flex items-center space-x-2">
            <LocationSelector
              isOpen={showLocationModal}
              onClose={() => setShowLocationModal(false)}
            />
            <ThemeToggle />
          </div>
        </div>
        
        {/* Main Content */}
        <Overview />

        {/* Navigation */}
        <nav className="flex flex-wrap gap-2 mt-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => router.push(tab.id)}
              className="flex items-center space-x-2"
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </Button>
          ))}
        </nav>

        {/* Floating AI Chat Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => router.push('/ai-chat')}
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
    </div>
  );
}
