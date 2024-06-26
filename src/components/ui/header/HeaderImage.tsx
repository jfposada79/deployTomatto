import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Banner from './Banner';
import { Product } from '@/interfaces';
import { getProducts } from '@/actions/product/getProducts';

const HeaderImage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const loadedProducts = await getProducts();
        console.log('Productos cargados:', loadedProducts);
        setProducts(loadedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (products.length === 0) {
    return <div>No se encontraron productos</div>;
  }

  return (
    <div className="swiper-container">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 3000 }}
        loop
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Banner product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeaderImage;
