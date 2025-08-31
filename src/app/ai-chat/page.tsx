'use client';

import AIChat from '@/features/ai-chat/AIChat';
import { AuthGuard } from '@/components/AuthGuard';

export default function AIChatPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto py-8">
        <AIChat />
      </div>
    </AuthGuard>
  );
}
