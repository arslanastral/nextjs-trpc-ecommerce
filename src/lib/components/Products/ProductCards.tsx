import { trpc } from '@/utils/trpc';
import NextError from 'next/error';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

function ProductCards() {
  const { data, isLoading, error } = trpc.product.sellableProducts.useQuery();

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {isLoading && Array.from(Array(8).keys()).map((e, i) => <ProductCardSkeleton key={i} />)}

      {data &&
        data.map((e, i) => {
          return (
            <ProductCard
              key={i}
              id={e.id}
              title={e.title}
              description={e.description}
              price={(+e.priceInCents / 100).toString()}
              image={`https://res.cloudinary.com/dv9wpbflv/image/upload/v${e.image}.jpg`}
            />
          );
        })}
    </div>
  );
}
export default ProductCards;
