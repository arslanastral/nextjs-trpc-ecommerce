import Head from 'next/head';
import { PageWithLayout } from '@/lib/types/page';
import { ReactElement, useEffect, useState } from 'react';
import Layout from '@/lib/components/Layouts/Layout';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import ProductCard, { Product } from '@/lib/components/Cards/ProductCard';

const Home: PageWithLayout = () => {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="flex flex-col p-6 items-center justify-center 2xl:justify-around min-h-screen min-w-full bg-black text-white">
      <Head>
        <title>Zavy</title>
        <meta name="description" content="An ecommerce store" />
      </Head>

      <h2 className="text-4xl p-6">
        {session && `Signed in as: ${session?.user?.name}`}
        {session && (
          <button className="bg-blue-700 m-2 p-6" onClick={() => signOut()}>
            Sign Out
          </button>
        )}
        {!session && (
          <Link href="/login">
            <a className="text-blue-700">Login</a>
          </Link>
        )}
      </h2>

      <div className="flex flex-wrap justify-center 2xl:justify-around">
        {products.map(({ id, title, image, description, price, category, rating }: Product) => (
          <ProductCard
            key={id}
            id={id}
            title={title}
            category={category}
            image={image}
            description={description}
            price={price}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
