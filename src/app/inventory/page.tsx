'use client';

import InventoryManagement from '@/features/inventory/InventoryManagement';
import { AuthGuard } from '@/components/AuthGuard';

export default function InventoryPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-8">
        <InventoryManagement />
      </div>
    </AuthGuard>
  );
}
