// src/app/components/ProductGrid.tsx
"use client"
import ProductCard from './ProductCard';
import { useEffect } from 'react';

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  category: string;
}

interface Props {
  products?: Product[];
  category?: string;
}

const allProducts: Product[] = [
  { id: 'blush', title: 'Luxury Blush', image: '/blush.jpg', category: 'makeup', price: '' },
  { id: 'jewellery', title: 'Elegant Jewellery', image: '/necklace_set.jpeg', category: 'jewellery', price: '' },
  { id: 'hair', title: 'Hot Air Brush Dryer', image: '/hair.jpg',  category: 'hair', price: '' },
  // more...
];

export default function ProductGrid({ products, category }: Props) {
  const filteredProducts = products ?? allProducts.filter((p) => !category || p.category === category);
  useEffect(() => {
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
  },
   []);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>

  );
}





















// import ProductCard from './ProductCard';

// const products = [
//   {
//     title: 'Glow Blush Palette',
//     image: '/product_1.jpg',
//     price: 'Rs. 1,499',
//     link: '/products/glow-blush-palette',
//   },
//   {
//     title: 'Elegant Earrings',
//     image: '/jewellery.jpg',
//     price: 'Rs. 2,299',
//     link: '/products/elegant-earrings',
//   },
//   {
//     title: 'Silky Hair Serum',
//     image: '/hair.jpg',
//     price: 'Rs. 1,099',
//     link: '/products/hair-serum',
//   },
//   {
//     title: 'Luxury Skin Cream',
//     image: '/skincare.jpg',
//     price: 'Rs. 2,999',
//     link: '/products/skin-cream',
//   },
// ];

// export default function ProductGrid() {
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4">
//         <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
//           Featured <span className="text-pink-600">Products</span>
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <ProductCard
//               key={product.title}
//               title={product.title}
//               image={product.image}
//               price={product.price}
//               link={product.link}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
