'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Shield,
  Settings2,
  Mail,
  ChevronRight
} from 'lucide-react';

interface Setting {
  name: string;
  value: string | boolean;
  type: 'text' | 'email' | 'toggle' | 'select';
  readonly?: boolean;
  options?: string[];
}

interface SettingsSection {
  id: string;
  title: string;
  icon: any; // Using any for Lucide icons type
  settings: Setting[];
}

// Mock user data
const mockUser = {
  name: 'Alex Thompson',
  email: 'alex@example.com',
  walletAddress: '8xht9m1fmx8KCMrqzNgYS9FxVuqRJUr4wXqDhKPvF3Gy',
  language: 'English',
  timezone: 'Pacific Time (PT)',
  theme: 'system',
};

// Settings sections
const settingsSections: SettingsSection[] = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: User,
    settings: [
      { name: 'Display Name', value: mockUser.name, type: 'text' },
      { name: 'Email', value: mockUser.email, type: 'email' },
      { name: 'Wallet Address', value: mockUser.walletAddress, type: 'text', readonly: true },
    ]
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: Bell,
    settings: [
      { name: 'Push Notifications', value: true, type: 'toggle' },
      { name: 'Email Notifications', value: true, type: 'toggle' },
      { name: 'Achievement Alerts', value: true, type: 'toggle' },
      { name: 'Reward Updates', value: true, type: 'toggle' },
      { name: 'Task Reminders', value: false, type: 'toggle' },
    ]
  },
  {
    id: 'preferences',
    title: 'Preferences',
    icon: Settings2,
    settings: [
      { name: 'Language', value: mockUser.language, type: 'select', options: ['English', 'Spanish', 'French', 'German'] },
      { name: 'Timezone', value: mockUser.timezone, type: 'select', options: ['Pacific Time (PT)', 'Eastern Time (ET)', 'Central Time (CT)', 'Mountain Time (MT)'] },
      { name: 'Theme', value: mockUser.theme, type: 'select', options: ['light', 'dark', 'system'] },
    ]
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    settings: [
      { name: 'Two-Factor Authentication', value: false, type: 'toggle' },
      { name: 'Transaction Signing', value: true, type: 'toggle' },
      { name: 'Login Notifications', value: true, type: 'toggle' },
    ]
  },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState(settingsSections);

  const handleSettingChange = (sectionId: string, settingName: string, newValue: string | boolean) => {
    setSettings(prevSettings => 
      prevSettings.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            settings: section.settings.map(setting => {
              if (setting.name === settingName) {
                return { ...setting, value: newValue };
              }
              return setting;
            })
          };
        }
        return section;
      })
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <nav className="space-y-1">
            {settings.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-black'
                      : 'text-gray-400 hover:bg-primary/20 border border-green-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeSection === section.id ? 'text-black' : 'text-primary'}`} />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </nav>
        </motion.div>

        {/* Settings Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-3"
        >
          {settings.map((section) => (
            <div
              key={section.id}
              className={`space-y-4 ${activeSection === section.id ? 'block' : 'hidden'}`}
            >
              <div className="bg-black rounded-xl shadow-sm border border-green-800">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4 text-white">{section.title}</h2>
                  <div className="space-y-6">
                    {section.settings.map((setting) => (
                      <div key={setting.name} className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-white">{setting.name}</h3>
                          {setting.type === 'toggle' && (
                            <p className="text-sm text-gray-400">
                              {setting.value ? 'Enabled' : 'Disabled'}
                            </p>
                          )}
                        </div>
                        {setting.type === 'toggle' ? (
                          <button
                            onClick={() => handleSettingChange(section.id, setting.name, !setting.value)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.value ? 'bg-primary' : 'bg-gray-700'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-black transition-transform ${
                                setting.value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        ) : setting.type === 'select' ? (
                          <select
                            value={setting.value as string}
                            onChange={(e) => handleSettingChange(section.id, setting.name, e.target.value)}
                            className="px-3 py-2 bg-black border border-green-800 rounded-lg text-white focus:ring-primary focus:border-primary"
                          >
                            {setting.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={setting.type}
                            value={setting.value as string}
                            readOnly={setting.readonly}
                            onChange={(e) => handleSettingChange(section.id, setting.name, e.target.value)}
                            className={`px-3 py-2 bg-black border border-green-800 rounded-lg text-white focus:ring-primary focus:border-primary ${
                              setting.readonly ? 'cursor-not-allowed opacity-60' : ''
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {section.id === 'profile' && (
                <div className="mt-4 p-4 bg-primary/20 rounded-lg border border-green-800">
                  <p className="text-sm text-primary">
                    Your profile information is used to personalize your experience and improve our services.
                  </p>
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 