import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import { DashboardLayout } from '@/lib/components/Layouts/DashboardLayout';
import { useSession, signOut } from 'next-auth/react';
import MyProducts from '@/lib/components/Dashboard/Seller/MyProducts';

const SellerProducts: PageWithLayout = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Zavy | My Products</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <MyProducts />
    </>
  );
};

SellerProducts.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default SellerProducts;
