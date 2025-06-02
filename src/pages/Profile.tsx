
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Settings, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AnimatedBackground from '@/components/AnimatedBackground';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joinDate: '2024-01-15',
    notifications: {
      morning: true,
      afternoon: true,
      evening: true,
      reminders: true
    }
  });

  const updateProfile = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    // Here you would save to MongoDB
    console.log('Updating profile in MongoDB:', { field, value });
  };

  const updateNotifications = (type: string, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [type]: value }
    }));
    // Here you would save to MongoDB
    console.log('Updating notifications in MongoDB:', { type, value });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 p-6 max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8 text-center glow-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Profile
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="text-purple-400" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-gray-300">Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Member Since</Label>
                  <div className="flex items-center gap-2 mt-1 text-gray-400">
                    <Calendar size={16} />
                    <span>{new Date(profile.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="text-blue-400" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Morning Check-ins</Label>
                    <p className="text-sm text-gray-400">Receive morning motivation messages</p>
                  </div>
                  <Switch
                    checked={profile.notifications.morning}
                    onCheckedChange={(checked) => updateNotifications('morning', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Afternoon Reminders</Label>
                    <p className="text-sm text-gray-400">Get reminded to take breaks and eat</p>
                  </div>
                  <Switch
                    checked={profile.notifications.afternoon}
                    onCheckedChange={(checked) => updateNotifications('afternoon', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Evening Reflections</Label>
                    <p className="text-sm text-gray-400">Evening diary writing prompts</p>
                  </div>
                  <Switch
                    checked={profile.notifications.evening}
                    onCheckedChange={(checked) => updateNotifications('evening', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-white">Self-care Reminders</Label>
                    <p className="text-sm text-gray-400">Daily habit and wellness reminders</p>
                  </div>
                  <Switch
                    checked={profile.notifications.reminders}
                    onCheckedChange={(checked) => updateNotifications('reminders', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Statistics */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Settings className="text-green-400" />
                Your Journey So Far
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-2xl font-bold text-purple-400">47</h3>
                  <p className="text-gray-300">Diary Entries</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">156</h3>
                  <p className="text-gray-300">AI Conversations</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-green-400">23</h3>
                  <p className="text-gray-300">Days Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
