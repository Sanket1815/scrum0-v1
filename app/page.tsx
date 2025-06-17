'use client';

import { useState } from 'react';
import { NeoButton } from '@/components/ui/neo-button';
import {
  NeoCard,
  NeoCardContent,
  NeoCardDescription,
  NeoCardFooter,
  NeoCardHeader,
  NeoCardTitle,
} from '@/components/ui/neo-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Rocket,
  Shield,
  Database,
  Code,
  Palette,
  Star,
  ArrowRight,
} from 'lucide-react';
import { logger } from '@/lib/logger';
import { toast } from 'sonner';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleGetStarted = () => {
    if (!email) {
      toast.error('Please enter your email!');
      return;
    }
    logger.info('User initiated signup', { email });
    toast.success('Welcome to the brutalist revolution!');
  };

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with Next.js 14+ for maximum performance',
      color: 'bg-yellow-400',
    },
    {
      icon: Shield,
      title: 'Rock Solid',
      description: 'TypeScript, ESLint, and Prettier for bulletproof code',
      color: 'bg-red-400',
    },
    {
      icon: Database,
      title: 'Supabase Ready',
      description: 'Complete backend integration out of the box',
      color: 'bg-blue-400',
    },
    {
      icon: Palette,
      title: 'Neo-Brutalist',
      description: 'Bold, unapologetic design that demands attention',
      color: 'bg-green-400',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-6 neo-border bg-yellow-400 text-black font-bold uppercase tracking-wide">
            <Star className="w-4 h-4 mr-2" />
            Neo-Brutalism Framework
          </Badge>
          
          <h1 className="neo-header text-6xl md:text-8xl font-black mb-8 leading-tight">
            BOLD.<br />
            BRUTAL.<br />
            <span className="neo-bg-yellow px-4 py-2 inline-block transform -rotate-2">
              BEAUTIFUL.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-12 max-w-3xl mx-auto">
            The most aggressive, production-ready Next.js template ever created.
            No compromise. No subtlety. Just pure, unfiltered web excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-8">
            <Input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="neo-input text-center font-bold uppercase"
            />
            <NeoButton 
              onClick={handleGetStarted}
              size="lg"
              className="w-full sm:w-auto"
            >
              GET STARTED
              <ArrowRight className="w-5 h-5 ml-2" />
            </NeoButton>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <NeoCard key={index} hoverable className="text-center">
                <NeoCardHeader>
                  <div className={`w-16 h-16 ${feature.color} neo-border mx-auto mb-4 flex items-center justify-center`}>
                    <IconComponent className="w-8 h-8 text-black" />
                  </div>
                  <NeoCardTitle className="text-xl">{feature.title}</NeoCardTitle>
                </NeoCardHeader>
                <NeoCardContent>
                  <NeoCardDescription className="font-medium">
                    {feature.description}
                  </NeoCardDescription>
                </NeoCardContent>
              </NeoCard>
            );
          })}
        </div>

        {/* Tech Stack */}
        <NeoCard variant="yellow" className="mb-16">
          <NeoCardHeader>
            <NeoCardTitle className="text-center text-3xl mb-8">
              <Code className="w-8 h-8 inline-block mr-3" />
              TECH STACK
            </NeoCardTitle>
          </NeoCardHeader>
          <NeoCardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                'Next.js 14+',
                'TypeScript',
                'Tailwind CSS',
                'Supabase',
                'Pino Logging',
                'ESLint',
                'Prettier',
                'shadcn/ui',
              ].map((tech, index) => (
                <div key={index} className="neo-card bg-white p-4">
                  <span className="font-bold text-black uppercase">{tech}</span>
                </div>
              ))}
            </div>
          </NeoCardContent>
        </NeoCard>

        {/* CTA Section */}
        <div className="text-center">
          <NeoCard variant="white" className="max-w-2xl mx-auto">
            <NeoCardHeader>
              <NeoCardTitle className="text-3xl">
                <Rocket className="w-8 h-8 inline-block mr-3" />
                READY TO BUILD?
              </NeoCardTitle>
              <NeoCardDescription className="text-lg">
                This template includes everything you need to build production-ready applications with style.
              </NeoCardDescription>
            </NeoCardHeader>
            <NeoCardFooter className="justify-center gap-4">
              <NeoButton variant="secondary" size="lg">
                VIEW DOCS
              </NeoButton>
              <NeoButton size="lg">
                START CODING
                <Code className="w-5 h-5 ml-2" />
              </NeoButton>
            </NeoCardFooter>
          </NeoCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-yellow-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold uppercase tracking-wide">
            Built with ❤️ and absolutely zero compromise
          </p>
        </div>
      </footer>
    </div>
  );
}