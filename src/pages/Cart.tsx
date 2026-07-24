import { useCartContext } from "../hooks/useCartContext";

function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, clearCart } =
    useCartContext();

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const discount = cartItems.reduce((sum, item) => {
    if (!item.salePrice) return sum;
    return sum + (item.price - item.salePrice) * item.quantity;
  }, 0);

  return (
    <div className="grow flex flex-col bg-[#faf8f5] dark:bg-black/80 text-black dark:text-white transition-colors ease-in-out duration-300">
      <div className="container mx-auto max-w-2xl md:max-w-4xl lg:max-w-6xl px-7 sm:px-8 md:px-12 lg:px-16 xl:px-10 py-10 sm:py-12 md:py-15 lg:py-18 space-y-12 text-black dark:text-white">
        {cartItems.length === 0 && <p>The Cart is empty</p>}

        {cartItems.length > 0 && (
          <>
            <div className="flex space-x-3">
              <h1 className="font-semibold text-xl tracking-tight">
                Shopping Cart
              </h1>
              <button
                onClick={clearCart}
                className="text-xxs px-2 border rounded-md hover:scale-105 duration-150 cursor-pointer"
              >
                Clear Cart
              </button>
            </div>

            <section className="md:mt-15 flex flex-col md:flex-row md:space-x-10">
              <ul className="grid grid-cols-1 gap-6">
                <li className="grid grid-cols-3 xs:grid-cols-4 uppercase">
                  <p className="text-sm xs:col-span-2 text-center">Product</p>
                  <span className="text-sm text-center">Quantity</span>
                  <span className="text-sm text-center">subtotal</span>
                </li>
                {cartItems.map(item => {
                  return (
                    <li
                      key={item.cartItemId}
                      className="grid grid-cols-4 gap-4"
                    >
                      <div className="relative">
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="absolute -left-2 -top-2 w-6 bg-white dark:text-black hover:scale-105 text-md border rounded-full cursor-pointer"
                        >
                          x
                        </button>
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-full h-25 xs:h-36 object-cover rounded-md"
                        />
                      </div>
                      <div className="text-sm flex flex-col justify-center space-y-px md:space-y-2">
                        <h2 className="xs:text-md font-bold">
                          {item.name} - {item.sizeName}
                        </h2>
                        {item.salePrice ? (
                          <div>
                            <p className="line-through text-neutral-400">
                              ${item.price} x {item.quantity}
                            </p>

                            <p>
                              ${item.salePrice} x {item.quantity}
                            </p>
                          </div>
                        ) : (
                          <p>
                            ${item.price} x {item.quantity}
                          </p>
                        )}
                      </div>
                      <div className="flex justify-center items-center space-x-1.5">
                        <button
                          onClick={() =>
                            updateItemQuantity(
                              item.cartItemId,
                              item.quantity - 1
                            )
                          }
                          className="bg-white dark:text-black border px-2 rounded-sm duration-150 hover:scale-105 cursor-pointer"
                        >
                          -
                        </button>
                        <div>{item.quantity}</div>
                        <button
                          onClick={() => {
                            if (item.quantity >= item.stockCount) return;
                            updateItemQuantity(
                              item.cartItemId,
                              item.quantity + 1
                            );
                          }}
                          className="bg-white dark:text-black border px-2 rounded-sm duration-150 hover:scale-105 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex justify-center items-center">
                        $
                        {item.salePrice
                          ? `${item.salePrice * item.quantity}`
                          : `${item.price * item.quantity}`}
                      </div>
                    </li>
                  );
                })}
              </ul>
              {/* Tablet/Desktop Checkout */}
              <div className="hidden md:flex flex-col items-start text-nowrap">
                <div className="w-full dark:text-black bg-black/10 dark:bg-white/90 font-semibold text-md p-6 border rounded-md space-y-5">
                  <span className="flex justify-between space-x-6">
                    <span className="uppercase">subtotal</span>
                    <span>$ {subtotal}</span>
                  </span>
                  <span className="flex justify-between space-x-6">
                    <span className="uppercase">discounts</span>
                    <span>${discount}</span>
                  </span>
                  <span className="flex justify-between space-x-6 border-t">
                    <span className="uppercase">total</span>
                    <span>${subtotal - discount}</span>
                  </span>
                </div>
                <button className="mt-1.5 lg:mt-2 font-mono w-full bg-black text-white py-1 px-2 duration-150 hover:bg-black/80 border rounded-md cursor-pointer">
                  Checkout
                </button>
              </div>
              {/* Mobile Checkout */}
              <div className="mt-10 flex md:hidden flex-col items-start text-nowrap">
                <div className="w-full dark:text-black bg-black/10 dark:bg-white/90 font-semibold text-md p-6 border rounded-md space-y-5">
                  <span className="flex justify-between space-x-6">
                    <span className="uppercase">subtotal</span>
                    <span>$ {subtotal}</span>
                  </span>
                  <span className="flex justify-between space-x-6">
                    <span className="uppercase">discounts</span>
                    <span>${discount}</span>
                  </span>
                  <span className="flex justify-between space-x-6 border-t">
                    <span className="uppercase">total</span>
                    <span>${subtotal - discount}</span>
                  </span>
                </div>
                <button className="mt-1.5 lg:mt-2 font-mono w-full bg-black text-white p-2 duration-150 hover:bg-black/80 border rounded-lg cursor-pointer">
                  Checkout
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
