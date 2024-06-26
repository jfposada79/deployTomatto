import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/interfaces';

interface Props {
  product: Product;
}

const Banner = ({ product }: Props) => {
  return (
    <div
      className="relative flex flex-row items-center justify-between p-2 select-none bg-cover bg-center w-full"
      style={{ backgroundImage: `url('/imgs/BannerBackground.svg')`, height: '50vh' }}
    >
      {/* Caja de la derecha para descripción, título, precio anterior, y botón */}
      <div className="flex flex-col w-1/2 items-start z-10 ml-10">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-customRed line-through">
          Antes: ${(product.price + product.price).toFixed(0)}
        </p>
        <Link href={`/product/${product.slug}`} className="mt-2">
          <span className="px-4 py-2 mt-6 text-white bg-red-600 rounded-md cursor-pointer hover:bg-red-700">
            ¡Lo quiero!
          </span>
        </Link>
      </div>
      {/* Caja de la izquierda para imagen, logo del porcentaje, "Ahora", y precio */}
      <div className="flex w-1/3 items-start z-10 mr-10">
        <div className="relative flex-shrink-0">
          <img src={product.images[0]} alt={product.title} className="object-cover h-64" />
        </div>
        <div className="flex flex-col justify-start ml-4">
          <img src="/imgs/promo.svg" alt="50%" className="h-12" />
          <h3 className="font-semibold text-customBlue italic text-larger">Ahora</h3>
          <span className="text-customRed text-smaller">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
