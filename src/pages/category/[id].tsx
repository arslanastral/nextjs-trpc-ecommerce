import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useRouter } from 'next/router';
import ProductCards from '@/lib/components/Products/ProductCards';

const ProductCategoryPage: PageWithLayout = () => {
  const id = useRouter().query.id as string;

  let categoryMap = {
    'health-and-beauty': { id: 1, label: 'Health & Beauty' },
    'women-fashion': { id: 2, label: `Women's Fashion` },
    'men-fashion': { id: 3, label: `Men's Fashion` },
    luxury: { id: 4, label: 'Luxury' },
    electronics: { id: 5, label: 'Electronics' },
    sports: { id: 6, label: 'Sports' },
    other: { id: 7, label: 'Other' }
  };

  let label =
    id && `${id}` in categoryMap ? categoryMap[id as keyof typeof categoryMap].label : 'Latest';

  return (
    <div className="p-6 min-h-screen min-w-full text-white">
      <Head>
        <title>{label} | Zavy</title>
        <meta name="description" content="An ecommerce store" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ProductCards
        title={label}
        category={
          id && `${id}` in categoryMap ? categoryMap[id as keyof typeof categoryMap].id : undefined
        }
      />
    </div>
  );
};

ProductCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProductCategoryPage;
