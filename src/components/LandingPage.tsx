
import { motion } from 'framer-motion';
import { Heart, MessageCircle, BookOpen, User, Calendar, Mic } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBackground from './AnimatedBackground';
import GlowButton from './GlowButton';
import FeatureCard from './FeatureCard';

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
      description: "Chat with your AI mother, father, or siblings. Each has a unique personality to match your needs."
    },
    {
      icon: <BookOpen size={48} />,
      title: "Personal Diary",
      description: "Write and track your thoughts, emotions, and daily experiences in a safe, private space."
    },
    {
      icon: <User size={48} />,
      title: "Mood Tracking",
      description: "Monitor your emotional wellbeing with intelligent mood analysis and personalized insights."
    },
    {
      icon: <Calendar size={48} />,
      title: "Daily Check-ins",
      description: "Receive gentle reminders to eat, hydrate, and take care of yourself throughout the day."
    },
    {
      icon: <Mic size={48} />,
      title: "Voice Interactions",
      description: "Speak naturally with your AI family using advanced voice recognition and synthesis."
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
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
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6, #8b5cf6)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Your AI Family
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Never feel alone again. Connect with caring AI companions who provide 
            emotional support, motivation, and daily care reminders.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/dashboard">
              <GlowButton>
                Start Your Journey
              </GlowButton>
            </Link>
            <Link to="/chat">
              <GlowButton variant="secondary">
                Meet Your AI Family
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              Everything You Need for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Emotional Wellness
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with human empathy 
              to create meaningful connections and support your mental health journey.
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

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass-card p-8 md:p-12 rounded-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Feel Connected?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of people who have found comfort, motivation, and joy 
              through their AI family companions.
            </p>
            <Link to="/dashboard">
              <GlowButton>
                Get Started Today
              </GlowButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
