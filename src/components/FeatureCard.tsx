
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="glass-card border-white/20 h-full group hover:border-purple-400/50 transition-all duration-300">
        <CardContent className="p-6 text-center">
          <motion.div
            className="mb-4 flex justify-center text-purple-400"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {icon}
          </motion.div>
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
            {title}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeatureCard;
