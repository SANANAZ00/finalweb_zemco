'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  category: string;
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const storedProducts = JSON.parse(localStorage.getItem('allProducts') || '[]');
    const items = storedProducts.filter((p: Product) => storedWishlist.includes(p.id));
    setWishlistItems(items);
  }, []);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Wishlist ❤️</h1>
      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500">No items in wishlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
