// src/app/components/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-pink-100 text-gray-800 pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <div className="flex items-center mb-4">
            <Image src="/zem_logo.jpg" alt="Zem Collections Logo" width={50} height={50} />
            <span className="ml-3 text-xl font-bold text-pink-600">Zem Collections</span>
          </div>
          <p className="text-sm">
            Discover premium skincare, elegant jewelry, and beauty essentials curated just for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-pink-600 transition">Home</Link></li>
            <li><Link href="/products" className="hover:text-pink-600 transition">Shop</Link></li>
            <li><Link href="/about" className="hover:text-pink-600 transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-pink-600 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="text-sm space-y-2">
            <li>Email: support@zemcollections.com</li>
            <li>Phone: +92 300 0000000</li>
            <li>Karachi, Pakistan</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-pink-600 transition">Facebook</Link>
            <Link href="#" className="hover:text-pink-600 transition">Instagram</Link>
            <Link href="#" className="hover:text-pink-600 transition">TikTok</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Zem Collections. All rights reserved.
      </div>
    </footer>
  );
}
