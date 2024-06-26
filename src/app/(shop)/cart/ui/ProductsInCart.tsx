'use client';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { useCartStore } from '@/store';
import { ProductImage, QuantitySelector } from '@/components';
import Link from 'next/link';
import { IoTrashOutline } from 'react-icons/io5';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  });

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div
          key={`${product.slug}-${product.size}`}
          className="container mx-auto my-10 p-6 bg-white shadow-md rounded-lg flex mb-5 w-full h-full"
        >
          {/* div izq */}
          <div>
            <ProductImage
              src={product.image}
              width={300}
              height={300}
              style={{
                width: '150px',
                height: '150px',
              }}
              alt={product.title}
              className="mr-5 rounded"
            />
          </div>
          {/* div izq */}
          {/*  */}
          {/* div derecho */}
          <div className="flex flex-col justify-between">
            <div className="flex justify-end">
              <IoTrashOutline
                onClick={() => removeProduct(product)}
                className="text-grey w-5 h-5 m-1"
              />
            </div>

            <div>
              <b>
                {' '}
                <Link className="hover:underline cursor-pointer" href={`/product/${product.slug} `}>
                  {product.title}
                </Link>
              </b>
            </div>

            <div>
              <Link className="hover:underline cursor-pointer" href={`/product/${product.slug} `}>
                Talle: {product.size}
              </Link>
            </div>

            <div>
              <p>Precio: ${product.price}</p>
            </div>

            <div>
              <QuantitySelector
                quantity={product.quantity}
                onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
              />
            </div>
          </div>
          {/* div derecho */}

          <div></div>
        </div>
      ))}
    </>
  );
};
