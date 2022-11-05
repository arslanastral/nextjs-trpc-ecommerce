import { Product } from '@/lib/types/product';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ id, title, image, description, price }: Product) {
  return (
    <div key={id} className="flex flex-col justify-around m-7 rounded-md text-ellipsis">
      <Link href={`/products/${id}`}>
        <Image
          src={image}
          alt={description}
          className="h-60 w-80 object-contain"
          height={275}
          width={250}
        />
      </Link>
      <h1 className="w-[15rem] text-black text-base font-medium">
        <Link href={`/products/${id}`}>{title}</Link>
      </h1>
      <h1 className="text-right text-primary text-2xl text-[#614c47] font-bold pt-2">
        US ${price}
      </h1>
      <p className="text-right text-zinc-800">sellername</p>
      <button className="text-[#614c47] border border-[#614c47] rounded-lg mt-4 py-3 w-full">
        Add to Cart
      </button>
    </div>
  );
}
