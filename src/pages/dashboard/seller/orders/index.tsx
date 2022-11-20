import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import { DashboardLayout } from '@/lib/components/Layouts/DashboardLayout';
import { useSession, signOut } from 'next-auth/react';
import Orders from '@/lib/components/Dashboard/Seller/Orders/Orders';

const SellerOrders: PageWithLayout = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Zavy | Seller Orders</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <Orders />
    </>
  );
};

SellerOrders.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SellerOrders;
