import { trpc } from '@/utils/trpc';
import { type AppRouter } from '@/server/routers/_app';

function Welcome() {
  const hello = trpc.hello.useQuery<AppRouter>({ text: '🔥' });

  return <>{hello.data && <h2 className="text-black">{hello.data?.greeting}</h2>}</>;
}

export default Welcome;
