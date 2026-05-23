import React, { useState, useRef } from 'react';

export default function App() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave" || e.type === "drop") {
      setIsDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setUploadProgress(60);
      
      // Simulate rendering progress bar completion
      setTimeout(() => {
        setUploadProgress(100);
      }, 500);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleDrop = (e) => {
    handleDrag(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <>
      {/* Atmospheric Background */}
      <div className="ambient-bg">
        <div className="ambient-glow"></div>
      </div>

      {/* Top Navigation Bar */}
      <header className="docked full-width top-0 sticky z-50 glass-header border-b border-outline-variant">
        <nav className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-20">
          <div className="text-title-lg font-headline-lg text-primary-container flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              description
            </span>
            PDFies
          </div>
          <div className="flex items-center gap-8">
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-all duration-300" href="#how-it-works">How it Works</a>
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-all duration-300" href="https://github.com/Triple-P-03/" target="_blank" rel="noreferrer">Support</a>
          </div>
          <div className="flex items-center gap-4"></div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-stack-lg pb-stack-lg px-gutter max-w-container-max mx-auto text-center">
          <div className="max-w-4xl mx-auto mb-stack-lg animate-entrance delay-100">
            <h1 className="font-display-lg text-display-lg mb-4 text-on-surface tracking-tight">
              Transform your PDFs into <span className="text-primary-container electric-glow">stunning websites</span> — instantly.
            </h1>
            <p className="text-xl text-on-surface-variant font-medium">
              Professional, responsive, and 100% free. No technical skills required.
            </p>
          </div>

          {/* Upload Area */}
          <div className="max-w-2xl mx-auto mb-12 animate-entrance delay-200">
            <div 
              onClick={() => fileInputRef.current.click()}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative group cursor-pointer border-2 border-dashed p-stack-lg rounded-xl transition-all duration-300 ${
                isDragActive 
                  ? 'border-primary-container bg-surface-container-high scale-[1.01] shadow-2xl shadow-primary-container/20' 
                  : 'border-primary-container/30 bg-surface-container-low hover:border-primary-container hover:bg-surface-container-high hover:shadow-2xl hover:shadow-primary-container/10'
              }`}
            >
              <input 
                ref={fileInputRef}
                accept=".pdf" 
                className="hidden" 
                type="file"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary-container group-hover:text-on-primary-container shadow-inner animate-pulse-soft">
                  <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    upload_file
                  </span>
                </div>
                
                <div className="space-y-1 w-full text-center">
                  {!uploadedFile ? (
                    <>
                      <p className="font-title-lg text-title-lg text-on-surface group-hover:text-primary-container transition-colors duration-300">
                        Drag & Drop your PDF or click to browse
                      </p>
                      <p className="text-label-md text-on-surface-variant">Support for documents up to 50MB</p>
                    </>
                  ) : (
                    <>
                      <p className="font-title-lg text-title-lg text-primary-container">
                        Processing {uploadedFile.name}...
                      </p>
                      <div className="w-full bg-surface-container-highest rounded-full h-1.5 mt-4 overflow-hidden border border-outline-variant">
                        <div 
                          className="bg-primary-container h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(46,91,255,0.6)]" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="mt-6 flex justify-center animate-entrance delay-300">
              <div className="inline-flex items-center gap-4 px-4 py-2 bg-surface-container rounded-full text-label-md font-label-md text-on-surface-variant border border-outline-variant">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">shield</span>
                  100% client-side
                </span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">cloud_off</span>
                  No uploads
                </span>
                <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">lock</span>
                  Your files stay private
                </span>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-full h-full opacity-40 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container blur-[100px] rounded-full opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-container blur-[100px] rounded-full opacity-20"></div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-stack-lg bg-surface px-gutter border-t border-outline-variant" id="how-it-works">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-stack-lg">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Simple 2-step process</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Your professional web page is just moments away</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="group p-8 rounded-xl bg-surface-container-low border border-outline-variant hover:border-primary-container/50 hover:shadow-2xl hover:shadow-primary-container/20 hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container flex items-center justify-center rounded-lg font-headline-sm mb-6 shadow-lg shadow-primary-container/20 group-hover:scale-110 transition-transform duration-300">1</div>
                <h3 className="font-title-lg text-title-lg mb-3 text-on-surface group-hover:text-primary-container transition-colors duration-300">Upload PDF</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Select any PDF document from your device. Our engine processes everything locally in your browser for maximum security.
                </p>
                <div className="mt-6 aspect-video bg-surface-container-highest rounded-lg flex items-center justify-center overflow-hidden border border-outline-variant/30">
                  <img alt="Workstation workflow" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQnnuT5cidig13RTE1pJffsvYox_c8oVTEkUY4_bRFg6X006s6913zA1oK31PV0je5HioWzcHxvzZtMXmougsMBFj67yc1yhnAre6OP49oEfO_l3mbglCr9sU4xENMZcQwddxcK4fmuDotP2zgjVZZp2qb00KDSHVv5xWadGdJEabpCyMKcGSetXwYJlCfT85tZO0vtukqrk76QJZc4R-1PZ9pGZE4uC8kxHJiIxF0UWOQ_IPpCGOaBTpfyCPA8Q5yb1luveX0D4w"/>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group p-8 rounded-xl bg-surface-container-low border border-outline-variant hover:border-primary-container/50 hover:shadow-2xl hover:shadow-primary-container/20 hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-container text-on-primary-container flex items-center justify-center rounded-lg font-headline-sm mb-6 shadow-lg shadow-primary-container/20 group-hover:scale-110 transition-transform duration-300">2</div>
                <h3 className="font-title-lg text-title-lg mb-3 text-on-surface group-hover:text-primary-container transition-colors duration-300">Host Anywhere</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Download your clean, responsive HTML code and host it with any provider of your choice—Netlify, Vercel, GitHub Pages, or your own server.
                </p>
                <div className="mt-6 aspect-video bg-surface-container-highest rounded-lg flex items-center justify-center overflow-hidden border border-outline-variant/30">
                  <img alt="Website launch simulation" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNyl_Encb8pdke7A_NqdPzR_8zM4zrmjE83JwKZxp8qTr4US-AL5pTs3j1PJdUt2Ts_n-Oo_rttJen_8NisAClU-aTmIcffOh4f-DITj-GfWFtapUVtLpGdjEE_2MIjz33nd2KdU41lALgrU-o_QpwHcbFQG2us6LjJ3yPbDkhQPgVHgvwe-wM0PgyjvpCcIWKS-_KVXDgXxZXOSG181jawlui1G-iilZWuHVe6HboYPnXn2te8Qy1bj6cIkfqzrWX6CKayVFcUIk"/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="full-width bg-surface-container-lowest border-t border-outline-variant relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-gutter py-stack-lg max-w-container-max mx-auto relative z-10">
          <div className="flex flex-col gap-4 mb-8 md:mb-0">
            <div className="text-title-lg font-headline-lg text-primary-container flex items-center gap-2">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              PDFies
            </div>
            <p className="text-label-md font-label-md text-on-surface-variant max-w-xs">
              Converting static documents into dynamic web experiences, securely and instantly.
            </p>
            <a className="group flex items-center gap-2 text-label-md font-label-md text-primary-container hover:text-primary transition-all duration-300" href="https://github.com/Triple-P-03/" target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-[18px]">favorite</span>
              Made by Prathmesh Pakhale
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-all duration-300" href="#">Privacy</a>
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-all duration-300" href="#">Terms</a>
            <a className="text-label-md font-label-md text-on-surface-variant hover:text-primary-container transition-all duration-300" href="https://github.com/Triple-P-03/" target="_blank" rel="noreferrer">GitHub</a>
            <p className="text-label-md font-label-md text-outline">
              © 2024 PDFies
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}