import { ReactElement } from 'react';
import { trpc } from '@/utils/trpc';
import Layout from '@/lib/components/Layouts/Layout';
import NextError from 'next/error';
import { PageWithLayout } from '@/lib/types/page';
import { GetServerSideProps } from 'next';
import Product from '@/lib/components/Products/Product';
import ProductSkeleton from '@/lib/components/Products/ProductSkeleton';

type PageProps = {
  id: string;
};

const ProductPage: PageWithLayout<PageProps> = ({ id }: PageProps) => {
  const { data, error, isLoading } = trpc.product.sellableProductById.useQuery({ id });

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  if (isLoading) {
    return <ProductSkeleton />;
  }

  return (
    data && (
      <Product
        id={data.id}
        title={data.title}
        image={data.image}
        category={data.category[0].name ?? ''}
        description={data.description}
        price={(+data.priceInCents / 100).toString()}
      />
    )
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  return {
    props: {
      id
    }
  };
};

ProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
