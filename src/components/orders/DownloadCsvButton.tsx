'use client';

import { exportCsv } from '@/actions';
import { useEffect } from 'react';

const DownloadCsvButton = () => {
  const handleExportCsv = async () => {
    try {
      const csv = await exportCsv();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download CSV:', error);
    }
  };

  return (
    <button onClick={handleExportCsv} className="btn ml-2">
      Descargar CSV
    </button>
  );
};

export default DownloadCsvButton;
