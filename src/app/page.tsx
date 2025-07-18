import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedCategories from '@/components/FeaturedCategories';
import ProductGrid from '@/components/ProductGrid';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="bg-pink-50 min-h-screen">
      <Navbar />
      <HeroSection id="home" />
      <FeaturedCategories id="categories" />
      <ProductGrid />
      <Footer />
    </main>
  );
}
