'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id?: string;
  _id?: string;
  title: string;
  image?: string;
  imageUrl?: string;
  price: string | number;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(stored);
  }, []);

  const toggleWishlist = () => {
    let updated = [...wishlist];
    if (wishlist.includes(product.id)) {
      updated = updated.filter((id) => id !== product.id);
    } else {
      updated.push(product.id);
    }
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setToast(`${product.title} added to cart!`);
    window.dispatchEvent(new Event('cartUpdated'));
    setTimeout(() => setToast(''), 2000);
  };

  const isWishlisted = wishlist.includes(product.id);

  return (
    <>
      <div className="relative border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group bg-white">
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={product.imageUrl || product.image || '/placeholder.jpg'}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md capitalize">
            {product.category}
          </span>
          <button
  onClick={toggleWishlist}
  className="absolute top-3 right-3 text-white bg-black/40 rounded-full p-1 hover:bg-black/70 transition"
>
  <Heart
    className={`w-5 h-5 ${
      isWishlisted ? 'text-pink-500 fill-pink-500' : ''
    }`}
  />
</button>
        </div>
       
        <div className="p-4 space-y-1">
          <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
          <p className="text-pink-600 font-bold text-md">{typeof product.price === 'number' ? `$${product.price}` : product.price}</p>

          {/* Static rating stars */}
          <div className="flex gap-1 text-yellow-400 text-sm">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i}>{star}</span>
            ))}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={addToCart}
              className="bg-pink-600 text-white px-3 py-2 text-xs font-medium rounded-lg shadow hover:bg-pink-700 transition-all duration-300"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white border border-pink-600 text-pink-600 px-3 py-2 text-xs font-medium rounded-lg hover:bg-pink-50 transition-all"
            >
              Quick View
            </button>
          </div>
        </div>
      </div>

      {/* Quick Preview Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg space-y-4">
            <Dialog.Title className="text-lg font-semibold">{product.title}</Dialog.Title>
            <Image src={product.imageUrl || product.image || '/placeholder.jpg'} alt={product.title} width={400} height={300} className="rounded" />
            <p className="text-gray-600 text-sm">Category: <span className="capitalize">{product.category}</span></p>
            <p className="text-pink-600 text-lg font-bold">{typeof product.price === 'number' ? `$${product.price}` : product.price}</p>
            <button
              onClick={() => {
                addToCart();
                setIsModalOpen(false);
              }}
              className="w-full mt-4 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
            >
              Add to Cart
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-pink-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </>
  );
}
