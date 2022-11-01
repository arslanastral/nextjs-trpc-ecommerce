import { useState, useEffect } from 'react';
import ControlBar from '@/lib/components/Core/ControlBar';
import Logo from '@/lib/components/Core/Logo';
import { Product } from '@/lib/types/product';
import { useRouter } from 'next/router';
import Image from 'next/image';
function Products() {
  const [product, setProduct] = useState<Product>();
  const [clickedReadMore, setClickedReadMore] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const MAX_CHARACTERS = 135;
  let isMaxCharacters = false;
  useEffect(() => {
    console.log(id);
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);
  if (product?.description && product?.description.length > MAX_CHARACTERS) {
    isMaxCharacters = true;
  }
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
          <div className="w-full flex justify-between my-4">
            <p className="mr-auto">Seller name</p>
            <p className="mr-1">Listed on: 11-1-2022</p>
          </div>
          <h1 className="text-xl font-bold">{product?.title}</h1>
          <p className="capitalize text-zinc-500">{product?.category}</p>
          <p className="my-10">
            {!isMaxCharacters && <>{product?.description}</>}
            {!clickedReadMore && isMaxCharacters && (
              <>
                {product?.description.substring(0, MAX_CHARACTERS) + '...'}{' '}
                <button className="text-blue-500" onClick={() => setClickedReadMore(true)}>
                  Read More
                </button>
              </>
            )}
            {clickedReadMore && isMaxCharacters && (
              <>
                {product?.description + ' '}
                <button className="text-blue-500" onClick={() => setClickedReadMore(false)}>
                  Read Less
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
export default Products;
