import { Button, Text, Skeleton, Loader, Title } from '@mantine/core';

function Cart() {
  return (
    <div className="w-full flex justify-center">
      <div className="min-w-[1400px] max-w-full">
        <Title order={1} color="dark">
          My Cart
        </Title>
        <div className="mt-8 min-h-[600px] rounded flex gap-6">
          <div className="bg-white text-white flex-1 rounded-lg">Items</div>
          <div className="bg-white text-white min-w-[300px]  rounded-lg">Checkout</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
