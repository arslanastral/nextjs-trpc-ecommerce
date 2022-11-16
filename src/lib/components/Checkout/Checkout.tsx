import { trpc } from '@/utils/trpc';
import { Button, Text, Skeleton, Loader, Title, Table } from '@mantine/core';
import Link from 'next/link';
import { useState } from 'react';
import CheckoutAddress from './CheckoutAddress';
import CheckoutItems from './CheckoutItems';

function Checkout() {
  const { data, isLoading, error } = trpc.cart.getSelectedCartItems.useQuery();
  const [addressId, setAddressId] = useState<string>('');
  const price = trpc.cart.getCartItemsPrice.useQuery();

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
        <div className="w-[max(92%,1400px)] ">
          <Title order={1} color="dark">
            Checkout
          </Title>

          <div className="mt-8 min-h-[600px] rounded flex gap-6 flex-col lg:flex-row">
            <div className="bg-white text-black p-6 flex-1 rounded-lg flex gap-10">
              <CheckoutItems data={data} />
              <CheckoutAddress setAddressId={setAddressId} addressId={addressId} />
            </div>
            <div className="bg-white text-white min-w-[300px] rounded-lg flex flex-col justify-between p-4 max-h-[300px]">
              <div className="text-black w-full ">
                <Table fontSize="lg">
                  <tbody>
                    <tr>
                      <td className="text-left">Subtotal</td>
                      <td className="text-right">${price.data}</td>
                    </tr>
                    <tr>
                      <td className="text-left">Shipping</td>
                      <td className="text-right font-medium">FREE</td>
                    </tr>
                    <tr>
                      <td className="text-left font-semibold">Total</td>

                      <td className="text-right font-semibold">${price.data}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <Button fullWidth radius="md" className="h-[45px] font-light text-lg">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
