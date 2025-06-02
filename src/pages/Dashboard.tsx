
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Heart, Target, Droplets, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AnimatedBackground from '@/components/AnimatedBackground';

interface DiaryEntry {
  id: string;
  content: string;
  mood: string;
  date: string;
}

interface HabitTracker {
  water: number;
  meals: number;
  exercise: boolean;
  date: string;
}

const Dashboard = () => {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [habits, setHabits] = useState<HabitTracker>({
    water: 0,
    meals: 0,
    exercise: false,
    date: new Date().toDateString()
  });

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'text-yellow-400' },
    { emoji: '😔', label: 'Sad', color: 'text-blue-400' },
    { emoji: '😤', label: 'Angry', color: 'text-red-400' },
    { emoji: '😌', label: 'Calm', color: 'text-green-400' },
    { emoji: '😰', label: 'Anxious', color: 'text-purple-400' },
  ];

  const motivationalQuotes = [
    "You are stronger than you think! 💪",
    "Every small step counts towards your goals 🌟",
    "You are loved and valued 💖",
    "Today is a new opportunity to shine ✨",
    "Your feelings are valid and you matter 🤗"
  ];

  const saveDiaryEntry = () => {
    if (newEntry.trim() && selectedMood) {
      const entry: DiaryEntry = {
        id: Date.now().toString(),
        content: newEntry,
        mood: selectedMood,
        date: new Date().toLocaleDateString()
      };
      setDiaryEntries([entry, ...diaryEntries]);
      setNewEntry('');
      setSelectedMood('');
      
      // Here you would save to MongoDB
      console.log('Saving to MongoDB:', entry);
    }
  };

  const updateHabit = (habit: keyof HabitTracker, value: number | boolean) => {
    setHabits(prev => ({ ...prev, [habit]: value }));
    // Here you would save to MongoDB
    console.log('Updating habit in MongoDB:', { habit, value });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <div className="relative z-10 p-6 max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-white mb-8 text-center glow-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Your Personal Dashboard
        </motion.h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Diary Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="text-purple-400" />
                  Personal Diary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="diary-entry" className="text-gray-300">
                    How are you feeling today?
                  </Label>
                  <textarea
                    id="diary-entry"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="Write about your day, thoughts, or feelings..."
                    className="w-full mt-2 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    rows={4}
                  />
                </div>

                <div>
                  <Label className="text-gray-300 mb-2 block">How are you feeling?</Label>
                  <div className="flex gap-2 flex-wrap">
                    {moods.map((mood) => (
                      <Button
                        key={mood.label}
                        variant={selectedMood === mood.label ? "default" : "outline"}
                        onClick={() => setSelectedMood(mood.label)}
                        className={`glass-card border-white/20 ${
                          selectedMood === mood.label ? 'bg-purple-500' : ''
                        }`}
                      >
                        <span className="mr-1">{mood.emoji}</span>
                        {mood.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={saveDiaryEntry}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={!newEntry.trim() || !selectedMood}
                >
                  Save Entry
                </Button>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {diaryEntries.map((entry) => (
                    <div key={entry.id} className="glass-card p-3 border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-300 text-sm">{entry.date}</span>
                        <span className="text-sm">{moods.find(m => m.label === entry.mood)?.emoji}</span>
                      </div>
                      <p className="text-gray-300 text-sm">{entry.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Habits & Motivation */}
          <div className="space-y-6">
            {/* Daily Habits */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="text-green-400" />
                    Daily Habits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-blue-300">
                      <Droplets size={20} />
                      <span>Water (glasses)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateHabit('water', Math.max(0, habits.water - 1))}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="text-white w-8 text-center">{habits.water}</span>
                      <Button
                        size="sm"
                        onClick={() => updateHabit('water', habits.water + 1)}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-orange-300">
                      <Utensils size={20} />
                      <span>Meals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => updateHabit('meals', Math.max(0, habits.meals - 1))}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <span className="text-white w-8 text-center">{habits.meals}</span>
                      <Button
                        size="sm"
                        onClick={() => updateHabit('meals', habits.meals + 1)}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-300">
                      <Heart size={20} />
                      <span>Exercise</span>
                    </div>
                    <Button
                      onClick={() => updateHabit('exercise', !habits.exercise)}
                      className={habits.exercise ? 'bg-green-500' : 'bg-gray-500'}
                    >
                      {habits.exercise ? '✓ Done' : 'Mark Done'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Heart className="text-pink-400" />
                    Daily Motivation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-center italic">
                    {motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
