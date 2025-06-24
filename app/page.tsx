'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Shield,
  Video,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  Github,
  ExternalLink,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Shield,
      title: 'Authentication & Team Invites',
      description: 'Secure team management with role-based access control.',
      emoji: '🔐',
    },
    {
      icon: Clock,
      title: 'Scrum Meeting Management',
      description: 'Streamlined daily standups and sprint planning workflows.',
      emoji: '🕑',
    },
    {
      icon: Video,
      title: 'Zoom & AI Transcription',
      description: 'Automatic meeting transcription and intelligent insights.',
      emoji: '🎥',
    },
    {
      icon: MessageSquare,
      title: 'Slack Bot Notifications',
      description: 'Real-time updates and notifications in your workspace.',
      emoji: '💬',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-4 border-yellow-400 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center">
                <span className="text-white font-bold text-sm">S0</span>
              </div>
              <span className="text-2xl font-bold text-black">scrum0.dev</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-black font-medium hover:text-gray-600 transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-black font-medium hover:text-gray-600 transition-colors">
                About
              </Link>
              <Button variant="outline" className="border-2 border-black hover:bg-gray-100">
                Login
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 border-2 border-black bg-white hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t-2 border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link href="#features" className="text-black font-medium">
                  Features
                </Link>
                <Link href="#about" className="text-black font-medium">
                  About
                </Link>
                <Button variant="outline" className="border-2 border-black w-fit">
                  Login
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-8 bg-yellow-400 text-black border-2 border-black font-bold uppercase tracking-wide text-sm px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Scrum Management
            </Badge>
            
            <h1 className="text-4xl md:text-7xl font-black text-black mb-8 leading-tight uppercase">
              AI-First Scrum<br />
              Management for<br />
              <span className="bg-yellow-400 px-4 py-2 inline-block border-4 border-black transform -rotate-1">
                Modern Teams
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-12 max-w-3xl mx-auto">
              Automate updates, extract insights, and save time with intelligent 
              Scrum management that actually works.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black font-bold uppercase tracking-wide text-lg px-12 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="border-4 border-black bg-white hover:bg-gray-100 text-black font-bold uppercase tracking-wide text-lg px-12 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
              >
                Watch Demo
              </Button>
            </div>

            {/* Geometric Pattern */}
            
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-16 bg-gray-50 border-t-4 border-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4 uppercase">
              Core Features
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Everything you need to run efficient, automated Scrum processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 transition-all duration-200"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-yellow-400 border-4 border-black mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                    <CardTitle className="text-xl font-bold text-black uppercase tracking-wide">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 font-medium text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">
            Ready to Transform Your Scrum Process?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join teams already using AI to streamline their agile workflows
          </p>
          <Button 
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-yellow-400 font-bold uppercase tracking-wide text-lg px-12 py-4 shadow-[4px_4px_0px_0px_rgba(255,214,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,214,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-black font-bold">Built by your team • © 2025</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link 
                href="#" 
                className="text-black hover:text-gray-600 transition-colors flex items-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium">GitHub</span>
              </Link>
              <Link 
                href="#" 
                className="text-black hover:text-gray-600 transition-colors flex items-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="font-medium">Privacy</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}