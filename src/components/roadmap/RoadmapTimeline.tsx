'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Rocket,
  Brain,
  Users,
  Wallet,
  Trophy,
  Star,
  Zap
} from 'lucide-react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  date: string;
  features: string[];
  category: 'core' | 'community' | 'ai' | 'blockchain';
}

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'Platform Launch',
    description: 'Core features and essential functionality',
    status: 'completed',
    date: 'Q1 2024',
    features: [
      'User Dashboard',
      'Goal Setting',
      'Activity Tracking',
      'Basic Rewards',
      'Wallet Integration'
    ],
    category: 'core'
  },
  {
    id: '2',
    title: 'Community & Social',
    description: 'Enhanced social features and community engagement',
    status: 'in-progress',
    date: 'Q2 2024',
    features: [
      'Community Challenges',
      'Social Feed',
      'Group Activities',
      'Achievement Sharing',
      'Mentorship Program'
    ],
    category: 'community'
  },
  {
    id: '3',
    title: 'AI Integration',
    description: 'Advanced AI features and personalization',
    status: 'upcoming',
    date: 'Q3 2024',
    features: [
      'AI Coach',
      'Personalized Recommendations',
      'Smart Goal Suggestions',
      'Health Insights',
      'Performance Analytics'
    ],
    category: 'ai'
  },
  {
    id: '4',
    title: 'Advanced Blockchain',
    description: 'Enhanced blockchain features and tokenomics',
    status: 'upcoming',
    date: 'Q4 2024',
    features: [
      'NFT Achievements',
      'Governance System',
      'Advanced Staking',
      'Token Utility Expansion',
      'Cross-chain Integration'
    ],
    category: 'blockchain'
  }
];

interface RoadmapTimelineProps {
  variant?: 'landing' | 'dashboard';
}

export function RoadmapTimeline({ variant = 'landing' }: RoadmapTimelineProps) {
  const getStatusIcon = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-primary/80" />;
      case 'upcoming':
        return <Rocket className="w-5 h-5 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: RoadmapItem['category']) => {
    const icons = {
      core: Zap,
      community: Users,
      ai: Brain,
      blockchain: Wallet
    };
    const Icon = icons[category];
    return <Icon className="w-5 h-5 text-primary" />;
  };

  const getStatusColor = (status: RoadmapItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-primary';
      case 'in-progress':
        return 'bg-primary/80';
      case 'upcoming':
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-white">Development Roadmap</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Track our progress and see what's coming next. We're constantly working to bring you new features and improvements.
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-green-800" />

        {/* Timeline Items */}
        <div className="space-y-20">
          {roadmapData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Timeline Point */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black border-4 border-primary" />

              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className="bg-black rounded-xl shadow-sm p-6 border border-green-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${
                        item.status === 'completed' ? 'bg-primary/20' :
                        item.status === 'in-progress' ? 'bg-primary/10' :
                        'bg-gray-800'
                      }`}>
                        {getCategoryIcon(item.category)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.date}</p>
                      </div>
                    </div>
                    {getStatusIcon(item.status)}
                  </div>

                  <p className="text-gray-400 mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(item.status)}`} />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {item.status === 'in-progress' && (
                    <div className="mt-4 pt-4 border-t border-green-800">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Progress</span>
                        <span className="font-medium text-primary">60%</span>
                      </div>
                      <div className="h-2 bg-black rounded-full overflow-hidden border border-green-800">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: '60%' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

        {/* Legend */}
        <div className="mt-12 flex justify-center gap-6">
          {[
            { status: 'completed', label: 'Completed' },
            { status: 'in-progress', label: 'In Progress' },
            { status: 'upcoming', label: 'Upcoming' }
          ].map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              {getStatusIcon(item.status as RoadmapItem['status'])}
              <span className="text-sm text-gray-400">{item.label}</span>
            </div>
          ))}
        </div>
    </div>
  );
} 