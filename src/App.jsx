import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Dropzone from './components/Dropzone'
import ProcessingStatus from './components/ProcessingStatus'
import SuccessView from './components/SuccessView'
import AnimatedBackground from './components/AnimatedBackground'
import { processPDF } from './utils/pdfProcessor'

function App() {
  const [state, setState] = useState('idle') // idle | processing | success
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
  const [fileName, setFileName] = useState('')

  const handleFile = async (file) => {
    if (file.type !== 'application/pdf') {
      alert('Please upload a valid PDF file.')
      return
    }

    setFileName(file.name)
    setState('processing')
    setProgress(0)
    setStatusMessage('Reading PDF...')

    try {
      await processPDF(file, (progressVal, message) => {
        setProgress(progressVal)
        setStatusMessage(message)
      })

      setState('success')
    } catch (error) {
      console.error(error)
      alert('Error processing PDF. Please try again.')
      setState('idle')
    }
  }

  const handleReset = () => {
    setState('idle')
    setProgress(0)
    setStatusMessage('')
    setFileName('')
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <AnimatedBackground />

      {/* Main Card */}
      <div className="glass-card rounded-3xl w-full max-w-xl p-10 relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold gradient-text tracking-tight mb-3">
            PDFies
          </h1>
          <p className="text-slate-400 text-lg font-light">
            Transform your PDFs into stunning websites — instantly.
          </p>
        </div>

        {/* Content area with smooth transitions */}
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <Dropzone key="dropzone" onFile={handleFile} />
          )}
          {state === 'processing' && (
            <ProcessingStatus
              key="processing"
              progress={progress}
              message={statusMessage}
            />
          )}
          {state === 'success' && (
            <SuccessView
              key="success"
              fileName={fileName}
              onReset={handleReset}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <p className="mt-10 text-slate-500 text-sm z-10 relative">
        100% client-side · No uploads · Your files stay private
      </p>
    </div>
  )
}

export default App
