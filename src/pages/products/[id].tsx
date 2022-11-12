import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button } from '@mantine/core';
import { trpc } from '@/utils/trpc';
import Layout from '@/lib/components/Layouts/Layout';
import NextError from 'next/error';

const ProductPage = () => {
  const id = useRouter().query.id as string;

  let product = trpc.product.sellableProductById.useQuery({ id });

  if (product.error) {
    return (
      <NextError title={product.error.message} statusCode={product.error.data?.httpStatus ?? 500} />
    );
  }

  if (product.status !== 'success') {
    return <>Loading...</>;
  }

  return (
    <Layout>
      {product?.data && (
        <div className="flex flex-col w-full m-3 px-4 lg:flex-row lg:max-w-5xl xl:max-w-7xl ml-auto">
          <div className="lg:mr-10">
            <Image
              width={350}
              height={450}
              src={`https://res.cloudinary.com/dv9wpbflv/image/upload/v${product.data.image}.jpg`}
              className="w-full h-60 object-contain lg:gap-2 lg:h-auto"
              alt="Product Image"
            />
          </div>
          <div className="my-3 flex flex-col">
            <div className="w-full flex justify-between my-4">
              <p className="mr-auto">Seller name</p>
              <p className="mr-1">Listed on: 11-1-2022</p>
            </div>
            <h1 className="text-xl font-bold text-zinc-600 max-w-3xl">{product.data.title}</h1>
            <p className="capitalize text-zinc-500">{product.data.category[0].name}</p>
            <p className="my-10 order-4 lg:order-5 lg:max-w-3xl">{product.data.description}</p>
            <div className="mr-1 order-5 md:order-4 py-3">
              <p className="font-extrabold text-4xl text-right mb-5 lg:mb-10 text-zinc-600">
                $ {(+product.data.priceInCents / 100).toString()}
              </p>
              <div className="flex">
                <div className="w-[40%] flex">
                  <div className="p-3 px-5 md:px-6 bg-zinc-100 rounded-l-lg border border-zinc-200 text-zinc-500">
                    -
                  </div>
                  <div className="p-3 px-5 md:px-8 lg:px-10 border border-zinc-200 text-zinc-500">
                    {'10'}
                  </div>
                  <div className="p-3 px-5 md:px-6 bg-zinc-100 rounded-r-lg border border-zinc-200 text-zinc-500">
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
};
export default ProductPage;
