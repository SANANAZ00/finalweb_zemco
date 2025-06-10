// src/app/components/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Discover Your <span className="text-pink-600">True Glow</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Explore premium skincare, jewelry, and cosmetic products — handpicked for your beauty and elegance.
          </p>
          <div className="mt-6 flex space-x-4">
            <Link href="/products" className="px-6 py-3 bg-pink-600 text-white rounded-md font-semibold shadow hover:bg-pink-700 transition">
              Shop Now
            </Link>
            <Link href="/categories" className="px-6 py-3 border border-pink-600 text-pink-600 rounded-md font-semibold hover:bg-pink-100 transition">
              Browse Categories
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-72 md:h-96">
          <Image
            src="/blush.jpg"
            alt="Featured Product"
            fill
            className="object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
