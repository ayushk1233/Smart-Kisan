'use client';

import InventoryManagement from '@/features/inventory/InventoryManagement';
import AICropAdvisor from '@/features/ai-crop-advisor/AICropAdvisor';
import WeatherDashboard from '@/features/weather/WeatherDashboard';
import MarketDashboard from '@/features/market/MarketDashboard';
import AIChat from '@/features/ai-chat/AIChat';

interface User {
  location?: {
    city: string;
    state: string;
  };
}

interface DashboardProps {
  user: User;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, activeTab }) => {
  switch (activeTab) {
    case 'inventory':
      return <InventoryManagement />;
    case 'weather':
      return <WeatherDashboard />;
    case 'ai-tools':
      return <AICropAdvisor />;
    case 'ai-chat':
      return <AIChat />;
    case 'market':
      return <MarketDashboard />;
    default:
      return null;
  }
};

export default Dashboard;
