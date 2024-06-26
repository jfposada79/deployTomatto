import Link from "next/link";

import { Title } from "@/components";
import { ProductsInCart } from "./ui/ProductsInCart";
import { OrderSummary } from "./ui/OrderSummary";
export default function CartPage() {
  // redirect('/empty');

  return (


    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title className="login-title text-center" title="Productos en tu carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl font-bold login-input ">Articulos elegidos</span>
            <Link href="/" className="underline mb-5">
              Continúa comprando
            </Link>

            {/* Items */}

            
            <ProductsInCart />
          
           
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <b><h2 className="text-2xl text-center mb-2">Resumen de la compra</h2></b>

            <OrderSummary />

            <div className="mt-5 mb-2 w-80">
              <Link
                className="flex btn-orange justify-center"
                href="/checkout/address"
              >
                Finalizar compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
