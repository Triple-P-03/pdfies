import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import JSZip from 'jszip'
import { generateWebsiteHTML } from './generateWebsite'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

/**
 * Convert a base64 data URL to a Uint8Array blob for zipping.
 */
function dataURLtoBlob(dataUrl) {
  const parts = dataUrl.split(',')
  const byteString = atob(parts[1])
  const bytes = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    bytes[i] = byteString.charCodeAt(i)
  }
  return bytes
}

/**
 * Process a PDF file: render each page to a high-quality canvas image,
 * then generate a ZIP folder containing index.html + images/.
 * The ZIP folder is named after the PDF file.
 */
export async function processPDF(file, onProgress) {
  onProgress(5, 'Reading PDF...')
  const arrayBuffer = await file.arrayBuffer()

  onProgress(10, 'Initializing PDF engine...')
  const pdf = await pdfjsLib.getDocument({
    data: arrayBuffer,
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/cmaps/',
    cMapPacked: true,
  }).promise

  const totalPages = pdf.numPages
  const pages = []

  for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
    onProgress(
      10 + ((pageNum / totalPages) * 70),
      `Rendering page ${pageNum} of ${totalPages}...`
    )

    const page = await pdf.getPage(pageNum)

    // Use higher scale for crisp rendering
    const scale = 3.0
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = viewport.width
    canvas.height = viewport.height

    // Enable high-quality image rendering
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    await page.render({
      canvasContext: ctx,
      viewport: viewport,
    }).promise

    // Use PNG for the first page (homepage quality), JPEG for the rest
    let dataUrl
    let ext
    if (pageNum === 1) {
      dataUrl = canvas.toDataURL('image/png')
      ext = 'png'
    } else {
      dataUrl = canvas.toDataURL('image/jpeg', 0.92)
      ext = 'jpg'
    }

    pages.push({
      pageNum,
      image: dataUrl,
      ext,
      width: viewport.width,
      height: viewport.height,
    })
  }

  onProgress(85, 'Generating website...')

  const title = file.name.replace(/\.pdf$/i, '')
  const htmlContent = generateWebsiteHTML(title, pages)

  onProgress(90, 'Packaging ZIP folder...')

  // Build ZIP: <pdfname>/index.html + <pdfname>/images/page-N.ext
  const zip = new JSZip()
  const folder = zip.folder(title)

  folder.file('index.html', htmlContent)

  const imagesFolder = folder.folder('images')
  for (const page of pages) {
    const imageData = dataURLtoBlob(page.image)
    imagesFolder.file(`page-${page.pageNum}.${page.ext}`, imageData)
  }

  onProgress(95, 'Preparing download...')

  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${title}.zip`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)

  onProgress(100, 'Done!')
}
