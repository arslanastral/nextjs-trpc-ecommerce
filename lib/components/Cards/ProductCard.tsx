import Image from 'next/image';
export type Product = {
  id: number;
  title: string;
  price: number | string;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductCard({ id, title, image, description, price }: Product) {
  return (
    <div
      key={id}
      className="flex flex-col justify-around m-7 bg-slate-100 p-5 rounded-md text-ellipsis"
    >
      <Image
        src={image}
        alt={description}
        className="h-60 w-80 object-contain"
        height={275}
        width={250}
      />
      <h1 className="w-[15rem] text-zinc-800 text-2xl font-bold">{title}</h1>
      <h1 className="text-right text-primary text-2xl text-[#614c47] font-bold">US ${price}</h1>
      <p className="text-right text-zinc-800">sellername</p>
      <button className="text-[#614c47] border border-[#614c47] rounded-md mt-4 py-1 w-full">
        Add to Cart
      </button>
    </div>
  );
}
