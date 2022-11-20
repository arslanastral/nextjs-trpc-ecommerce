import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/dashboard/buyer/orders',
      permanent: false
    }
  };
};

function Dashboard() {
  return;
}

export default Dashboard;
