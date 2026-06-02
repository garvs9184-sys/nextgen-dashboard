'use client';

import { motion } from 'framer-motion';

// 1. Pure Page Layout ke staggered effect ke liye container
export function MotionContainer({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.15 } // Ek ke baad ek cards smooth open honge
        }
      }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}
    >
      {children}
    </motion.div>
  );
}

// 2. Individual Tiles (Hero, Activity, and Course Cards) ke liye hover aur entry animation
export function MotionItem({ children, isCourse }: { children: React.ReactNode, isCourse?: boolean }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
      }}
      whileHover={{ 
        scale: 1.02, // 2% scale up on hover (Strict Assignment Requirement)
        boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.15)", // Premium glowing effect
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }} // Spring physics
      style={{
        gridColumn: isCourse ? 'auto' : 'span 2',
      }}
    >
      {children}
    </motion.div>
  );
}