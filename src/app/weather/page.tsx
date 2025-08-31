'use client';

import WeatherDashboard from '@/features/weather/WeatherDashboard';
import { AuthGuard } from '@/components/AuthGuard';

export default function WeatherPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-8">
        <WeatherDashboard />
      </div>
    </AuthGuard>
  );
}
