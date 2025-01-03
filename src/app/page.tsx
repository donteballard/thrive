'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Brain, Trophy, LineChart, Coins, Target, Sparkles, Users, TrendingUp, Menu, X, Sun, Moon } from 'lucide-react';
import { ReactNode, useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { WelcomeModal } from '@/components/modals/WelcomeModal';
import { RoadmapSection } from '@/components/landing/RoadmapSection';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ClientWalletButton } from '@/components/wallet/ClientWalletButton';
import { Logo } from '@/components/Logo';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

interface StepCardProps {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

interface StatCardProps {
  number: string;
  label: string;
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const navHeight = 64;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // If no saved preference, check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('features')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavClick('how-it-works')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                How it Works
              </button>
              <button 
                onClick={() => handleNavClick('roadmap')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Roadmap
              </button>
              <button 
                onClick={() => handleNavClick('stats')}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Stats
              </button>
              <ThemeToggle />
              <Suspense fallback={<div className="h-[36px] w-[120px] bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />}>
                <ClientWalletButton />
              </Suspense>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center gap-4">
              <ThemeToggle />
              <Suspense fallback={<div className="h-[36px] w-[120px] bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />}>
                <ClientWalletButton />
              </Suspense>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                {isMenuOpen ? (
                  <X className="w-5 h-5 dark:text-gray-400" />
                ) : (
                  <Menu className="w-5 h-5 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-4 space-y-2"
            >
              <button 
                onClick={() => handleNavClick('features')}
                className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Features
              </button>
              <button 
                onClick={() => handleNavClick('how-it-works')}
                className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                How it Works
              </button>
              <button 
                onClick={() => handleNavClick('roadmap')}
                className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Roadmap
              </button>
              <button 
                onClick={() => handleNavClick('stats')}
                className="block w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Stats
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text"
            >
              Transform Your Life with AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            >
              Get rewarded for becoming your best self through AI-powered guidance and blockchain rewards
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4"
            >
              {!connected && (
                <>
                  <Suspense fallback={<div className="h-[44px] w-[140px] bg-gray-100 dark:bg-gray-700 rounded-md animate-pulse" />}>
                    <ClientWalletButton />
                  </Suspense>
                </>
              )}
              <button 
                onClick={() => handleNavClick('features')}
                className="h-[44px] min-w-[140px] px-6 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-md border-2 border-blue-600 dark:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors font-semibold"
              >
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 dark:text-white"
          >
            Why Choose Thraive?
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FeatureCard
                icon={<Brain className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                title="AI Life Coach"
                description="Get personalized guidance and insights from our advanced AI system"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <FeatureCard
                icon={<Coins className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                title="Earn Rewards"
                description="Complete tasks and challenges to earn THRAIVE tokens"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <FeatureCard
                icon={<LineChart className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                title="Track Progress"
                description="Monitor your growth with detailed analytics and insights"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 dark:text-white"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "1", icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />, title: "Connect Wallet", desc: "Link your Solana wallet" },
              { number: "2", icon: <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />, title: "Set Goals", desc: "Define your objectives" },
              { number: "3", icon: <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />, title: "Complete Tasks", desc: "Follow AI guidance" },
              { number: "4", icon: <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />, title: "Earn & Grow", desc: "Get rewarded" }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <StepCard
                  number={step.number}
                  icon={step.icon}
                  title={step.title}
                  description={step.desc}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <RoadmapSection />

      {/* Stats Section */}
      <section id="stats" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10k+", label: "Active Users" },
              { number: "$2M+", label: "Rewards Distributed" },
              { number: "85%", label: "Goals Achieved" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-gray-700 rounded-xl shadow-sm"
              >
                <div className="text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-blue-600 dark:bg-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Branding & Description */}
            <div className="md:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Logo className="mb-4 text-white [&>span]:text-white dark:[&>span]:text-white" />
                <p className="text-blue-100 dark:text-blue-100 mb-6 max-w-md">
                  Transform your life with AI-powered guidance and blockchain rewards. Join our community of achievers today.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-sm font-semibold text-white mb-4 uppercase">
                  Quick Links
                </h4>
                <ul className="space-y-3">
                  <li>
                    <button onClick={() => handleNavClick('features')} className="text-blue-100 hover:text-white transition-colors">
                      Features
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('how-it-works')} className="text-blue-100 hover:text-white transition-colors">
                      How it Works
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('roadmap')} className="text-blue-100 hover:text-white transition-colors">
                      Roadmap
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNavClick('stats')} className="text-blue-100 hover:text-white transition-colors">
                      Stats
                    </button>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-sm font-semibold text-white mb-4 uppercase">
                  Connect With Us
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://x.com/thraivedotapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-100 hover:text-white transition-colors"
                    aria-label="X (formerly Twitter)"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-100 hover:text-white transition-colors"
                    aria-label="Discord"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026 13.83 13.83 0 001.226-1.963.074.074 0 00-.041-.104 13.175 13.175 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-100 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a
                    href="https://t.me/thraivedotapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-blue-100 hover:text-white transition-colors"
                    aria-label="Telegram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Copyright */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-blue-500 dark:border-blue-800"
          >
            <p className="text-center text-sm text-blue-100">
              © {new Date().getFullYear()} Thraive. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function StepCard({ number, icon, title, description }: StepCardProps) {
  return (
    <div className="relative p-6 rounded-lg bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
      <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="mt-4">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-semibold mb-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}

function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
} 