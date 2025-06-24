'use client';

import { useAuth } from '@/hooks/use-auth';
import { NeoCard, NeoCardContent, NeoCardDescription, NeoCardHeader, NeoCardTitle } from '@/components/ui/neo-card';
import { Badge } from '@/components/ui/badge';
import { NeoButton } from '@/components/ui/neo-button';
import { 
  Calendar, 
  Users, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

export default function Dashboard() {
  const { authState } = useAuth();

  const stats = [
    {
      title: 'Active Sprints',
      value: '3',
      icon: Target,
      color: 'bg-yellow-400',
      change: '+2 this week'
    },
    {
      title: 'Team Members',
      value: '12',
      icon: Users,
      color: 'bg-blue-400',
      change: '+1 new member'
    },
    {
      title: 'Completed Tasks',
      value: '47',
      icon: CheckCircle,
      color: 'bg-green-400',
      change: '+15 this sprint'
    },
    {
      title: 'Avg. Velocity',
      value: '23',
      icon: TrendingUp,
      color: 'bg-red-400',
      change: '+5% improvement'
    }
  ];

  const recentActivities = [
    {
      type: 'sprint',
      title: 'Sprint Planning Meeting',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'standup',
      title: 'Daily Standup - Team Alpha',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      type: 'review',
      title: 'Sprint Review - Q1 Features',
      time: '1 day ago',
      status: 'pending'
    },
    {
      type: 'retro',
      title: 'Sprint Retrospective',
      time: '2 days ago',
      status: 'completed'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="neo-header text-4xl font-black mb-4">
          WELCOME BACK, {authState.user?.username?.toUpperCase()}!
        </h1>
        <p className="text-xl font-semibold text-gray-700">
          Ready to crush some sprints? Let's make today brutally productive.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <NeoCard key={index} hoverable>
              <NeoCardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${stat.color} neo-border flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                  <Badge className="neo-border bg-white text-black font-bold text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </NeoCardHeader>
              <NeoCardContent>
                <div className="text-3xl font-black mb-1">{stat.value}</div>
                <div className="text-sm font-bold uppercase tracking-wide text-gray-600">
                  {stat.title}
                </div>
              </NeoCardContent>
            </NeoCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <NeoCard variant="yellow" className="lg:col-span-1">
          <NeoCardHeader>
            <NeoCardTitle className="text-xl flex items-center">
              <Plus className="w-6 h-6 mr-2" />
              QUICK ACTIONS
            </NeoCardTitle>
          </NeoCardHeader>
          <NeoCardContent className="space-y-4">
            <NeoButton className="w-full justify-start" variant="secondary">
              <Calendar className="w-4 h-4 mr-2" />
              START DAILY STANDUP
            </NeoButton>
            <NeoButton className="w-full justify-start" variant="secondary">
              <Target className="w-4 h-4 mr-2" />
              CREATE NEW SPRINT
            </NeoButton>
            <NeoButton className="w-full justify-start" variant="secondary">
              <Users className="w-4 h-4 mr-2" />
              INVITE TEAM MEMBER
            </NeoButton>
            <NeoButton className="w-full justify-start" variant="secondary">
              <TrendingUp className="w-4 h-4 mr-2" />
              VIEW ANALYTICS
            </NeoButton>
          </NeoCardContent>
        </NeoCard>

        {/* Recent Activity */}
        <NeoCard className="lg:col-span-2">
          <NeoCardHeader>
            <NeoCardTitle className="text-xl flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              RECENT ACTIVITY
            </NeoCardTitle>
            <NeoCardDescription>
              Your latest scrum activities and updates
            </NeoCardDescription>
          </NeoCardHeader>
          <NeoCardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 neo-card bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'completed' ? 'bg-green-400' : 
                      activity.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'
                    }`} />
                    <div>
                      <div className="font-bold text-sm uppercase">
                        {activity.title}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <Badge className={`neo-border text-xs font-bold ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {activity.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </NeoCardContent>
        </NeoCard>
      </div>

      {/* Upcoming Events */}
      <NeoCard className="mt-8" variant="white">
        <NeoCardHeader>
          <NeoCardTitle className="text-xl flex items-center">
            <AlertCircle className="w-6 h-6 mr-2" />
            UPCOMING EVENTS
          </NeoCardTitle>
          <NeoCardDescription>
            Don't miss these important scrum events
          </NeoCardDescription>
        </NeoCardHeader>
        <NeoCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="neo-card bg-yellow-50 p-4">
              <div className="font-bold text-sm uppercase mb-2">TODAY - 2:00 PM</div>
              <div className="text-lg font-black mb-1">Sprint Review</div>
              <div className="text-sm text-gray-600">Team Alpha - Q1 Features</div>
            </div>
            <div className="neo-card bg-blue-50 p-4">
              <div className="font-bold text-sm uppercase mb-2">TOMORROW - 9:00 AM</div>
              <div className="text-lg font-black mb-1">Daily Standup</div>
              <div className="text-sm text-gray-600">All Teams - Progress Update</div>
            </div>
            <div className="neo-card bg-green-50 p-4">
              <div className="font-bold text-sm uppercase mb-2">FRI - 3:00 PM</div>
              <div className="text-lg font-black mb-1">Sprint Planning</div>
              <div className="text-sm text-gray-600">Team Beta - Next Sprint</div>
            </div>
          </div>
        </NeoCardContent>
      </NeoCard>
    </div>
  );
}