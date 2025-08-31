'use client';

import { AuthGuard } from '@/components/AuthGuard';

export default function CommunityPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Community</h1>
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <p className="text-slate-600 dark:text-slate-400">
            Community features coming soon! Stay tuned for updates.
          </p>
        </div>
      </div>
    </AuthGuard>
  );
}
