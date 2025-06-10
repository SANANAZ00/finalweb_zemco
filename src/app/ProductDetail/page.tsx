'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Dummy data (you can replace this with actual API/fetch logic)
const dummyProducts = [
  {
    id: '1',
    title: 'Blush Beauty Cream',
    image: '/blush.jpg',
    price: '$25',
    category: 'skincare',
    description: 'A smooth cream for daily skin glow and hydration.',
  },
  {
    id: '2',
    title: 'Gold Drop Earrings',
    image: '/jewellery.jpg',
    price: '$45',
    category: 'jewelry',
    description: 'Elegant gold-plated earrings for a classy touch.',
  },
  {
    id: '3',
    title: 'Lip Shine Gloss',
    image: '/product_1.jpg',
    price: '$18',
    category: 'cosmetics',
    description: 'Glossy finish for a perfect pout all day.',
  },
  {
    id: '4',
    title: 'Luxury Hair Oil',
    image: '/hair.jpg',
    price: '$30',
    category: 'skincare',
    description: 'Infused with essential oils for strong, shiny hair.',
  },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const found = dummyProducts.find((p) => p.id === params.id);
    if (!found) return;
    setProduct(found);
  }, [params.id]);

  if (!product) {
    return notFound();
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.title} added to cart!`);
  };

  return (
    <section className="min-h-screen p-6 bg-white flex flex-col md:flex-row gap-6">
      <div className="relative w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden shadow-lg">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-pink-600 text-xl font-semibold">{product.price}</p>
        <p className="text-sm text-gray-600 capitalize">Category: {product.category}</p>

        <p className="text-gray-700 text-sm leading-relaxed">{product.description}</p>

        <button
          onClick={addToCart}
          className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}
