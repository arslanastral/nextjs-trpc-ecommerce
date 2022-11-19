import { trpc } from '@/utils/trpc';
import { Button, Text, Skeleton, Loader, Title, Badge, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import Link from 'next/link';
import { useState } from 'react';
import PricePreview from '../Cart/PricePreview';
import CheckoutAddress from './CheckoutAddress';
import CheckoutItems from './CheckoutItems';

function Checkout() {
  const { data, isLoading, error } = trpc.cart.getSelectedCartItems.useQuery();
  const placeOrder = trpc.order.placeOrder.useMutation();
  const [addressId, setAddressId] = useState<string>('');
  const price = trpc.cart.getCartItemsPrice.useQuery();
  const [orderError, setOrderError] = useState<boolean>(false);

  const handleOrder = async () => {
    setOrderError(false);
    if (addressId) {
      placeOrder.mutate(
        { addressId },
        {
          onSuccess: (data) => {
            if (data) window.location.href = data;
          },
          onError: () => setOrderError(true)
        }
      );
    }
  };

  return (
    <div className="w-full flex justify-center">
      {!data?.length && !isLoading && (
        <div className="w-[max(92%,1400px)] flex justify-center bg-white rounded-lg">
          <div className="flex flex-col gap-4 max-w-[300px] min-h-[500px] justify-center">
            <Title order={2} color="dark" weight={300}>
              You haven&apos;t selected anything from your cart
            </Title>
            <Button
              component={Link}
              href="/cart"
              radius="md"
              className="h-[45px] font-light text-lg"
            >
              Go To Cart
            </Button>
          </div>
        </div>
      )}
      {data?.length && !isLoading && (
        <div className="w-full lg:w-[max(92%,1400px)] ">
          <Title order={1} color="dark">
            Checkout
          </Title>
          {orderError && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Something Went Wrong"
              color="red"
              mt={15}
            >
              We weren&apos;t able to place your order. Please try again later.
            </Alert>
          )}

          <div className="mt-8 min-h-[600px] rounded flex gap-4 flex-col lg:flex-row">
            <div className="text-black bg-white flex-1 flex gap-4 rounded-lg flex-col">
              <CheckoutItems data={data} />
              <CheckoutAddress setAddressId={setAddressId} addressId={addressId} />
            </div>
            <div className=" text-white rounded-lg flex flex-col justify-between max-h-[500px] gap-4">
              <div className="text-black w-full bg-white p-6 rounded-lg">
                <Title order={2} color="dark" className="flex items-center gap-3">
                  Payment <Badge color="green">Secure</Badge>
                </Title>
                <Title order={4} color="dark" weight={300} mt={4}>
                  Payments processed by stripe
                </Title>
              </div>
              <div className="text-black w-full bg-white flex-1 p-4 flex flex-col justify-between rounded-lg">
                <PricePreview price={price.data ?? '0'} />
                <Button
                  leftIcon={placeOrder.isLoading ? <Loader color="white" size="sm" /> : ''}
                  onClick={handleOrder}
                  fullWidth
                  radius="md"
                  className="h-[45px] font-light text-lg"
                >
                  {placeOrder.isLoading ? 'Creating Order' : 'Place Order'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
