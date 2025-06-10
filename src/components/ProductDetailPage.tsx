'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { client } from '@/lib/sanity';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      const productData = await client.fetch(`
        *[_type == "product" && _id == $id][0] {
          _id,
          title,
          price,
          description,
          category,
          image,
          slug
        }
      `, { id: params.id });

      if (!productData) {
        notFound();
        return;
      }

      setProduct(productData);

      const relatedData = await client.fetch(`
        *[_type == "product" && category == $category && _id != $id] {
          _id,
          title,
          price,
          image,
          slug
        }
      `, { category: productData.category, id: params.id });

      setRelatedProducts(relatedData);
    };

    fetchProductData();
  }, [params.id]);

  if (!product) return notFound();

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

      <h2 className="text-2xl font-bold mt-10">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {relatedProducts.map((product: any) => (
          <div key={product._id} className="relative border rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={300}
              height={300}
              className="object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-pink-600 text-md">{product.price}</p>
              <Link href={`/shop/${product._id}`} className="text-pink-600 text-xs">View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
