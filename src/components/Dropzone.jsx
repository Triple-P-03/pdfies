import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function Dropzone({ onFile }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files.length) {
        onFile(e.dataTransfer.files[0])
      }
    },
    [onFile]
  )

  const handleClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'application/pdf'
    input.onchange = (e) => {
      if (e.target.files.length) {
        onFile(e.target.files[0])
      }
    }
    input.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className={`
          relative cursor-pointer rounded-2xl border-2 border-dashed p-16
          transition-colors duration-300 group
          ${
            isDragging
              ? 'border-indigo-500 bg-indigo-500/10'
              : 'border-white/10 bg-white/[0.02] hover:border-indigo-500/50 hover:bg-indigo-500/5'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        animate={isDragging ? { scale: 1.02 } : {}}
        style={{ animation: isDragging ? 'none' : 'pulseGlow 4s ease infinite' }}
      >
        {/* Upload icon */}
        <div className="flex flex-col items-center gap-5">
          <motion.div
            className={`
              w-16 h-16 rounded-2xl flex items-center justify-center
              transition-colors duration-300
              ${isDragging ? 'bg-indigo-500/20' : 'bg-white/5 group-hover:bg-indigo-500/10'}
            `}
            animate={isDragging ? { rotate: [0, -5, 5, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-colors duration-300 ${
                isDragging ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'
              }`}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <line x1="9" y1="15" x2="12" y2="12" />
              <line x1="15" y1="15" x2="12" y2="12" />
            </svg>
          </motion.div>

          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-200 mb-1.5">
              {isDragging ? 'Drop your PDF here' : 'Drag & Drop your PDF'}
            </h3>
            <p className="text-sm text-slate-500">
              or click anywhere to browse files
            </p>
          </div>

          {/* File type badges */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-slate-500 font-medium border border-white/5">
              .PDF
            </span>
            <span className="text-[11px] text-slate-600">→</span>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
              .HTML
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
