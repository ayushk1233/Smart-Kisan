'use client';

import AICropAdvisor from '@/features/ai-crop-advisor/AICropAdvisor';
import { AuthGuard } from '@/components/AuthGuard';

export default function AIAdvisorPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-8">
        <AICropAdvisor />
      </div>
    </AuthGuard>
  );
}
