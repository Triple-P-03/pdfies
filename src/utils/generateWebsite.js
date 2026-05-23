/**
 * Generates a high-quality, self-contained HTML website from PDF page images.
 * Pages fit the viewport width perfectly and scroll vertically.
 */
export function generateWebsiteHTML(title, pages) {
  let pageContainers = ''

  pages.forEach(({ pageNum, image }, index) => {
    pageContainers += `
      <section class="page" id="page-${pageNum}">
        <img src="images/page-${pageNum}.${index === 0 ? 'png' : 'jpg'}" alt="Page ${pageNum}" loading="${pageNum <= 2 ? 'eager' : 'lazy'}">
      </section>`
  })

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html {
            scroll-behavior: smooth;
            -webkit-text-size-adjust: 100%;
        }

        body {
            background-color: #1a1a2e;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .main-content {
            width: 100%;
            max-width: 100vw;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .page {
            width: 100%;
            display: flex;
            justify-content: center;
            background: #fff;
        }

        .page img {
            width: 100%;
            height: auto;
            display: block;
            /* Ensure crisp rendering */
            image-rendering: -webkit-optimize-contrast;
        }

        /* Watermark */
        .watermark {
            position: fixed;
            bottom: 16px;
            right: 16px;
            z-index: 1000;
            opacity: 0.75;
            transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .watermark:hover {
            opacity: 1;
            transform: translateY(-2px);
        }
        .watermark a {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 6px 14px;
            background: rgba(255,255,255,0.92);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border-radius: 999px;
            border: 1px solid rgba(0,0,0,0.06);
            box-shadow: 0 2px 8px rgba(0,0,0,0.12);
            color: #6366f1;
            text-decoration: none;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.01em;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a2e; }
        ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.6); }
    </style>
</head>
<body>
    <div class="main-content">
        ${pageContainers}
    </div>

    <div class="watermark">
        <a href="https://pdfies.vercel.app/" target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            Made with PDFies
        </a>
    </div>
</body>
</html>`
}
