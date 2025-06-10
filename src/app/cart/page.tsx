'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  category: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const numeric = parseFloat(item.price.replace(/[^\d.-]/g, ''));
    return total + numeric;
  }, 0);


  const handleCheckout = async () => {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems }),
    });
  
    const data = await res.json();
    window.location.href = data.url;
  };
  

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Cart 🛍️</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty. <Link href="/" className="text-pink-600 underline">Shop now</Link></p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 border rounded-xl shadow bg-white">
                <Image src={item.image} alt={item.title} width={100} height={100} className="rounded-md object-cover" />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                    <p className="font-bold text-pink-600">{item.price}</p>
                  </div>
                  <Link
  href="/confirmation"
  className="mt-4 inline-block px-6 py-2 bg-pink-600 text-white font-medium rounded hover:bg-pink-700 transition text-center"
>

  Proceed to Checkout
</Link>
<button onClick={handleCheckout} className="bg-pink-600 text-white px-6 py-2 rounded-lg mt-4">
  Proceed to Checkout
</button>
                  {/* <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 hover:underline self-start mt-2"
                  >
                    Remove
                  </button> */}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-xl mx-auto bg-gray-100 p-6 rounded-lg text-center shadow">
            <p className="text-xl font-semibold text-gray-800">Total: <span className="text-pink-600">${totalPrice.toFixed(2)}</span></p>
            <button className="mt-4 px-6 py-2 bg-pink-600 text-white font-medium rounded hover:bg-pink-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
