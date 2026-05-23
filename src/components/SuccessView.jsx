import { motion } from 'framer-motion'

export default function SuccessView({ fileName, onReset }) {
  const cleanName = fileName.replace('.pdf', '')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center py-10 gap-6"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 12,
          delay: 0.1,
        }}
        className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.path
            d="M20 6L9 17l-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.svg>
      </motion.div>

      {/* Success text */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-emerald-400 mb-2">
          Website Generated!
        </h3>
        <p className="text-slate-400 text-sm">
          <span className="text-slate-300 font-medium">{cleanName}</span> has been converted successfully.
        </p>
        <p className="text-slate-500 text-sm mt-1">
          Your download should begin automatically.
        </p>
      </div>

      {/* Action button */}
      <motion.button
        onClick={onReset}
        className="mt-2 px-8 py-3.5 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl
                   transition-all duration-200 cursor-pointer
                   shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        Convert Another PDF
      </motion.button>
    </motion.div>
  )
}
