
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import FloatingCard from './FloatingCard';

interface UserSetupProps {
  user: any;
  onComplete: (setupData: any) => void;
}

const UserSetup = ({ user, onComplete }: UserSetupProps) => {
  const [step, setStep] = useState(1);
  const [setupData, setSetupData] = useState({
    motherName: '',
    fatherName: '',
    siblingName: '',
    siblingType: 'sister',
    goals: '',
    interests: '',
    preferredTime: 'morning',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/user/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(setupData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        onComplete(updatedUser);
        toast({
          title: "Welcome to your AI Family!",
          description: "Your profile has been set up successfully.",
        });
      }
    } catch (error) {
      console.error('Setup error:', error);
      toast({
        title: "Error",
        description: "Failed to save setup. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="w-16 h-16 mx-auto mb-4 text-pink-400" />
              <h2 className="text-2xl font-bold text-white mb-2">Meet Your AI Family</h2>
              <p className="text-gray-300">Choose names for your virtual family members</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Mother's Name</label>
                <Input
                  value={setupData.motherName}
                  onChange={(e) => setSetupData({ ...setupData, motherName: e.target.value })}
                  placeholder="e.g., Mom, Sarah, Maria..."
                  className="glass-card border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Father's Name</label>
                <Input
                  value={setupData.fatherName}
                  onChange={(e) => setSetupData({ ...setupData, fatherName: e.target.value })}
                  placeholder="e.g., Dad, John, Michael..."
                  className="glass-card border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Sibling Name</label>
                <Input
                  value={setupData.siblingName}
                  onChange={(e) => setSetupData({ ...setupData, siblingName: e.target.value })}
                  placeholder="e.g., Alex, Emma, Chris..."
                  className="glass-card border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Sibling Type</label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={setupData.siblingType === 'sister' ? 'default' : 'outline'}
                    onClick={() => setSetupData({ ...setupData, siblingType: 'sister' })}
                    className="flex-1"
                  >
                    Sister
                  </Button>
                  <Button
                    type="button"
                    variant={setupData.siblingType === 'brother' ? 'default' : 'outline'}
                    onClick={() => setSetupData({ ...setupData, siblingType: 'brother' })}
                    className="flex-1"
                  >
                    Brother
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h2 className="text-2xl font-bold text-white mb-2">Tell Us About You</h2>
              <p className="text-gray-300">Help us personalize your experience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Your Goals & Dreams</label>
                <Textarea
                  value={setupData.goals}
                  onChange={(e) => setSetupData({ ...setupData, goals: e.target.value })}
                  placeholder="What do you want to achieve? What motivates you?"
                  className="glass-card border-white/20 text-white placeholder:text-gray-400 h-24"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Interests & Hobbies</label>
                <Textarea
                  value={setupData.interests}
                  onChange={(e) => setSetupData({ ...setupData, interests: e.target.value })}
                  placeholder="What do you enjoy doing? Your passions and interests..."
                  className="glass-card border-white/20 text-white placeholder:text-gray-400 h-24"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-bold text-white mb-2">Daily Preferences</h2>
              <p className="text-gray-300">When would you like to receive check-ins?</p>
            </div>
            
            <div>
              <label className="block text-white mb-2">Preferred Check-in Time</label>
              <div className="grid grid-cols-3 gap-4">
                {['morning', 'afternoon', 'evening'].map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={setupData.preferredTime === time ? 'default' : 'outline'}
                    onClick={() => setSetupData({ ...setupData, preferredTime: time })}
                    className="capitalize"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 mt-6">
              <h3 className="text-white font-semibold mb-2">Your AI Family Summary:</h3>
              <div className="text-gray-300 space-y-1">
                <p>👩 Mother: {setupData.motherName || 'Not set'}</p>
                <p>👨 Father: {setupData.fatherName || 'Not set'}</p>
                <p>👫 {setupData.siblingType}: {setupData.siblingName || 'Not set'}</p>
                <p>⏰ Check-ins: {setupData.preferredTime}</p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 cosmic-bg" />
      
      <FloatingCard className="w-full max-w-lg z-10">
        <Card className="bg-transparent border-none shadow-none">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                {[1, 2, 3].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      step >= stepNum ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-300 text-sm">Step {step} of 3</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
            
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Previous
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                className="ml-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                {step === 3 ? 'Complete Setup' : 'Next'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </FloatingCard>
    </div>
  );
};

export default UserSetup;
