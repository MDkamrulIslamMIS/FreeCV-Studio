import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFExportOptions {
  fileName?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (err: any) => void;
}

/**
 * Generates and downloads a crystal-clear A4 PDF of the CV
 */
export async function exportCVToPDF(
  elementId: string = 'cv-preview-printable',
  options: PDFExportOptions = {}
): Promise<boolean> {
  const { fileName = 'Professional_CV.pdf', onStart, onSuccess, onError } = options;

  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    const errorMsg = `CV element with id "${elementId}" was not found.`;
    console.error(errorMsg);
    onError?.(new Error(errorMsg));
    return false;
  }

  onStart?.();

  // Create an offscreen wrapper to isolate from any CSS zoom/transform
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '794px'; // Exact A4 width in pixels at 96dpi
  container.style.backgroundColor = '#ffffff';
  container.style.zIndex = '-9999';

  // Clone the CV preview node
  const clone = originalElement.cloneNode(true) as HTMLElement;
  clone.style.transform = 'none';
  clone.style.margin = '0';
  clone.style.width = '794px';
  clone.style.boxShadow = 'none';

  // Remove preview-only helpers from clone (like page cut markers)
  const previewOnlyEls = clone.querySelectorAll('.print\\:hidden, [data-preview-only="true"]');
  previewOnlyEls.forEach((el) => el.remove());

  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // Wait for any images or fonts inside the clone to settle
    await new Promise((resolve) => setTimeout(resolve, 150));

    const canvas = await html2canvas(clone, {
      scale: 2, // 2x for sharp print resolution
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      windowWidth: 794,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = 210; // A4 standard width in mm
    const pdfHeight = 297; // A4 standard height in mm
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Multi-page support if the CV content is longer than 1 A4 page
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    const safeFileName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    pdf.save(safeFileName);

    onSuccess?.();
    return true;
  } catch (err) {
    console.error('PDF generation error:', err);
    onError?.(err);

    // Fallback: Attempt standard browser print dialog
    try {
      window.print();
    } catch (printErr) {
      console.error('Fallback print also failed:', printErr);
    }
    return false;
  } finally {
    // Clean up temporary DOM container
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
