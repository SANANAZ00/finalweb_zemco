import Image from 'next/image';

interface Props {
  params: { slug: string };
}

const productData: Record<string, any> = {
  blush: {
    title: 'Luxury Blush',
    image: '/blush.jpg',
    description: 'Smooth, blendable blush for radiant cheeks.',
    price: '$19.99',
  },
  jewellery: {
    title: 'Elegant Jewellery',
    image: '/jewellery.jpg',
    description: 'Shimmering pieces that elevate your look.',
    price: '$49.99',
  },
  // Add more...
};

export default function ProductDetail({ params }: Props) {
  const product = productData[params.slug];

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Image src={product.image} alt={product.title} width={500} height={500} className="rounded-xl" />
        <div>
          <h1 className="text-3xl font-bold text-pink-600">{product.title}</h1>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-xl font-semibold mt-4">{product.price}</p>
          <button className="mt-6 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
