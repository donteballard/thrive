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

  const getMetricIcon = (metricKey: keyof HealthMetrics) => {
    const icons = {
      heartRate: Heart,
      sleepHours: Moon,
      steps: Footprints,
      mindfulness: Brain,
      caloriesBurned: Activity,
      waterIntake: Apple,
      exerciseMinutes: Dumbbell
    };
    const IconComponent = icons[metricKey];
    return <IconComponent className="w-5 h-5" />;
  };

  const getMetricColor = (metric: MetricData) => {
    const percentage = (metric.current / (metric.goal || metric.current)) * 100;
    return percentage >= 100 ? 'text-green-600 dark:text-green-400' :
           percentage >= 75 ? 'text-blue-600 dark:text-blue-400' :
           'text-yellow-600 dark:text-yellow-400';
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-lg overflow-hidden">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
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
              className={`p-4 rounded-xl shadow-sm cursor-pointer transition-colors ${
                selectedMetric === key
                  ? 'bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-600 dark:border-blue-400'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedMetric(key)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  selectedMetric === key
                    ? 'bg-blue-100 dark:bg-blue-900/50'
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  {getMetricIcon(key)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className={`text-xl font-bold ${getMetricColor(metric)}`}>
                      {metric.current}
                    </p>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
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
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold dark:text-white">
            {selectedMetric.replace(/([A-Z])/g, ' $1').trim()} Trends
          </h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Last {timeRange}
            </span>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockHealthData[selectedMetric].history}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                tick={{ fill: '#6B7280' }}
              />
              <YAxis stroke="#6B7280" tick={{ fill: '#6B7280' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: '#F3F4F6'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Goal Progress */}
        {mockHealthData[selectedMetric].goal && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Goal Progress
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {Math.round((mockHealthData[selectedMetric].current / mockHealthData[selectedMetric].goal!) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500"
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