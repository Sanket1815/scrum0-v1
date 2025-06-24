'use client';

import { useAuth } from '@/hooks/use-auth';
import { AuthForm } from './auth-form';
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { authState } = useAuth();

  if (authState.loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <NeoCard className="p-8">
          <NeoCardContent className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
            <p className="font-bold uppercase tracking-wide">LOADING...</p>
          </NeoCardContent>
        </NeoCard>
      </div>
    );
  }

  if (!authState.user) {
    return <AuthForm />;
  }

  return <>{children}</>;
}