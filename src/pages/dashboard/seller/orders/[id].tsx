import Head from 'next/head';
import { ReactElement } from 'react';
import { trpc } from '@/utils/trpc';
import { DashboardLayout } from '@/lib/components/Layouts/DashboardLayout';
import NextError from 'next/error';
import { PageWithLayout } from '@/lib/types/page';
import { useRouter } from 'next/router';
import Order from '@/lib/components/Dashboard/Seller/Orders/Order';

const SellerOrderPage: PageWithLayout = () => {
  const id = useRouter().query.id as string;
  const { data, error, isLoading } = trpc.order.getSellerOrderById.useQuery(
    { id },
    { enabled: !!id }
  );

  if (error) {
    return <NextError title={error.message} statusCode={error.data?.httpStatus ?? 500} />;
  }

  return (
    <>
      <Head>
        <title>Buyer Order | Zavy</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {data && (
        <Order
          id={data.id}
          bags={data.Bag}
          orderStatus={data.status}
          totalPrice={data.totalPriceInCents ?? ''}
          address={data.address}
        />
      )}
    </>
  );
};

SellerOrderPage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SellerOrderPage;
