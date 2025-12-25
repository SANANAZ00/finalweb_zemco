// src/app/components/ProductGrid.tsx
"use client"
import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';
import { sanityClient } from '@/sanity/client';

interface Product {
  _id: string;
  id?: string;
  title: string;
  image?: string;
  imageUrl?: string;
  price: number | string;
  category: string;
}

interface Props {
  products?: Product[];
  category?: string;
}

export default function ProductGrid({ products: propProducts, category }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let query = `*[_type == "product" && defined(image)]`;
        if (category) {
          query += ` && category == "${category}"`;
        }
        query += ` | order(_createdAt desc)[0..11]{
          _id,
          title,
          price,
          category,
          "imageUrl": image.asset->url
        }`;

        const data = await sanityClient.fetch(query);
        setProducts(data);
        
        // Store in localStorage for cart/wishlist compatibility
        const productsForStorage = data.map((p: Product) => ({
          id: p._id,
          title: p.title,
          image: p.imageUrl,
          category: p.category,
          price: p.price
        }));
        localStorage.setItem('allProducts', JSON.stringify(productsForStorage));
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to static products if Sanity fails
        const fallbackProducts: Product[] = [
          { _id: 'blush', title: 'Luxury Blush', imageUrl: '/blush.jpg', category: 'makeup', price: 1499 },
          { _id: 'jewellery', title: 'Elegant Jewellery', imageUrl: '/necklace_set.jpeg', category: 'jewellery', price: 2299 },
          { _id: 'hair', title: 'Hot Air Brush Dryer', imageUrl: '/hair.jpg', category: 'hair', price: 1999 },
        ];
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };

    if (!propProducts) {
      fetchProducts();
    } else {
      setProducts(propProducts);
      setLoading(false);
    }
  }, [propProducts, category]);

  useEffect(() => {
    // Intersection Observer for fade-in animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('product-grid');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const filteredProducts = category 
    ? products.filter((p) => p.category === category)
    : products;

  if (loading) {
    return (
      <section id="product-grid" className="py-16 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading beautiful products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="product-grid" 
      className={`py-16 bg-gradient-to-b from-pink-50 to-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">Products</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our handpicked collection of premium beauty and lifestyle products
          </p>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id || product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
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
