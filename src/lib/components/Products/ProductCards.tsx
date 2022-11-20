import { trpc } from '@/utils/trpc';
import { Title } from '@mantine/core';
import NextError from 'next/error';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

function ProductCards({
  category,
  title,
  searchTerm
}: {
  category?: number | undefined;
  title?: string;
  searchTerm?: string;
}) {
  const { data, isLoading, error } = trpc.product.sellableProducts.useQuery({
    id: category,
    searchTerm
  });

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  return (
    <>
      {title && (
        <div className="flex w-full justify-center min-h-[6rem]">
          <div className="flex flex-col items-center mb-4">
            <Title weight={300} order={1} color="dark" td="underline" className="text-4xl">
              {title}
            </Title>
            {data && !data.length && (
              <Title weight={300} order={3} color="dimmed" mt={20}>
                No Products Added In This Category Yet.
              </Title>
            )}
          </div>
        </div>
      )}

      {searchTerm && (
        <div className="flex w-full justify-center min-h-[6rem]">
          <div className="flex flex-col items-center mb-4">
            <Title weight={300} order={1} color="dark" td="underline" className="text-4xl">
              Search Results
            </Title>
            {data && data.length && (
              <Title weight={300} order={3} color="dimmed" mt={20}>
                Found {`(${data.length})`} Products Matching Term: {searchTerm}
              </Title>
            )}
            {data && !data.length && (
              <Title weight={300} order={3} color="dimmed" mt={20}>
                No Products Found For Term: {searchTerm}
              </Title>
            )}
          </div>
        </div>
      )}

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
                image={`https://res.cloudinary.com/dv9wpbflv/image/upload/f_auto,q_auto/v${e.image}.jpg`}
              />
            );
          })}
      </div>
    </>
  );
}
export default ProductCards;
