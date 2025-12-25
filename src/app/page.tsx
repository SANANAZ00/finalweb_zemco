import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProductGrid from '@/components/ProductGrid';
import ImageGallery from '@/components/ImageGallery';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  return (
    <main className="bg-pink-50 min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection id="home" />
      <ImageGallery />
      <ProductGrid />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
