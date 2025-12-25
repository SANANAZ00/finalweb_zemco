'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/client';

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
}

export default function ImageGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "product" && defined(image)] | order(_createdAt desc)[0..8]{
          _id,
          title,
          category,
          "imageUrl": image.asset->url
        }`);
        setImages(data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGalleryImages();
  }, []);

  if (loading) {
    return null;
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <section id="categories" className="py-20 bg-gradient-to-b from-white via-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Collection</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Browse through our stunning collection of premium products
            </p>
          </div>

          {/* Masonry-style grid with staggered animations */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr gap-4 md:gap-6">
            {images.map((image, index) => (
              <div
                key={image._id}
                className="group relative overflow-hidden rounded-2xl cursor-pointer transform hover:scale-105 hover:z-10 transition-all duration-500 animate-fade-in-up"
                style={{
                  gridRow: index % 3 === 0 && images.length > 3 ? 'span 2' : 'span 1',
                  animationDelay: `${index * 100}ms`
                }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full h-64 md:h-80 group-hover:h-full transition-all duration-700 bg-gradient-to-br from-pink-100 to-purple-100">
                  <Image
                    src={image.imageUrl}
                    alt={image.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Overlay with content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="inline-block text-xs font-semibold bg-gradient-to-r from-pink-500 to-purple-500 px-3 py-1.5 rounded-full backdrop-blur-sm mb-2">
                        {image.category}
                      </span>
                      <h3 className="text-xl font-bold">{image.title}</h3>
                      <p className="text-sm text-gray-300 mt-1">Click to view</p>
                    </div>
                  </div>
                  
                  {/* Border glow effect */}
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/60 transition-all duration-500 rounded-2xl shadow-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-screen image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-400 transition-colors"
              aria-label="Close"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <p className="text-pink-300 mt-2 capitalize">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

