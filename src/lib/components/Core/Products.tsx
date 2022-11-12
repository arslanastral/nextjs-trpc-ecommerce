import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/product';
import TestProductCard from '../Cards/TestProductCard';
import { trpc } from '@/utils/trpc';

function Products() {
  const productList = trpc.product.sellableProducts.useQuery();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-10">
      {!productList.data?.length &&
        products.map(({ id, title, image, description, price }: Product) => (
          <TestProductCard
            key={id}
            id={id.toString()}
            title={title}
            image={image}
            description={description}
            price={price.toString()}
          />
        ))}

      {productList.data?.map((e, i) => {
        return (
          <TestProductCard
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
export default Products;
