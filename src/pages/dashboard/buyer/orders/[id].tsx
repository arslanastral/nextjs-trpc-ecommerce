import Head from 'next/head';
import { ReactElement } from 'react';
import { trpc } from '@/utils/trpc';
import { DashboardLayout } from '@/lib/components/Layouts/DashboardLayout';
import NextError from 'next/error';
import { PageWithLayout } from '@/lib/types/page';
import { useRouter } from 'next/router';
import Order from '@/lib/components/Dashboard/Buyer/Orders/Order';

const BuyerOrderPage: PageWithLayout = () => {
  const id = useRouter().query.id as string;
  //   const { data, error, isLoading } = trpc.product.sellableProductById.useQuery(
  //     { id },
  //     { enabled: !!id }
  //   );

  //   if (error) {
  //     return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  //   }

  return (
    <>
      <Head>
        <title>Order | Zavy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Order />
    </>
  );
};

BuyerOrderPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BuyerOrderPage;
