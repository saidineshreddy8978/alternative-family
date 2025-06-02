
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, MessageCircle, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: BookOpen },
    { path: '/chat', label: 'AI Family', icon: MessageCircle },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-card border-white/20 text-white"
          size="icon"
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      >
        <div className="glass-card border-white/20 rounded-2xl p-4">
          <div className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          scale: isOpen ? 1 : 0.9,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-40 lg:hidden"
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80">
          <div className="glass-card border-white/20 rounded-2xl p-6">
            <div className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;
