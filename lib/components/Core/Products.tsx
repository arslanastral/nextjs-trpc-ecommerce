import { useState, useEffect } from 'react';
import ProductCard, { Product } from '../Cards/ProductCard';
function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="flex flex-wrap justify-center 2xl:justify-around">
      {products.map(({ id, title, image, description, price, category, rating }: Product) => (
        <ProductCard
          key={id}
          id={id}
          title={title}
          category={category}
          image={image}
          description={description}
          price={price}
          rating={rating}
        />
      ))}
    </div>
  );
}
export default Products;
