'use client';

import MarketDashboard from '@/features/market/MarketDashboard';
import { AuthGuard } from '@/components/AuthGuard';

export default function MarketPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-8">
        <MarketDashboard />
      </div>
    </AuthGuard>
  );
}
