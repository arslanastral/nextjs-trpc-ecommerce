import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/dashboard/seller/orders',
      permanent: false
    }
  };
};

function Dashboard() {
  return;
}

export default Dashboard;
