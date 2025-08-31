'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import LoginModal from '@/components/LoginModal';
import { useState } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

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

  return <>{children}</>;
}
