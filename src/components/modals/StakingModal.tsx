import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StakingTier, StakeFormData, UnstakeFormData } from '@/types/rewards';
import { Lock, Unlock, ArrowRight } from 'lucide-react';

interface StakingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTier?: StakingTier;
  currentStakedAmount: number;
  tokenBalance: number;
  onStake: (data: StakeFormData) => Promise<void>;
  onUnstake: (data: UnstakeFormData) => Promise<void>;
}

export function StakingModal({
  isOpen,
  onClose,
  selectedTier,
  currentStakedAmount,
  tokenBalance,
  onStake,
  onUnstake
}: StakingModalProps) {
  const [mode, setMode] = useState<'stake' | 'unstake'>('stake');
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (mode === 'stake' && selectedTier) {
        await onStake({
          amount: Number(amount),
          tierId: selectedTier.id,
          lockPeriod: selectedTier.lockPeriod
        });
      } else {
        await onUnstake({
          amount: Number(amount)
        });
      }
      onClose();
      setAmount('');
    } catch (error) {
      console.error('Error in staking modal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const maxAmount = mode === 'stake' ? tokenBalance : currentStakedAmount;
  const isValidAmount = Number(amount) > 0 && Number(amount) <= maxAmount;

  const handleMaxClick = () => {
    setAmount(maxAmount.toString());
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'stake' ? 'Stake THRAIVE Tokens' : 'Unstake THRAIVE Tokens'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'stake'
              ? 'Stake your tokens to earn rewards and unlock benefits'
              : 'Unstake your tokens to access them again'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex justify-center gap-4 mb-4">
            <Button
              variant={mode === 'stake' ? 'default' : 'outline'}
              onClick={() => setMode('stake')}
              className="flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Stake
            </Button>
            <Button
              variant={mode === 'unstake' ? 'default' : 'outline'}
              onClick={() => setMode('unstake')}
              className="flex items-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              Unstake
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Amount
              </label>
              <div className="relative">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                  max={maxAmount}
                  className="pr-20"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleMaxClick}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  Max
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Available: {maxAmount} THRAIVE
              </p>
            </div>

            {mode === 'stake' && selectedTier && (
              <div className="space-y-2">
                <h4 className="font-medium">Selected Tier: {selectedTier.name}</h4>
                <div className="text-sm space-y-1">
                  <p>APY: {selectedTier.apy}%</p>
                  <p>Lock Period: {selectedTier.lockPeriod} days</p>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={!isValidAmount || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                'Processing...'
              ) : (
                <span className="flex items-center gap-2">
                  {mode === 'stake' ? 'Stake Tokens' : 'Unstake Tokens'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
} 