// import { unstable_getServerSession } from 'next-auth';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  // const { req, res } = ctx;
  // const session = await unstable_getServerSession(req, res, authOptions);

  // if (!session) {
  //   return {
  //     redirect: {
  //       source: '/dashboard/:*',
  //       destination: '/login',
  //       permanent: false
  //     }
  //   };
  // }

  return {
    redirect: {
      destination: '/dashboard/buyer',
      permanent: false
    }
  };
};

function Dashboard() {
  return;
}

export default Dashboard;
