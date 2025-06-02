
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const FloatingCard = ({ children, className = '', delay = 0 }: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      whileHover={{
        y: -10,
        rotateX: 5,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className={`glass-card transform-gpu perspective-1000 ${className}`}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingCard;
