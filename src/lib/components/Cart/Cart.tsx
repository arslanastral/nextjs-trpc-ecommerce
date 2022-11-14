import { Button, Text, Skeleton, Loader, Title, Table } from '@mantine/core';

function Cart() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[max(92%,1400px)] ">
        <Title order={1} color="dark">
          My Cart
        </Title>
        <div className="mt-8 min-h-[600px] rounded flex gap-6">
          <div className="bg-white text-white flex-1 rounded-lg">Items</div>
          <div className="bg-white text-white min-w-[300px] rounded-lg flex flex-col justify-between p-4">
            <div className="text-black w-full  min-h-[300px] ">
              <Table fontSize="lg">
                <tbody>
                  <tr>
                    <td className="text-left">Subtotal</td>
                    <td className="text-right">$0.00</td>
                  </tr>
                  <tr>
                    <td className="text-left">Shipping</td>
                    <td className="text-right font-medium">FREE</td>
                  </tr>
                  <tr>
                    <td className="text-left font-semibold">Total</td>
                    <td className="text-right font-semibold">$0</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <Button fullWidth radius="md" className="h-[45px] font-light text-lg">
              Proceed To Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
