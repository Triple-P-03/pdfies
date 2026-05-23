import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Primary blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          top: '-15%',
          left: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, 60, 20, 0],
          y: [0, 40, 80, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
          bottom: '-10%',
          right: '-10%',
          filter: 'blur(80px)',
        }}
        animate={{
          x: [0, -40, -80, 0],
          y: [0, -60, -20, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Subtle accent blob */}
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
          top: '40%',
          right: '20%',
          filter: 'blur(70px)',
        }}
        animate={{
          x: [0, -30, 50, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}
