'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Moon,
  Footprints,
  Brain,
  Activity,
  Apple,
  Dumbbell,
  Calendar
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface MetricData {
  current: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
  goal?: number;
  history: { date: string; value: number }[];
}

interface HealthMetrics {
  heartRate: MetricData;
  sleepHours: MetricData;
  steps: MetricData;
  mindfulness: MetricData;
  caloriesBurned: MetricData;
  waterIntake: MetricData;
  exerciseMinutes: MetricData;
}

// Mock data for health metrics
const mockHealthData: HealthMetrics = {
  heartRate: {
    current: 72,
    trend: 'stable',
    unit: 'bpm',
    goal: 70,
    history: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: 70 + Math.floor(Math.random() * 10)
    })).reverse()
  },
  sleepHours: {
    current: 7.5,
    trend: 'up',
    unit: 'hours',
    goal: 8,
    history: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: 6 + Math.random() * 3
    })).reverse()
  },
  steps: {
    current: 8432,
    trend: 'up',
    unit: 'steps',
    goal: 10000,
    history: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: 7000 + Math.floor(Math.random() * 4000)
    })).reverse()
  },
  mindfulness: {
    current: 15,
    trend: 'up',
    unit: 'minutes',
    goal: 20,
    history: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: 10 + Math.floor(Math.random() * 15)
    })).reverse()
  },
  caloriesBurned: {
    current: 2150,
    trend: 'up',
    unit: 'kcal',
    goal: 2500,
    history: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: 2000 + Math.floor(Math.random() * 1000)
    })).reverse()
  },
  waterIntake: {
    current: 1.8,
    trend: 'down',
    unit: 'L',
    goal: 2.5,
    history: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: 1.5 + Math.random()
    })).reverse()
  },
  exerciseMinutes: {
    current: 45,
    trend: 'up',
    unit: 'minutes',
    goal: 60,
    history: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: 30 + Math.floor(Math.random() * 40)
    })).reverse()
  }
};

export function HealthMetrics() {
  const [selectedMetric, setSelectedMetric] = useState<keyof HealthMetrics>('heartRate');
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');

  const getMetricIcon = (metric: keyof HealthMetrics) => {
    const iconProps = { className: 'w-5 h-5 text-primary' };
    switch (metric) {
      case 'heartRate':
        return <Heart {...iconProps} />;
      case 'sleepHours':
        return <Moon {...iconProps} />;
      case 'steps':
        return <Footprints {...iconProps} />;
      case 'mindfulness':
        return <Brain {...iconProps} />;
      case 'caloriesBurned':
        return <Activity {...iconProps} />;
      case 'waterIntake':
        return <Apple {...iconProps} />;
      case 'exerciseMinutes':
        return <Dumbbell {...iconProps} />;
      default:
        return null;
    }
  };

  const getMetricColor = (metric: MetricData) => {
    if (metric.trend === 'up') return 'text-white';
    if (metric.trend === 'down') return 'text-white';
    return 'text-white';
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg overflow-hidden border border-green-800">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              timeRange === 'week'
                ? 'bg-primary text-black'
                : 'bg-black text-gray-400 hover:bg-primary/20 hover:text-white'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              timeRange === 'month'
                ? 'bg-primary text-black'
                : 'bg-black text-gray-400 hover:bg-primary/20 hover:text-white'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.keys(mockHealthData) as Array<keyof HealthMetrics>).map((key) => {
          const metric = mockHealthData[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl cursor-pointer transition-colors ${
                selectedMetric === key
                  ? 'bg-black border-2 border-primary'
                  : 'bg-black border border-green-800 hover:border-primary'
              }`}
              onClick={() => setSelectedMetric(key)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetric === key
                    ? 'bg-primary/20'
                    : 'bg-primary/10'
                }`}>
                  {getMetricIcon(key)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-xl font-bold ${getMetricColor(metric)}`}>
                      {metric.current}
                    </p>
                    <span className="text-sm text-gray-400">
                      {metric.unit}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border border-green-800 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            {selectedMetric.replace(/([A-Z])/g, ' $1').trim()} Trends
          </h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">
              Last {timeRange === 'week' ? '7 Days' : '30 Days'}
            </span>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockHealthData[selectedMetric].history}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis stroke="#6B7280" tick={{ fill: '#6B7280' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000000',
                  border: '1px solid #22C55E',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#22C55E"
                strokeWidth={2}
                dot={{ fill: '#22C55E', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Goal Progress */}
        {mockHealthData[selectedMetric].goal && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400">
                Goal Progress
              </span>
              <span className="text-sm font-medium text-gray-400">
                {Math.round((mockHealthData[selectedMetric].current / mockHealthData[selectedMetric].goal!) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-black border border-green-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (mockHealthData[selectedMetric].current / mockHealthData[selectedMetric].goal!) * 100)}%`
                }}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
} 