'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Menu, X } from 'lucide-react';
import { useState, Suspense, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { WelcomeModal } from '@/components/modals/WelcomeModal';
import { RoadmapSection } from '@/components/landing/RoadmapSection';
import { ClientWalletButton } from '@/components/wallet/ClientWalletButton';
import { Logo } from '@/components/Logo';
import { TreeOfLife } from '@/components/landing/TreeOfLife';
import { FallingLeaves } from '@/components/animations/FallingLeaves';

const socialLinks = [
  {
    name: 'DexScreener',
    href: 'https://dexscreener.com/solana/placeholder',
    disabled: false,
    icon: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%" 
        fill="currentColor" 
        fillRule="evenodd" 
        viewBox="0 0 252 300" 
        focusable="false" 
        className="w-5 h-5"
      >
        <path d="M151.818 106.866c9.177-4.576 20.854-11.312 32.545-20.541 2.465 5.119 2.735 9.586 1.465 13.193-.9 2.542-2.596 4.753-4.826 6.512-2.415 1.901-5.431 3.285-8.765 4.033-6.326 1.425-13.712.593-20.419-3.197m1.591 46.886l12.148 7.017c-24.804 13.902-31.547 39.716-39.557 64.859-8.009-25.143-14.753-50.957-39.556-64.859l12.148-7.017a5.95 5.95 0 003.84-5.845c-1.113-23.547 5.245-33.96 13.821-40.498 3.076-2.342 6.434-3.518 9.747-3.518s6.671 1.176 9.748 3.518c8.576 6.538 14.934 16.951 13.821 40.498a5.95 5.95 0 003.84 5.845zM126 0c14.042.377 28.119 3.103 40.336 8.406 8.46 3.677 16.354 8.534 23.502 14.342 3.228 2.622 5.886 5.155 8.814 8.071 7.897.273 19.438-8.5 24.796-16.709-9.221 30.23-51.299 65.929-80.43 79.589-.012-.005-.02-.012-.029-.018-5.228-3.992-11.108-5.988-16.989-5.988s-11.76 1.996-16.988 5.988c-.009.005-.017.014-.029.018-29.132-13.66-71.209-49.359-80.43-79.589 5.357 8.209 16.898 16.982 24.795 16.709 2.929-2.915 5.587-5.449 8.814-8.071C69.31 16.94 77.204 12.083 85.664 8.406 97.882 3.103 111.959.377 126 0m-25.818 106.866c-9.176-4.576-20.854-11.312-32.544-20.541-2.465 5.119-2.735 9.586-1.466 13.193.901 2.542 2.597 4.753 4.826 6.512 2.416 1.901 5.432 3.285 8.766 4.033 6.326 1.425 13.711.593 20.418-3.197" />
        <path d="M197.167 75.016c6.436-6.495 12.107-13.684 16.667-20.099l2.316 4.359c7.456 14.917 11.33 29.774 11.33 46.494l-.016 26.532.14 13.754c.54 33.766 7.846 67.929 24.396 99.193l-34.627-27.922-24.501 39.759-25.74-24.231L126 299.604l-41.132-66.748-25.739 24.231-24.501-39.759L0 245.25c16.55-31.264 23.856-65.427 24.397-99.193l.14-13.754-.016-26.532c0-16.721 3.873-31.578 11.331-46.494l2.315-4.359c4.56 6.415 10.23 13.603 16.667 20.099l-2.01 4.175c-3.905 8.109-5.198 17.176-2.156 25.799 1.961 5.554 5.54 10.317 10.154 13.953 4.48 3.531 9.782 5.911 15.333 7.161 3.616.814 7.3 1.149 10.96 1.035-.854 4.841-1.227 9.862-1.251 14.978L53.2 160.984l25.206 14.129a41.926 41.926 0 015.734 3.869c20.781 18.658 33.275 73.855 41.861 100.816 8.587-26.961 21.08-82.158 41.862-100.816a41.865 41.865 0 015.734-3.869l25.206-14.129-32.665-18.866c-.024-5.116-.397-10.137-1.251-14.978 3.66.114 7.344-.221 10.96-1.035 5.551-1.25 10.854-3.63 15.333-7.161 4.613-3.636 8.193-8.399 10.153-13.953 3.043-8.623 1.749-17.689-2.155-25.799l-2.01-4.175z" />
      </svg>
    )
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/thraivedotapp',
    disabled: false,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'Telegram',
    href: 'https://t.me/thraivedotapp',
    disabled: false,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    )
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/thraive',
    disabled: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 00-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 00-5.487 0 12.36 12.36 0 00-.617-1.23A.077.077 0 008.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 00-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 00.031.055 20.03 20.03 0 005.993 2.98.078.078 0 00.084-.026 13.83 13.83 0 001.226-1.963.074.074 0 00-.041-.104 13.175 13.175 0 01-1.872-.878.075.075 0 01-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 01.078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 01.079.009c.12.098.245.195.372.288a.075.075 0 01-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 00-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 00.084.028 19.963 19.963 0 006.002-2.981.076.076 0 00.032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 00-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
      </svg>
    )
  },
  {
    name: 'GitHub',
    href: 'https://github.com/thraivedotapp',
    disabled: true,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )
  }
];

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRoadmap = () => {
    const roadmapSection = document.getElementById('roadmap');
    if (roadmapSection) {
      roadmapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className={`absolute inset-0 transition-all duration-300 ${
          hasScrolled ? 'bg-black/70 backdrop-blur-xl' : 'bg-transparent'
        }`}></div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-7xl mx-auto px-4"
        >
          <div className="flex items-center justify-between h-20">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold"
            >
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.disabled ? undefined : link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-1.5 text-white transition-colors ${
                      link.disabled 
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:text-primary'
                    }`}
                    whileHover={link.disabled ? {} : { scale: 1.1 }}
                    whileTap={link.disabled ? {} : { scale: 0.95 }}
                    aria-label={link.name}
                    onClick={link.disabled ? (e) => e.preventDefault() : undefined}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
              <Suspense fallback={<div className="h-[36px] w-[120px] bg-gray-700 rounded-md animate-pulse" />}>
                <ClientWalletButton />
              </Suspense>
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden flex items-center gap-3">
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.disabled ? undefined : link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-1.5 text-white transition-colors ${
                      link.disabled 
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:text-primary'
                    }`}
                    whileHover={link.disabled ? {} : { scale: 1.1 }}
                    whileTap={link.disabled ? {} : { scale: 0.95 }}
                    aria-label={link.name}
                    onClick={link.disabled ? (e) => e.preventDefault() : undefined}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
              <Suspense fallback={<div className="h-[36px] w-[120px] bg-gray-700 rounded-md animate-pulse" />}>
                <ClientWalletButton />
              </Suspense>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-1 rounded-full transition-colors ${
                hasScrolled ? 'hover:bg-gray-800/50' : 'hover:bg-black/30'
              }`}>
                <motion.div
                  animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5 text-gray-300" />
                  ) : (
                    <Menu className="w-5 h-5 text-gray-300" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* Tree of Life Hero Section */}
      <TreeOfLife />

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20 px-4 bg-black relative overflow-hidden">
        <FallingLeaves section="roadmap" />
        <RoadmapSection />
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Branding & Description */}
            <div className="md:col-span-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Logo className="mb-4" />
                <p className="text-white/90 mb-6 max-w-md">
                  Transform your life with AI-powered guidance and blockchain rewards. Join our community of achievers today.
                </p>
              </motion.div>
            </div>

            {/* Empty Space */}
            <div className="hidden md:block md:col-span-3" />

            {/* Social Links */}
            <div className="md:col-span-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-start md:items-end"
              >
                <h4 className="text-sm font-bold text-white mb-4 uppercase">
                  Connect With Us
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.name}
                      href={link.disabled ? undefined : link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-full bg-black text-white transition-colors ${
                        link.disabled 
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:text-primary'
                      }`}
                      whileHover={link.disabled ? {} : { scale: 1.1 }}
                      whileTap={link.disabled ? {} : { scale: 0.95 }}
                      aria-label={link.name}
                      onClick={link.disabled ? (e) => e.preventDefault() : undefined}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
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
            className="mt-12 pt-8 border-t border-primary/20"
          >
            <p className="text-center text-sm text-white/80">
              © {new Date().getFullYear()} Thraive. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
} 