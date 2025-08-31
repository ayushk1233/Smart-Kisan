'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import LocationSelector from '@/components/LocationSelector';
import {
  Package,
  CloudRain,
  Brain,
  TrendingUp,
  Users,
  HomeIcon,
  MessageCircle,
  Menu,
  Sprout,
  MapPin
} from 'lucide-react';

interface User {
  location?: {
    city: string;
    state: string;
  };
}

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
  user: User;
  logout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
  user,
  logout,
  activeTab,
  setActiveTab
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setSearchOpen(false);
        setNotificationsOpen(false);
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: HomeIcon, color: 'from-amber-500 to-orange-600' },
    { id: 'inventory', name: 'Inventory', icon: Package, color: 'from-green-500 to-emerald-600' },
    { id: 'weather', name: 'Weather', icon: CloudRain, color: 'from-sky-500 to-blue-600' },
    { id: 'ai-tools', name: 'AI Tools', icon: Brain, color: 'from-purple-500 to-indigo-600' },
    { id: 'ai-chat', name: 'AI Chat', icon: MessageCircle, color: 'from-purple-500 to-pink-600' },
    { id: 'market', name: 'Market', icon: TrendingUp, color: 'from-orange-500 to-amber-600' },
    { id: 'community', name: 'Community', icon: Users, color: 'from-teal-500 to-green-600' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)' }}>
      <header className="border-b border-slate-200 shadow-sm sticky top-0 z-50" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sprout className="w-6 h-6 text-white" />
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

            <nav className="hidden lg:flex items-center space-x-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center space-x-2"
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </Button>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <LocationSelector
                isOpen={showLocationModal}
                onClose={() => setShowLocationModal(false)}
              />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default AuthenticatedLayout;
