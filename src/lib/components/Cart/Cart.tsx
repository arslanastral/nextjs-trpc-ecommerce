import { trpc } from '@/utils/trpc';
import { Button, Text, Skeleton, Loader, Title } from '@mantine/core';
import { ItemsSelect } from './ItemsSelect';
import Link from 'next/link';
import PricePreview from './PricePreview';

function Cart() {
  const { data, isLoading, error } = trpc.cart.getCartItems.useQuery();
  const price = trpc.cart.getCartItemsPrice.useQuery();

  return (
    <div className="w-full flex justify-center">
      {!data?.length && !isLoading && (
        <div className="w-[max(92%,1400px)] flex justify-center bg-white rounded-lg">
          <div className="flex flex-col gap-4 max-w-[300px] min-h-[500px] justify-center">
            <Title order={2} color="dark" weight={300}>
              Your Cart is Empty
            </Title>
            <Button component={Link} href="/" radius="md" className="h-[45px] font-light text-lg">
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
      {data?.length && !isLoading && (
        <div className="w-[max(92%,1400px)] ">
          <Title order={1} color="dark">
            My Cart
          </Title>
          <div className="mt-8 min-h-[600px] rounded flex gap-6 flex-col lg:flex-row">
            <div className="bg-white text-white flex-1 rounded-lg">
              {data && <ItemsSelect data={data} />}
            </div>
            <div className="bg-white text-white min-w-[300px] rounded-lg flex flex-col justify-between p-4 max-h-[300px]">
              <div className="text-black w-full">
                <PricePreview price={price.data ?? '0'} />
              </div>

              <Button
                component={Link}
                href="/checkout"
                fullWidth
                radius="md"
                className="h-[45px] font-light text-lg"
              >
                Proceed To Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
