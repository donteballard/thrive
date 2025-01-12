'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Share2, Globe, Users, Lock, Link, Twitter, Send, MessageCircle } from 'lucide-react';
import { Goal, GoalShareData, GoalVisibility } from '@/types/goals';

interface ShareGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (data: GoalShareData) => void;
  goal: Pick<Goal, 'title' | 'description' | 'progress' | 'category'>;
}

export function ShareGoalModal({
  isOpen,
  onClose,
  onShare,
  goal
}: ShareGoalModalProps) {
  const [visibility, setVisibility] = useState<GoalVisibility>('private');
  const [message, setMessage] = useState('');
  const [allowComments, setAllowComments] = useState(true);
  const [allowDuplication, setAllowDuplication] = useState(true);
  const [privacy, setPrivacy] = useState<'public' | 'private'>('private');
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onShare({
      visibility,
      message,
      allowComments,
      allowDuplication,
    });
  };

  const handleCopyLink = () => {
    setShareLink(window.location.href);
    setCopied(true);
  };

  const handleSocialShare = (platform: string) => {
    // Implement social share functionality
  };

  const handleSave = () => {
    // Implement save functionality
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md p-6 bg-black rounded-xl shadow-xl border border-green-800"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-primary/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">Share Goal</h2>
        <p className="text-gray-400 mb-6">{goal.title}</p>

        {/* Share Options */}
        <div className="space-y-4">
          {/* Copy Link */}
          <div className="p-4 rounded-lg bg-primary/20 border border-green-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white">Share Link</h3>
              <button
                onClick={handleCopyLink}
                className="text-sm text-gray-400 hover:text-primary transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-black border border-green-800">
              <Link className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-400 truncate">{shareLink}</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="p-4 rounded-lg bg-primary/20 border border-green-800">
            <h3 className="font-medium text-white mb-4">Share on Social Media</h3>
            <div className="flex gap-4">
              <button
                onClick={() => handleSocialShare('twitter')}
                className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialShare('telegram')}
                className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/20 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialShare('discord')}
                className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="p-4 rounded-lg bg-primary/20 border border-green-800">
            <h3 className="font-medium text-white mb-4">Privacy Settings</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={privacy === 'public'}
                  onChange={(e) => setPrivacy(e.target.value as 'public' | 'private')}
                  className="w-4 h-4 text-primary border-green-800 focus:ring-primary bg-black"
                />
                <span className="text-gray-300">Public - Anyone with the link can view</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={privacy === 'private'}
                  onChange={(e) => setPrivacy(e.target.value as 'public' | 'private')}
                  className="w-4 h-4 text-primary border-green-800 focus:ring-primary bg-black"
                />
                <span className="text-gray-300">Private - Only you can view</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:bg-primary/20 rounded-lg transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-black rounded-lg font-semibold transition-colors"
          >
            Save Settings
          </button>
        </div>
      </motion.div>
    </div>
  );
} 