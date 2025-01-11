'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Target,
  Trophy,
  Activity,
  Gift,
  Settings,
  Heart,
  Users,
  GitBranch,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Logo } from '@/components/Logo';

const navigationItems = [
  {
    name: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Goals',
    href: '/dashboard/goals',
    icon: Target,
  },
  {
    name: 'Achievements',
    href: '/dashboard/achievements',
    icon: Trophy,
  },
  {
    name: 'Activity',
    href: '/dashboard/activity',
    icon: Activity,
  },
  {
    name: 'Rewards',
    href: '/dashboard/rewards',
    icon: Gift,
  },
  {
    name: 'Health',
    href: '/dashboard/health',
    icon: Heart,
  },
  {
    name: 'Community',
    href: '/dashboard/community',
    icon: Users,
  },
  {
    name: 'Roadmap',
    href: '/dashboard/roadmap',
    icon: GitBranch,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-black border border-green-800 shadow-md"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-green-400" />
          ) : (
            <Menu className="w-6 h-6 text-green-400" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-green-800 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center justify-center px-4">
              <div className="scale-125">
                <Logo />
              </div>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary/20 text-green-400'
                        : 'text-white hover:bg-primary/10 hover:text-primary'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 transition-colors ${
                        isActive
                          ? 'text-green-400'
                          : 'text-white group-hover:text-primary'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-green-800 p-4">
            <p className="w-full text-center text-xs text-white">Made With <p className="inline-block text-green-400">❤</p> By the Thraive Team</p>
          </div>
        </div>
      </div>
    </>
  );
} 