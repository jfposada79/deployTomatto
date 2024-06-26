import { useState } from 'react';
export const revalidate = 604800; //7 días
import { Metadata, ResolvingMetadata } from 'next';
import { ProductGrid } from '@/components';
import { notFound } from 'next/navigation';
import { Product } from '@/interfaces';
import { titleFont } from '@/config/fonts';
import React, { useRef } from 'react';
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
} from '@/components';
import { getProductBySlug } from '@/actions';
import { AddToCart } from './ui/AddToCart';
import TabsComponent from './ui/TabsComponent';

// interface Props {
//   products: Product[];
// }

const productosRecomendados: Product[] = [
  // Tus productos recomendados van aquí
];

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      // images: [], // https://misitioweb.com/products/image.png
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full md:w-full col-span-1 md:col-span-1 ">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-10">
        {/* Slideshow */}
        <div className="col-span-1 md:col-span-3 ">
          {/* Mobile Slideshow */}
          <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            className="block md:hidden"
          />

          {/* Desktop Slideshow */}
          <ProductSlideshow
            title={product.title}
            images={product.images}
            className="hidden md:block"
          />
        </div>

        {/* Detalles */}
        <div className="col-span-1 px-2 md:px-5">
          <StockLabel slug={product.slug} />

          <h1 className={` ${titleFont.className} antialiased font-bold text-lg md:text-2xl`}>
            {product.title}
          </h1>
          {/* Aquí agregarías el selector de tallas y cantidad */}
          <div className="flex flex-col md:flex-row items-center my-2 md:my-4">
            <span className="text-lg md:text-xl text-red-500 line-through mr-2">
              ${product.price}
            </span>
            <span className="text-xl md:text-2xl text-green-500">${product.price}</span>
            <span className="mt-2 md:mt-0 ml-0 md:ml-2 p-1 bg-yellow-300 text-sm rounded">
              15% OFF
            </span>
          </div>

          <AddToCart product={product} />
          <TabsComponent
            description={product.description}
            technicalSheet="Contenido de la Ficha Técnica"
            recommendations="Contenido de las Recomendaciones"
          />
        </div>
      </div>
    </div>
  );
}
