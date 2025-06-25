'use client';

import { useState, useEffect } from 'react';
import { NeoButton } from '@/components/ui/neo-button';
import { NeoCard, NeoCardContent, NeoCardDescription, NeoCardHeader, NeoCardTitle } from '@/components/ui/neo-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';
import { Eye, EyeOff, User, Mail, Lock, UserPlus, LogIn, AlertCircle, CheckCircle } from 'lucide-react';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    fullName: '',
  });

  const { signIn, signUp, authState, checkConnection } = useAuth();

  // Check connection status on mount
  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  // Real-time form validation
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return 'Email and password are required!';
    }

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email address!';
    }

    if (formData.password && formData.password.length < 6) {
      return 'Password must be at least 6 characters long!';
    }

    if (isSignUp && !formData.username) {
      return 'Username is required for sign up!';
    }

    if (isSignUp && formData.username && formData.username.length < 3) {
      return 'Username must be at least 3 characters long!';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    // Check connection before proceeding
    if (authState.connectionStatus && !authState.connectionStatus.connected) {
      toast.error('Database connection failed. Please check your configuration.');
      return;
    }

    try {
      let result;
      
      if (isSignUp) {
        // Real-time signup with immediate database storage
        result = await signUp(
          formData.email.trim().toLowerCase(), 
          formData.password, 
          formData.username.trim().toLowerCase(), 
          formData.fullName.trim()
        );
      } else {
        // Real-time signin with database validation
        result = await signIn(
          formData.email.trim().toLowerCase(), 
          formData.password
        );
      }

      if (result.success) {
        toast.success(
          isSignUp 
            ? 'Account created successfully! Welcome to scrum0.dev!' 
            : 'Welcome back! Signed in successfully!'
        );
        // Clear form on success
        setFormData({
          email: '',
          password: '',
          username: '',
          fullName: '',
        });
      } else {
        toast.error(result.error || 'Authentication failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Connection status indicator
  const ConnectionStatus = () => {
    if (!authState.connectionStatus) return null;

    const { connected, configured } = authState.connectionStatus;

    if (!configured) {
      return (
        <div className="neo-card bg-yellow-100 border-yellow-500 p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800 font-bold text-sm uppercase">
              DEMO MODE - Supabase not configured
            </p>
          </div>
        </div>
      );
    }

    if (!connected) {
      return (
        <div className="neo-card bg-red-100 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-800 font-bold text-sm uppercase">
              DATABASE CONNECTION FAILED
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="neo-card bg-green-100 border-green-500 p-4 mb-4">
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
          <p className="text-green-800 font-bold text-sm uppercase">
            DATABASE CONNECTED
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <NeoCard className="w-full max-w-md">
        <NeoCardHeader className="text-center">
          <NeoCardTitle className="text-3xl font-black uppercase">
            {isSignUp ? (
              <>
                <UserPlus className="w-8 h-8 inline-block mr-3" />
                JOIN THE REVOLUTION
              </>
            ) : (
              <>
                <LogIn className="w-8 h-8 inline-block mr-3" />
                WELCOME BACK
              </>
            )}
          </NeoCardTitle>
          <NeoCardDescription className="text-lg font-semibold">
            {isSignUp 
              ? 'Create your account and start building' 
              : 'Sign in to continue your journey'
            }
          </NeoCardDescription>
        </NeoCardHeader>

        <NeoCardContent>
          <ConnectionStatus />

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-bold uppercase tracking-wide">
                    <User className="w-4 h-4 inline-block mr-2" />
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="YOUR_USERNAME"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="neo-input font-bold uppercase"
                    required={isSignUp}
                    minLength={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-bold uppercase tracking-wide">
                    Full Name (Optional)
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="YOUR FULL NAME"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="neo-input font-bold uppercase"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold uppercase tracking-wide">
                <Mail className="w-4 h-4 inline-block mr-2" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="YOUR@EMAIL.COM"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="neo-input font-bold uppercase"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold uppercase tracking-wide">
                <Lock className="w-4 h-4 inline-block mr-2" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="YOUR_PASSWORD"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="neo-input font-bold pr-12"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {authState.error && (
              <div className="neo-card bg-red-100 border-red-500 p-4">
                <p className="text-red-800 font-bold text-sm uppercase">
                  {authState.error}
                </p>
              </div>
            )}

            <NeoButton
              type="submit"
              size="lg"
              className="w-full"
              disabled={authState.loading || (authState.connectionStatus && !authState.connectionStatus.connected)}
            >
              {authState.loading ? 'PROCESSING...' : (isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN')}
            </NeoButton>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setFormData({
                    email: '',
                    password: '',
                    username: '',
                    fullName: '',
                  });
                }}
                className="text-sm font-bold uppercase tracking-wide hover:underline"
              >
                {isSignUp 
                  ? 'Already have an account? SIGN IN' 
                  : "Don't have an account? SIGN UP"
                }
              </button>
            </div>
          </form>
        </NeoCardContent>
      </NeoCard>
    </div>
  );
}