'use client';

import { useAuth } from '@/hooks/use-auth';
import { NeoButton } from '@/components/ui/neo-button';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Settings } from 'lucide-react';
import { toast } from 'sonner';

export function Header() {
  const { authState, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  if (!authState.user) return null;

  return (
    <header className="bg-white neo-border-thick border-b-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="neo-header text-2xl font-black">
            SCRUM0.DEV
          </h1>
          <Badge className="neo-border bg-yellow-400 text-black font-bold uppercase">
            BETA
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span className="font-bold uppercase">
              {authState.user.username}
            </span>
          </div>

          <NeoButton
            variant="secondary"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>SIGN OUT</span>
          </NeoButton>
        </div>
      </div>
    </header>
  );
}