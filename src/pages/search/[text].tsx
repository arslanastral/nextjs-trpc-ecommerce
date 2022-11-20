import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useRouter } from 'next/router';
import ProductCards from '@/lib/components/Products/ProductCards';

const SearchPage: PageWithLayout = () => {
  const text = useRouter().query.text as string;

  return (
    <div className="p-6 min-h-screen min-w-full text-white">
      <Head>
        <title>Searched For: {text} | Zavy</title>
        <meta name="description" content="An ecommerce store" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ProductCards searchTerm={text} />
    </div>
  );
};

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
