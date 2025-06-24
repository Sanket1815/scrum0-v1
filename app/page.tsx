'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { Header } from '@/components/layout/header';
import Dashboard from './dashboard/page';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Dashboard />
      </div>
    </ProtectedRoute>
  );
}