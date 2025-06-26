'use client';


// import { ProtectedRoute } from '@/components/auth/protected-route';
// import { Header } from '@/components/layout/header';
// import Dashboard from './dashboard/page';

// export default function Home() {
//   return (
//     <ProtectedRoute>
//       <div className="min-h-screen bg-gray-100">
//         <Header />
//         <Dashboard />
//       </div>
//     </ProtectedRoute>

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Calendar,
  Video,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  Github,
  ExternalLink,
  Zap,
  CheckCircle,
  Clock,
  Bot,
  Mic,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      icon: Users,
      title: 'Team Authentication & Invites',
      description: 'Organization-based signup with team member invitations via email.',
      emoji: '🔐',
      details: [
        'Organization/Team registration',
        'Email-based member invitations',
        'Role-based access control',
        'Secure team management'
      ]
    },
    {
      icon: Calendar,
      title: 'Scrum Meeting Management',
      description: 'Create, schedule, and manage recurring scrum meetings with full CRUD operations.',
      emoji: '🕑',
      details: [
        'Individual & recurring meeting creation',
        'Monthly dashboard view',
        'Past meeting details & history',
        'Participant tracking & status'
      ]
    },
    {
      icon: Video,
      title: 'Zoom Integration & AI Transcription',
      description: 'Automatic Zoom meeting creation with AI-powered transcript analysis.',
      emoji: '🎥',
      details: [
        'Auto Zoom meeting generation',
        'Speech-to-text transcription',
        'AI-powered meeting summaries',
        'Action item extraction'
      ]
    },
    {
      icon: MessageSquare,
      title: 'Slack Bot Integration',
      description: 'Intelligent Slack bot for automated notifications and action item tracking.',
      emoji: '💬',
      details: [
        'Custom scrum0.dev Slack bot',
        'Action item notifications',
        'Automated user pings',
        'Real-time status updates'
      ]
    },
  ];

  const meetingFeatures = [
    {
      icon: CheckCircle,
      title: 'Meeting Tracking',
      description: 'Present/Absent users, individual status summaries'
    },
    {
      icon: FileText,
      title: 'Action Items',
      description: 'AI-extracted action plans and assignments'
    },
    {
      icon: AlertTriangle,
      title: 'Blockers',
      description: 'Automatically identified impediments and blockers'
    },
    {
      icon: Mic,
      title: 'User Notes',
      description: 'Additional insights and meeting notes'
    }
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
              <Link href="#how-it-works" className="text-black font-medium hover:text-gray-600 transition-colors">
                How It Works
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
                <Link href="#how-it-works" className="text-black font-medium">
                  How It Works
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
              Centralize & Automate<br />
              Your Scrum Process<br />
              <span className="bg-yellow-400 px-4 py-2 inline-block border-4 border-black transform -rotate-1">
                With AI Magic
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-12 max-w-3xl mx-auto">
              Transform Zoom transcripts into actionable scrum entries. 
              Automate notifications, extract insights, and eliminate manual note-taking.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black font-bold uppercase tracking-wide text-lg px-12 py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
              >
                Start Your Team
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
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-16 bg-gray-50 border-t-4 border-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4 uppercase">
              MVP Core Features
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Everything you need for intelligent, automated Scrum management
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="border-4 border-black bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-2 hover:-translate-y-2 transition-all duration-200"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-yellow-400 border-4 border-black flex items-center justify-center">
                        <span className="text-2xl">{feature.emoji}</span>
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-black uppercase tracking-wide">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-gray-700 font-medium mt-2">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-yellow-400 border border-black"></div>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meeting Details Section */}
      <section className="py-16 bg-white border-t-4 border-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4 uppercase">
              Comprehensive Meeting Tracking
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Every scrum meeting is automatically analyzed and organized with AI-powered insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meetingFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="border-4 border-black bg-gray-50 text-center hover:bg-yellow-50 transition-colors"
                >
                  <CardHeader className="pb-2">
                    <div className="w-12 h-12 bg-black border-2 border-black mx-auto mb-3 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-bold text-black uppercase tracking-wide">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-700 font-medium">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="border-4 border-black bg-yellow-400 max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <Bot className="w-8 h-8 text-black" />
                  <h3 className="text-2xl font-black text-black uppercase">AI-Powered Analysis</h3>
                </div>
                <p className="text-black font-semibold text-lg">
                  Our AI agent automatically processes Zoom transcripts to extract action items, 
                  identify blockers, and generate comprehensive meeting summaries. 
                  No more manual note-taking or missed follow-ups.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-50 border-t-4 border-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-black mb-4 uppercase">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white border-4 border-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2 uppercase">Create & Schedule</h3>
              <p className="text-gray-700">Set up your team and schedule recurring scrum meetings with automatic Zoom integration</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white border-4 border-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2 uppercase">Meet & Record</h3>
              <p className="text-gray-700">Conduct your scrum meetings on Zoom with automatic transcription and recording</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white border-4 border-black mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-2 uppercase">AI Analysis</h3>
              <p className="text-gray-700">AI processes transcripts to generate summaries, extract action items, and send Slack notifications</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white border-t-4 border-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase">
            Ready to Revolutionize Your Scrums?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join forward-thinking teams using AI to streamline their agile workflows and eliminate manual overhead
          </p>
          <Button 
            size="lg"
            className="bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-yellow-400 font-bold uppercase tracking-wide text-lg px-12 py-4 shadow-[4px_4px_0px_0px_rgba(255,214,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(255,214,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            Start Your Organization
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