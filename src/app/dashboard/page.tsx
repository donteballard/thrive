'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Heart,
  Moon,
  Footprints,
  Brain,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { AiCoach } from '@/components/dashboard/AiCoach';
import { DailyCheckInModal } from '@/components/modals/DailyCheckInModal';
import { WelcomeModal } from '@/components/modals/WelcomeModal';

interface HealthMetric {
  current: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  previousValue?: number;
  change?: number;
  lastUpdated: string;
}

interface HealthMetrics {
  heartRate: HealthMetric;
  sleepHours: HealthMetric;
  steps: HealthMetric;
  mindfulness: HealthMetric;
}

interface CommunityHighlight {
  id: number;
  type: 'challenge' | 'milestone' | 'leaderboard';
  title: string;
  description?: string;
  participants?: number;
  progress?: number;
  user?: string;
  achievement?: string;
  timestamp: string;
}

interface WeeklyProgress {
  tasksCompleted: number;
  goalsAdvanced: number;
  achievementsUnlocked: number;
  streakDays: number;
  totalPoints: number;
  startDate: string;
  endDate: string;
}

// Initial states with loading
const initialHealthMetrics: HealthMetrics = {
  heartRate: { current: 0, trend: 'stable', unit: 'bpm', lastUpdated: '' },
  sleepHours: { current: 0, trend: 'stable', unit: 'hours', lastUpdated: '' },
  steps: { current: 0, trend: 'stable', unit: 'steps', lastUpdated: '' },
  mindfulness: { current: 0, trend: 'stable', unit: 'minutes', lastUpdated: '' }
};

const initialWeeklyProgress: WeeklyProgress = {
  tasksCompleted: 0,
  goalsAdvanced: 0,
  achievementsUnlocked: 0,
  streakDays: 0,
  totalPoints: 0,
  startDate: '',
  endDate: ''
};

export default function DashboardPage() {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  
  // Data states
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics>(initialHealthMetrics);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgress>(initialWeeklyProgress);
  const [communityHighlights, setCommunityHighlights] = useState<CommunityHighlight[]>([]);
  
  // Loading states
  const [isLoadingHealth, setIsLoadingHealth] = useState(true);
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);
  const [isLoadingCommunity, setIsLoadingCommunity] = useState(true);
  
  // Error states
  const [healthError, setHealthError] = useState<string | null>(null);
  const [progressError, setProgressError] = useState<string | null>(null);
  const [communityError, setCommunityError] = useState<string | null>(null);

  useEffect(() => {
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    const today = new Date().toDateString();
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    const hasCheckedInToday = sessionStorage.getItem('hasCheckedInToday') === 'true';

    // Set initial hasCheckedIn state based on localStorage
    if (lastCheckIn === today || hasCheckedInToday) {
      setHasCheckedIn(true);
      return; // Don't show any modals if already checked in
    }

    // For first-time users, only show welcome modal initially
    if (!hasSeenWelcome) {
      setShowWelcome(true);
      return; // Don't show check-in modal yet
    }

    // For returning users or after welcome modal is closed
    setShowCheckIn(true);
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      await Promise.all([
        fetchHealthMetrics(),
        fetchWeeklyProgress(),
        fetchCommunityHighlights()
      ]);
    };

    fetchDashboardData();
  }, []);

  const fetchHealthMetrics = async () => {
    setIsLoadingHealth(true);
    setHealthError(null);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData: HealthMetrics = {
        heartRate: { current: 72, trend: 'stable', unit: 'bpm', lastUpdated: new Date().toISOString() },
        sleepHours: { current: 7.5, trend: 'up', unit: 'hours', lastUpdated: new Date().toISOString() },
        steps: { current: 8432, trend: 'up', unit: 'steps', lastUpdated: new Date().toISOString() },
        mindfulness: { current: 15, trend: 'up', unit: 'minutes', lastUpdated: new Date().toISOString() }
      };
      setHealthMetrics(mockData);
    } catch (err) {
      setHealthError('Failed to load health metrics');
    } finally {
      setIsLoadingHealth(false);
    }
  };

  const fetchWeeklyProgress = async () => {
    setIsLoadingProgress(true);
    setProgressError(null);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData: WeeklyProgress = {
        tasksCompleted: 28,
        goalsAdvanced: 5,
        achievementsUnlocked: 3,
        streakDays: 5,
        totalPoints: 1250,
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        endDate: new Date().toISOString()
      };
      setWeeklyProgress(mockData);
    } catch (err) {
      setProgressError('Failed to load weekly progress');
    } finally {
      setIsLoadingProgress(false);
    }
  };

  const fetchCommunityHighlights = async () => {
    setIsLoadingCommunity(true);
    setCommunityError(null);
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockData: CommunityHighlight[] = [
        {
          id: 1,
          type: 'challenge',
          title: '30-Day Meditation',
          participants: 156,
          progress: 40,
          timestamp: new Date().toISOString()
        },
        {
          id: 2,
          type: 'milestone',
          title: 'Group Goal Achieved',
          description: 'Community reached 1M total steps!',
          timestamp: new Date().toISOString()
        },
        {
          id: 3,
          type: 'leaderboard',
          title: 'Top Performer',
          user: 'Alex T.',
          achievement: 'Most consistent daily goals',
          timestamp: new Date().toISOString()
        }
      ];
      setCommunityHighlights(mockData);
    } catch (err) {
      setCommunityError('Failed to load community highlights');
    } finally {
      setIsLoadingCommunity(false);
    }
  };

  const handleDailyCheckIn = () => {
    if (!hasCheckedIn) {
      setShowCheckIn(true);
    }
  };

  const handleCheckInComplete = () => {
    const today = new Date().toDateString();
    localStorage.setItem('lastCheckIn', today);
    sessionStorage.setItem('hasCheckedInToday', 'true');
    setHasCheckedIn(true);
    setShowCheckIn(false);
    // TODO: Update user's streak and rewards in the database
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
    
    // Show check-in modal after welcome modal is closed (if needed)
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    const today = new Date().toDateString();
    
    if (lastCheckIn !== today && !hasCheckedIn) {
      setShowCheckIn(true);
    }
  };

  const handleGetStarted = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
    
    // Show check-in modal after welcome modal is closed (if needed)
    const lastCheckIn = localStorage.getItem('lastCheckIn');
    const today = new Date().toDateString();
    
    if (lastCheckIn !== today && !hasCheckedIn) {
      setShowCheckIn(true);
    }
    
    // TODO: Implement onboarding flow or redirect to profile setup
  };

  const renderLoadingCard = () => (
    <div className="flex items-center justify-center p-6 bg-black rounded-xl border border-green-800">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );

  const renderErrorCard = (message: string) => (
    <div className="p-6 bg-black rounded-xl border border-green-800">
      <p className="text-red-400 text-center">{message}</p>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Daily Check-in Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-black to-green-900 rounded-xl p-6 text-white border border-green-800"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-gray-400">Track your progress and earn rewards daily</p>
          </div>
          <button
            onClick={handleDailyCheckIn}
            disabled={hasCheckedIn}
            className={`px-6 py-3 rounded-lg transition-colors ${
              hasCheckedIn
                ? 'bg-primary/50 cursor-not-allowed'
                : 'bg-primary hover:bg-primary/90 text-black'
            }`}
          >
            {hasCheckedIn ? 'Checked In ✓' : 'Daily Check-in'}
          </button>
        </div>
      </motion.div>

      {/* AI Coach Section */}
      <div className="mb-6">
        <AiCoach />
      </div>

      {/* Health Metrics Grid */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Health Metrics</h2>
        {isLoadingHealth ? (
          renderLoadingCard()
        ) : healthError ? (
          renderErrorCard(healthError)
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Heart Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black p-4 rounded-xl shadow-sm border border-green-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Heart Rate</p>
                  <p className="text-xl font-bold text-white">
                    {healthMetrics.heartRate.current} {healthMetrics.heartRate.unit}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Sleep */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-black p-4 rounded-xl shadow-sm border border-green-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Moon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Sleep</p>
                  <p className="text-xl font-bold text-white">
                    {healthMetrics.sleepHours.current} {healthMetrics.sleepHours.unit}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-black p-4 rounded-xl shadow-sm border border-green-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Footprints className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Steps</p>
                  <p className="text-xl font-bold text-white">
                    {healthMetrics.steps.current.toLocaleString()} {healthMetrics.steps.unit}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Mindfulness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-black p-4 rounded-xl shadow-sm border border-green-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mindfulness</p>
                  <p className="text-xl font-bold text-white">
                    {healthMetrics.mindfulness.current} {healthMetrics.mindfulness.unit}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Weekly Progress and Community Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress */}
        {isLoadingProgress ? (
          renderLoadingCard()
        ) : progressError ? (
          renderErrorCard(progressError)
        ) : (
          <div className="bg-black rounded-xl shadow-sm p-6 border border-green-800">
            <h2 className="text-xl font-semibold mb-4 text-white">Weekly Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Tasks Completed</p>
                    <p className="font-semibold text-white">{weeklyProgress.tasksCompleted}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Goals Advanced</p>
                    <p className="font-semibold text-white">{weeklyProgress.goalsAdvanced}</p>
                  </div>
                </div>
              </div>

              <div className="h-px bg-green-800" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Streak Days</p>
                    <p className="font-semibold text-white">{weeklyProgress.streakDays} days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Points</p>
                    <p className="font-semibold text-white">{weeklyProgress.totalPoints}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Highlights */}
        {isLoadingCommunity ? (
          renderLoadingCard()
        ) : communityError ? (
          renderErrorCard(communityError)
        ) : (
          <div className="bg-black rounded-xl shadow-sm p-6 border border-green-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Community</h2>
              <a 
                href="/dashboard/community"
                className="text-sm text-primary hover:text-primary/60"
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              {communityHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-green-900/20 border border-green-800"
                >
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{highlight.title}</h3>
                    {highlight.type === 'challenge' && highlight.progress !== undefined && (
                      <div className="mt-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-2 bg-black rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${highlight.progress}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-400">
                            {highlight.progress}%
                          </span>
                        </div>
                        {highlight.participants && (
                          <p className="text-sm text-gray-400">
                            {highlight.participants} participants
                          </p>
                        )}
                      </div>
                    )}
                    {highlight.type === 'milestone' && highlight.description && (
                      <p className="text-sm text-gray-400">
                        {highlight.description}
                      </p>
                    )}
                    {highlight.type === 'leaderboard' && highlight.user && highlight.achievement && (
                      <p className="text-sm text-gray-400">
                        {highlight.user} - {highlight.achievement}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <DailyCheckInModal
        isOpen={showCheckIn}
        onClose={() => setShowCheckIn(false)}
        onComplete={handleCheckInComplete}
      />

      <WelcomeModal
        isOpen={showWelcome}
        onClose={handleWelcomeClose}
        onGetStarted={handleGetStarted}
      />
    </div>
  );
} 