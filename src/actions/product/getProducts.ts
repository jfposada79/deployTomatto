'use server';

import prisma from '@/lib/prisma';

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProductImage: true,
      },
    });

    return products.map((product) => ({
      ...product,
      images: product.ProductImage.map((image) => image.url),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener productos');
  }
};
