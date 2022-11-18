import Head from 'next/head';
import { ReactElement } from 'react';
import { trpc } from '@/utils/trpc';
import Layout from '@/lib/components/Layouts/Layout';
import NextError from 'next/error';
import { PageWithLayout } from '@/lib/types/page';
import Product from '@/lib/components/Products/Product';
import ProductSkeleton from '@/lib/components/Products/ProductSkeleton';
import { useRouter } from 'next/router';

const ProductPage: PageWithLayout = () => {
  const id = useRouter().query.id as string;
  const { data, error, isLoading } = trpc.product.sellableProductById.useQuery(
    { id },
    { enabled: !!id }
  );

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    data && (
      <>
        <Head>
          <title>{data.title} | Zavy</title>
          <meta name="description" content={data.description} />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Product
          id={data.id}
          title={data.title}
          image={data.image}
          category={data.category[0].name ?? ''}
          description={data.description}
          price={(+data.priceInCents / 100).toString()}
          stock={data.stock}
        />
      </>
    )
  );
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
