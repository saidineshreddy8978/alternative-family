import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, BookOpen, MessageCircle, User, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  user?: any;
  onLogout?: () => void;
}

const Navigation = ({ user, onLogout }: NavigationProps) => {
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
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="glass-card border-white/20 text-white"
            size="icon"
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </motion.div>
      </div>

      {/* User Info & Logout */}
      {user && (
        <div className="fixed top-4 left-4 z-50 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card border-white/20 rounded-2xl p-3 flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="text-white">
              <div className="text-sm font-medium">{user.name}</div>
            </div>
            {onLogout && (
              <Button
                onClick={onLogout}
                size="sm"
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                Logout
              </Button>
            )}
          </motion.div>
        </div>
      )}

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      >
        <div className="glass-card border-white/20 rounded-2xl p-4">
          <div className="space-y-4">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.div>
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
            {user && (
              <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-white">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-300">{user.email}</div>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
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
                  </motion.div>
                );
              })}
              
              {user && onLogout && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                >
                  <Button
                    onClick={onLogout}
                    className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white"
                  >
                    Logout
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;
