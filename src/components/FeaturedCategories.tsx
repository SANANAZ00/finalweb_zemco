// src/app/components/FeaturedCategories.tsx
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'Skincare', image: '/skincare.jpg', link: '/categories/skincare' },
  { name: 'Hair', image: '/hair.jpg', link: '/categories/hair' },
  { name: 'Bags', image: '/bag.jpg', link: '/categories/bags' },
  { name: 'Jewelry', image: '/jewellery.jpg', link: '/categories/jewelry' },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured <span className="text-pink-600">Categories</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group relative block rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              <div className="relative w-full h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute inset-0  bg-opacity-30 group-hover:bg-opacity-40 transition" />
              <div className="absolute bottom-3 left-3 text-white font-semibold text-lg bg-pink-500 bg-opacity-80 px-3 py-1 rounded">
                {category.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
