import { Text, Title } from '@mantine/core';
import { IconBox } from '@tabler/icons';
import { trpc } from '@/utils/trpc';

function Orders() {
  return (
    <div className="p-8">
      <Title order={1}>My Orders</Title>
    </div>
  );
}

export default Orders;
