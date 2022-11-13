import { trpc } from '@/utils/trpc';
import ProductCard from './ProductCard';

function ProductCards() {
  const products = trpc.product.sellableProducts.useQuery();

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {products.data?.map((e, i) => {
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
