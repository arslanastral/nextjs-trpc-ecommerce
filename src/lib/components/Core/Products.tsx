import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/product';
import TestProductCard from '../Cards/TestProductCard';
function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="flex flex-wrap justify-center gap-10">
      {products.map(({ id, title, image, description, price }: Product) => (
        <TestProductCard
          key={id}
          id={id.toString()}
          title={title}
          image={image}
          description={description}
          price={price.toString()}
        />
      ))}
    </div>
  );
}
export default Products;
