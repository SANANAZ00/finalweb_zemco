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
    const productId = product._id || product.id;
    if (!productId) return;

    let updated = [...wishlist];
    if (wishlist.includes(productId)) {
      updated = updated.filter((id) => id !== productId);
    } else {
      updated.push(productId);
    }
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const productToAdd = {
      ...product,
      image: product.imageUrl || product.image || '/placeholder.jpg',
    };
    const updatedCart = [...cart, productToAdd];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setToast(`${product.title} added to cart!`);
    window.dispatchEvent(new Event('cartUpdated'));
    setTimeout(() => setToast(''), 2000);
  };

  const productId = product._id || product.id;
  const isWishlisted = productId ? wishlist.includes(productId) : false;

  return (
    <>
      <div className="relative border-2 border-transparent rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group bg-white transform hover:-translate-y-2">
        {/* Gradient border effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
        
        <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
          <Image
            src={product.imageUrl || product.image || '/placeholder.jpg'}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg capitalize backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
            {product.category}
          </span>
          
          {/* Wishlist button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full p-2 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group/wishlist"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-5 h-5 transition-all duration-300 ${
                isWishlisted 
                  ? 'text-pink-500 fill-pink-500 scale-110' 
                  : 'group-hover/wishlist:text-pink-500'
              }`}
            />
          </button>

          {/* Quick view overlay button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white/95 backdrop-blur-sm text-pink-600 px-6 py-3 rounded-full font-semibold shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 transform"
            >
              Quick View
            </button>
          </div>
        </div>
       
        <div className="p-5 space-y-2 bg-white">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors duration-300 line-clamp-2">
            {product.title}
          </h3>
          {product.price !== undefined && (
            <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {typeof product.price === 'number' ? `Rs. ${product.price.toLocaleString()}` : product.price}
            </p>
          )}

          <div className="flex gap-2 mt-4">
            <button
              onClick={addToCart}
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2.5 text-sm font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
            >
              Add to Cart
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 border-2 border-pink-600 text-pink-600 text-sm font-semibold rounded-lg hover:bg-pink-50 hover:border-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              View
            </button>
          </div>
        </div>
      </div>

      {/* Quick Preview Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" onClick={() => setIsModalOpen(false)} />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden transform animate-fade-in-up">
            <div className="relative h-80 bg-gradient-to-br from-pink-50 to-purple-50">
              <Image 
                src={product.imageUrl || product.image || '/placeholder.jpg'} 
                alt={product.title} 
                fill
                className="object-contain p-4" 
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Dialog.Title className="text-2xl font-bold text-gray-900 mb-2">{product.title}</Dialog.Title>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 rounded-full text-sm font-semibold capitalize">
                    {product.category}
                  </span>
                  {product.price !== undefined && (
                    <p className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                      {typeof product.price === 'number' ? `Rs. ${product.price.toLocaleString()}` : product.price}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart();
                    setIsModalOpen(false);
                  }}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
                >
                  Add to Cart
                </button>
                <button
                  onClick={toggleWishlist}
                  className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isWishlisted
                      ? 'bg-pink-100 text-pink-600 border-2 border-pink-600'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-600' : ''}`} />
                </button>
              </div>
            </div>
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
