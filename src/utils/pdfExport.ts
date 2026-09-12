import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFExportResult {
  success: boolean;
  blobUrl?: string;
  blob?: Blob;
  fileName?: string;
  error?: string;
}

export interface PDFExportOptions {
  fileName?: string;
  onStart?: () => void;
  onSuccess?: (result: PDFExportResult) => void;
  onError?: (err: any) => void;
}

/**
 * Bulletproof, high-resolution A4 PDF generator.
 * Uses a clean off-screen clone with exact 794px A4 dimensions,
 * eliminating parent transforms, zoom, and container constraints.
 */
export async function exportCVToPDF(
  elementId: string = 'cv-preview-printable',
  options: PDFExportOptions = {}
): Promise<PDFExportResult> {
  const { fileName = 'Professional_CV.pdf', onStart, onSuccess, onError } = options;

  const targetElement = document.getElementById(elementId);
  if (!targetElement) {
    const errorMsg = `CV element with id "${elementId}" not found.`;
    console.error(errorMsg);
    onError?.(new Error(errorMsg));
    return { success: false, error: errorMsg };
  }

  onStart?.();

  // Create an offscreen wrapper to render the CV free of parent transforms
  const offscreenContainer = document.createElement('div');
  offscreenContainer.style.position = 'fixed';
  offscreenContainer.style.left = '-9999px';
  offscreenContainer.style.top = '0';
  offscreenContainer.style.width = '794px'; // 210mm in standard 96dpi web pixels
  offscreenContainer.style.background = '#ffffff';
  offscreenContainer.style.zIndex = '-9999';
  offscreenContainer.style.overflow = 'visible';

  // Clone the CV preview node
  const clone = targetElement.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.boxShadow = 'none';
  clone.style.width = '794px';

  // Remove preview-only elements in clone
  const previewOnlyEls = clone.querySelectorAll<HTMLElement>('.print\\:hidden, [data-preview-only="true"]');
  previewOnlyEls.forEach((el) => el.remove());

  // Ensure all images in clone have crossOrigin set
  const images = clone.getElementsByTagName('img');
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    if (img.src && !img.src.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
  }

  offscreenContainer.appendChild(clone);
  document.body.appendChild(offscreenContainer);

  try {
    // Short wait for DOM attachment
    await new Promise((resolve) => setTimeout(resolve, 80));

    // Render using html2canvas
    const canvas = await html2canvas(clone, {
      scale: 2, // Crisp 300dpi-equivalent print quality
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
    });

    // Create high-quality JPEG data URL from canvas
    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Initialize jsPDF with standard A4 measurements
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Add subsequent pages if CV content overflows 1 A4 page
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    const safeFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

    // Generate binary blob & URL
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    // Trigger download via anchor element
    try {
      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = safeFileName;
      downloadLink.target = '_blank';
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(() => {
        if (document.body.contains(downloadLink)) {
          document.body.removeChild(downloadLink);
        }
      }, 3000);
    } catch (clickErr) {
      console.warn('Programmatic download click failed, providing blob URL to UI:', clickErr);
    }

    const result: PDFExportResult = {
      success: true,
      blobUrl,
      blob,
      fileName: safeFileName,
    };

    onSuccess?.(result);
    return result;
  } catch (err: any) {
    console.error('HTML to PDF export failed:', err);
    onError?.(err);

    return {
      success: false,
      error: err?.message || 'Failed to generate PDF',
    };
  } finally {
    // Clean up offscreen clone
    if (document.body.contains(offscreenContainer)) {
      document.body.removeChild(offscreenContainer);
    }
  }
}

