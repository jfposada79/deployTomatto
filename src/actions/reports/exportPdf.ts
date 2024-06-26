// actions/exportPdf.ts
'use server';

import prisma from '@/lib/prisma';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const exportPdf = async (): Promise<Uint8Array> => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    console.log('Orders retrieved:', orders.length);

    // Crear un nuevo documento PDF
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => buffers.push(chunk));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      console.log('PDF byte length:', pdfData.length);
    });

    // Embedding a custom font
    const fontPath = path.resolve('./public/fonts/OpenSans-Regular.ttf');
    if (!fs.existsSync(fontPath)) {
      throw new Error(`Font file not found at path: ${fontPath}`);
    }
    doc.registerFont('OpenSans', fontPath);

    // Título del PDF
    doc.font('OpenSans').fontSize(20).text('Todos los pedidos', { align: 'center' });

    // Espacio
    doc.moveDown();

    // Agregar las órdenes al PDF
    orders.forEach((order, index) => {
      console.log(`Adding order ${index + 1}/${orders.length}`);
      doc
        .font('OpenSans')
        .fontSize(12)
        .text(
          `${order.id} - ${order.OrderAddress?.firstName || ''} ${
            order.OrderAddress?.lastName || ''
          } - ${order.isPaid ? 'Pagada' : 'No Pagada'}`,
        );
      doc.moveDown();
    });

    // Finalizar el documento
    doc.end();

    const pdfBytes = Buffer.concat(buffers);
    console.log('Final PDF byte length:', pdfBytes.length);
    return new Uint8Array(pdfBytes);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};
