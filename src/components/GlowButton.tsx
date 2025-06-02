
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const GlowButton = ({ children, onClick, variant = 'primary', className = '' }: GlowButtonProps) => {
  const baseClasses = variant === 'primary' 
    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' 
    : 'glass-card hover:bg-white/10';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      <Button
        onClick={onClick}
        className={`
          ${baseClasses}
          border-none text-white font-semibold py-3 px-8 rounded-xl
          shadow-lg hover:shadow-xl transition-all duration-300
          animate-pulse-glow relative overflow-hidden
        `}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
        <span className="relative z-10">{children}</span>
      </Button>
    </motion.div>
  );
};

export default GlowButton;
