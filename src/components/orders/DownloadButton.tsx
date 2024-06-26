// components/DownloadButton.tsx
'use client';

import { exportPdf } from '@/actions';

export const DownloadButton = () => {
  const handleExportPdf = async () => {
    try {
      const pdfBytes = await exportPdf();
      console.log('Received PDF bytes:', pdfBytes.length);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download PDF:', error);
    }
  };

  return (
    <button onClick={handleExportPdf} className="btn ml-2">
      Descargar PDF
    </button>
  );
};
