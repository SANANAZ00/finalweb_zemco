'use client';

import ProductCard from '@/components/ProductCard';
import { sanityClient } from '@/sanity/client';
import { useEffect, useState } from 'react';

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  price: number;
  category: string;
  description?: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await sanityClient.fetch(`*[_type == "product"]{
        _id,
        title,
        price,
        category,
        description,
        "imageUrl": image.asset->url
      }`);
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section className="min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shop All Products</h1>
      {loading ? (
        <div className="text-center">Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}















// // src/app/shop/page.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { client } from '@/lib/sanity';
// import ProductCard from '@/components/ProductCard';

// export default function ShopPage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
//   const [categories, setCategories] = useState<string[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const data = await client.fetch(`
//         *[_type == "product"] {
//           _id,
//           title,
//           price,
//           image,
//           category,
//           slug
//         }
//       `);

//       setProducts(data);
//       setFilteredProducts(data);

//       const categoriesData = Array.from(new Set(data.map((item: any) => item.category)));
//       setCategories(categoriesData);
//     };

//     fetchProducts();
//   }, []);

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCategory(e.target.value);
//   };

//   useEffect(() => {
//     let filtered = products;

//     if (selectedCategory) {
//       filtered = filtered.filter((product) => product.category === selectedCategory);
//     }

//     if (searchQuery) {
//       filtered = filtered.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));
//     }

//     setFilteredProducts(filtered);
//   }, [selectedCategory, searchQuery, products]);

//   return (
//     <div className="p-6">
//       <div className="flex gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="border rounded-lg p-2"
//         />

//         <select
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           className="border rounded-lg p-2"
//         >
//           <option value="">All Categories</option>
//           {categories.map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//         {filteredProducts.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }
