
import { motion } from 'framer-motion';
import { Heart, MessageCircle, BookOpen, User, Calendar, Mic, Sparkles, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import GlowButton from './GlowButton';
import FeatureCard from './FeatureCard';
import TypewriterText from './TypewriterText';
import FloatingCard from './FloatingCard';

const LandingPage = () => {
  const features = [
    {
      icon: <Heart size={48} />,
      title: "AI Family Support",
      description: "Connect with caring AI family members who provide emotional support and motivation whenever you need it."
    },
    {
      icon: <MessageCircle size={48} />,
      title: "Real-time Conversations",
      description: "Chat with your personalized AI mother, father, or siblings. Each has a unique personality to match your needs."
    },
    {
      icon: <BookOpen size={48} />,
      title: "Personal Diary",
      description: "Write and track your thoughts, emotions, and daily experiences in a safe, private space with mood analytics."
    },
    {
      icon: <User size={48} />,
      title: "Mood Tracking",
      description: "Monitor your emotional wellbeing with intelligent mood analysis and personalized insights and recommendations."
    },
    {
      icon: <Calendar size={48} />,
      title: "Daily Check-ins",
      description: "Receive gentle reminders to eat, hydrate, and take care of yourself throughout the day based on your preferences."
    },
    {
      icon: <Mic size={48} />,
      title: "Voice Interactions",
      description: "Speak naturally with your AI family using advanced voice recognition and synthesis for more natural conversations."
    },
    {
      icon: <Sparkles size={48} />,
      title: "Personalized Experience",
      description: "Customize your AI family names, personalities, and interaction styles to create your perfect support system."
    },
    {
      icon: <Shield size={48} />,
      title: "Privacy & Security",
      description: "Your conversations and data are encrypted and secure. Your emotional journey remains private and protected."
    },
    {
      icon: <Zap size={48} />,
      title: "Smart Notifications",
      description: "Intelligent reminders and motivational messages delivered at the perfect time based on your daily routine."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 glow-text"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #06b6d4, #8b5cf6)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <TypewriterText text="Your AI Family" />
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
          >
            Never feel alone again. Connect with caring AI companions who provide 
            emotional support, motivation, daily care reminders, and meaningful conversations 
            tailored just for you.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          >
            <Link to="/dashboard">
              <GlowButton>
                🚀 Start Your Journey
              </GlowButton>
            </Link>
            <Link to="/chat">
              <GlowButton variant="secondary">
                💬 Meet Your AI Family
              </GlowButton>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "10K+", label: "Active Users" },
              { number: "50K+", label: "Conversations" },
              { number: "98%", label: "Satisfaction" }
            ].map((stat, index) => (
              <FloatingCard key={stat.label} delay={3.2 + index * 0.2} className="text-center p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </FloatingCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Everything You Need for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                Emotional Wellness
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform combines cutting-edge technology with human empathy 
              to create meaningful connections and support your mental health journey with 
              personalized care and attention.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              How It Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Create Your Account",
                description: "Sign up and personalize your AI family members with custom names and personalities."
              },
              {
                step: "02", 
                title: "Set Your Preferences",
                description: "Tell us about your goals, interests, and when you'd like to receive daily check-ins."
              },
              {
                step: "03",
                title: "Start Connecting",
                description: "Begin conversations, track your mood, write diary entries, and receive personalized support."
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FloatingCard className="p-8 md:p-12 rounded-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Feel Connected?
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Join thousands of people who have found comfort, motivation, and joy 
                through their AI family companions. Your emotional wellness journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/dashboard">
                  <GlowButton>
                    🌟 Get Started Today
                  </GlowButton>
                </Link>
                <GlowButton variant="secondary">
                  📱 Download Mobile App
                </GlowButton>
              </div>
            </motion.div>
          </FloatingCard>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
