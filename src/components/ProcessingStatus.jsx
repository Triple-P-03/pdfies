import { motion } from 'framer-motion'

export default function ProcessingStatus({ progress, message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center py-10 gap-6"
    >
      {/* Animated spinner */}
      <div className="relative w-16 h-16">
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/5"
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-indigo-500/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        {/* Percentage in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-indigo-400 tabular-nums">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* Status text */}
      <motion.p
        key={message}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-slate-300 text-lg font-medium"
      >
        {message}
      </motion.p>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <p className="text-xs text-slate-600">
        Processing happens entirely in your browser
      </p>
    </motion.div>
  )
}
