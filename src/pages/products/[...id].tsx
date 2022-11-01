import { useState, useEffect } from 'react';
import ControlBar from '@/lib/components/Core/ControlBar';
import Logo from '@/lib/components/Core/Logo';
import { Product } from '@/lib/types/product';
import { useRouter } from 'next/router';
import Image from 'next/image';
function Products() {
  const [product, setProduct] = useState<Product>();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    console.log(id);
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);
  console.log(product);
  return (
    <>
      <ControlBar />
      <Logo />
      <div className="flex flex-col w-full m-3 lg:flex-row">
        <div>
          <Image
            src={product?.image ? product.image : ''}
            alt={product?.description ? product.description : ''}
            className="w-full h-60 object-contain"
            width={250}
            height={250}
          />
        </div>
        <div className="my-3">
          <h1 className="text-xl font-bold">{product?.title}</h1>
        </div>
      </div>
    </>
  );
}
export default Products;
