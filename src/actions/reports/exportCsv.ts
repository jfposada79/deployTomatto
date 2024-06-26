'use server';

import prisma from '@/lib/prisma';
import { format } from '@fast-csv/format';
import { Order } from '@prisma/client'; // Asegúrate de importar el tipo Order
import { Writable } from 'stream';

export const exportCsv = async (): Promise<string> => {
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

    const csvData = orders.map((order) => ({
      id: order.id,
      firstName: order.OrderAddress?.firstName || '',
      lastName: order.OrderAddress?.lastName || '',
      isPaid: order.isPaid ? 'Pagada' : 'No Pagada',
      createdAt: order.createdAt.toISOString(), // Formato ISO para la fecha
    }));

    return new Promise((resolve, reject) => {
      const writableStream = new Writable();
      const chunks: Buffer[] = [];

      writableStream._write = (chunk, encoding, next) => {
        chunks.push(Buffer.from(chunk));
        next();
      };

      writableStream.on('finish', () => {
        const csvBuffer = Buffer.concat(chunks);
        resolve(csvBuffer.toString('utf-8'));
      });

      const csvStream = format({ headers: true });

      csvStream.pipe(writableStream);

      csvData.forEach((row) => {
        csvStream.write(row);
      });

      csvStream.end();
    });
  } catch (error) {
    console.error('Error generating CSV:', error);
    throw new Error('Failed to generate CSV');
  }
};
