'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

interface Product {
  id: string;
  title: string;
  image: string;
  imageUrl?: string;
  price: string;
  category: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showContactModal, setShowContactModal] = useState(false);

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
                <Image
                  src={item.imageUrl || item.image || '/placeholder.jpg'}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.title}</h2>
                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                    <p className="font-bold text-pink-600">{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 max-w-xl mx-auto bg-gray-100 p-6 rounded-lg text-center shadow">
            <p className="text-xl font-semibold text-gray-800">Total: <span className="text-pink-600">Rs. {totalPrice.toFixed(2)}</span></p>
            <button
              className="mt-4 px-6 py-2 bg-pink-600 text-white font-medium rounded hover:bg-pink-700 transition"
              onClick={() => setShowContactModal(true)}
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Contact Modal */}
          {showContactModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-pink-600 text-2xl font-bold"
                  onClick={() => setShowContactModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-pink-600">Contact to Place Your Order</h2>
                <p className="mb-6 text-gray-700">Need help placing your order? Contact us instantly!</p>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://wa.me/923350815545?text=Hi%2C%20I%20want%20to%20place%20an%20order%21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
                  >
                    WhatsApp
                  </a>
                  <a
                    href="tel:+923350815545"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                  >
                    Call Us
                  </a>
                  <button
                    className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
                    onClick={() => setShowContactModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
