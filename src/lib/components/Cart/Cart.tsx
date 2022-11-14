import { Button, Text, Skeleton, Loader, Title } from '@mantine/core';

function Cart() {
  return (
    <div className="p-6 ">
      <Title order={1} color="dark">
        My Cart
      </Title>
      <div className="bg-white mt-8 min-h-[600px] rounded flex gap-6">
        <div className="bg-slate-100 text-black flex-1">Items</div>
        <div className="bg-black text-white min-w-[300px]">Checkout</div>
      </div>
    </div>
  );
}

export default Cart;
