'use client';
// src/app/components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/client';

interface FeaturedProduct {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function HeroSection({ id }: { id?: string }) {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "product" && defined(image)] | order(_createdAt desc)[0..2]{
          _id,
          title,
          category,
          "imageUrl": image.asset->url
        }`);
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        // Fallback to static image if Sanity fails
        setFeaturedProducts([{
          _id: 'fallback',
          title: 'Featured Product',
          imageUrl: '/blush.jpg',
          category: 'makeup'
        }]);
      }
    };
    fetchFeaturedProducts();
  }, []);

  // Auto-rotate images
  useEffect(() => {
    if (featuredProducts.length > 1 && !isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [featuredProducts.length, isHovered]);

  const currentProduct = featuredProducts[currentIndex] || featuredProducts[0];

  return (
    <section id={id} className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-block">
            <span className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
              ✨ Premium Beauty Collection
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">True Glow</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
            Explore premium skincare, jewelry, and cosmetic products — handpicked for your beauty and elegance.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/shop" 
              className="group px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Shop Now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <a 
              href="#categories" 
              onClick={e => {
                e.preventDefault();
                const el = document.querySelector('#categories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="px-8 py-4 border-2 border-pink-600 text-pink-600 rounded-full font-semibold hover:bg-pink-50 hover:border-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Browse Categories
            </a>
          </div>
        </div>

        {/* Hero Image Carousel */}
        <div 
          className="relative w-full h-80 md:h-96 lg:h-[500px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {currentProduct && (
            <>
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src={currentProduct.imageUrl}
                  alt={currentProduct.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    {currentProduct.category}
                  </span>
                  <h3 className="text-2xl font-bold mt-2">{currentProduct.title}</h3>
                </div>
              </div>
              
              {/* Image indicators */}
              {featuredProducts.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentIndex 
                          ? 'w-8 bg-white' 
                          : 'w-2 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation arrows */}
              {featuredProducts.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % featuredProducts.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
