import { useState, useEffect } from 'react';
import { Product } from '@/lib/types/product';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@mantine/core';
import Layout from '@/lib/components/Layouts/Layout';

function Products() {
  const [product, setProduct] = useState<Product>();
  const [clickedReadMore, setClickedReadMore] = useState(false);
  const [orderCount, setOrderCount] = useState(1);
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
  function addOrderCount() {
    setOrderCount((oldCount) => oldCount + 1);
  }
  function subractOrderCount() {
    if (orderCount > 1) {
      setOrderCount((oldCount) => oldCount - 1);
    }
  }
  if (product?.description && product?.description.length > MAX_CHARACTERS) {
    isMaxCharacters = true;
  }
  console.log(product);
  return (
    <Layout>
      {product && (
        <div className="flex flex-col w-full m-3 px-4 lg:flex-row lg:max-w-5xl xl:max-w-7xl ml-auto">
          <div className="lg:mr-10">
            <Image
              src={product.image}
              alt={product.description}
              className="w-full h-60 object-contain lg:gap-2 lg:h-auto"
              width={250}
              height={250}
            />
          </div>
          <div className="my-3 flex flex-col">
            <div className="w-full flex justify-between my-4">
              <p className="mr-auto">Seller name</p>
              <p className="mr-1">Listed on: 11-1-2022</p>
            </div>
            <h1 className="text-xl font-bold text-zinc-600">{product.title}</h1>
            <p className="capitalize text-zinc-500">{product.category}</p>
            <p className="my-10 order-4 lg:order-5 lg:max-w-3xl">
              {!isMaxCharacters && <>{product.description}</>}
              {!clickedReadMore && isMaxCharacters && (
                <>
                  {product.description.substring(0, MAX_CHARACTERS) + '...'}{' '}
                  <button className="text-blue-500" onClick={() => setClickedReadMore(true)}>
                    Read More
                  </button>
                </>
              )}
              {clickedReadMore && isMaxCharacters && (
                <>
                  {product.description + ' '}
                  <button className="text-blue-500" onClick={() => setClickedReadMore(false)}>
                    Read Less
                  </button>
                </>
              )}
            </p>
            <div className="mr-1 order-5 md:order-4 py-3">
              <p className="font-extrabold text-4xl text-right mb-3 lg:mb-10 text-zinc-600">
                $ {product.price}
              </p>
              <div className="flex">
                <div className="w-[40%] flex">
                  <div
                    className="p-3 px-5 md:px-8 bg-zinc-100 rounded-l-lg border border-zinc-200 text-zinc-500"
                    onClick={subractOrderCount}
                  >
                    -
                  </div>
                  <div className="p-3 px-5 md:px-10 lg:px-10 border border-zinc-200 text-zinc-500">
                    {orderCount}
                  </div>
                  <div
                    className="p-3 px-5 md:px-8 bg-zinc-100 rounded-r-lg border border-zinc-200 text-zinc-500"
                    onClick={addOrderCount}
                  >
                    +
                  </div>
                </div>
                <Button className="w-[60%] bg-brown-600" size="lg">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
export default Products;
