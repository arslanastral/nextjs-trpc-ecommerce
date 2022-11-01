import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import { DashboardLayout } from '@/lib/components/Layouts/DashboardLayout';
import { useSession, signOut } from 'next-auth/react';

const BuyerOrders: PageWithLayout = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Zavy | My Orders</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <div>Hello My Orders</div>
    </>
  );
};

BuyerOrders.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BuyerOrders;
