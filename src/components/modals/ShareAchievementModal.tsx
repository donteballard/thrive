'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { Achievement } from '@/types/achievements';
import { useAchievements } from '@/hooks/useAchievements';

interface ShareAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievement: Achievement | null;
}

export function ShareAchievementModal({ isOpen, onClose, achievement }: ShareAchievementModalProps) {
  const [copied, setCopied] = useState(false);
  const { shareAchievement } = useAchievements();

  if (!achievement) return null;

  const shareText = `I just earned the ${achievement.title} achievement on Thraive! 🎉`;
  const shareUrl = `${window.location.origin}/achievements/${achievement.id}`;

  const handleShare = async (platform: string) => {
    await shareAchievement(achievement.id, platform);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Achievement</DialogTitle>
          <DialogDescription>
            Share your achievement with your friends and followers
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col gap-4 items-center text-center">
            <div className={`p-4 rounded-full bg-primary/10`}>
              <achievement.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 p-4 h-auto group hover:bg-accent"
              onClick={() => handleShare('twitter')}
            >
              <Twitter className="w-5 h-5 text-foreground group-hover:text-foreground/90" />
              <span className="text-sm">Twitter</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 p-4 h-auto group hover:bg-accent"
              onClick={() => handleShare('facebook')}
            >
              <Facebook className="w-5 h-5 text-foreground group-hover:text-foreground/90" />
              <span className="text-sm">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center gap-2 p-4 h-auto group hover:bg-accent"
              onClick={() => handleShare('linkedin')}
            >
              <Linkedin className="w-5 h-5 text-foreground group-hover:text-foreground/90" />
              <span className="text-sm">LinkedIn</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="flex-1 group hover:bg-accent"
              onClick={copyToClipboard}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-foreground group-hover:text-foreground/90" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2 text-foreground group-hover:text-foreground/90" />
                  Copy Link
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 