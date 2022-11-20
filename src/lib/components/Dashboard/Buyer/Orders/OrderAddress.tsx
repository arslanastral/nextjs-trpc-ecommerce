import { Title, Card, Group, Badge, Text } from '@mantine/core';
import { type OrderAddressType } from './Order';

function OrderAddress({ address }: OrderAddressType) {
  return (
    <div className="flex flex-col flex-1 p-4 lg:p-10 rounded-lg bg-white">
      <Title order={2} weight={300} color="dark">
        Shipping Address
      </Title>
      <div className=" rounded-lg mt-4">
        <Card p="lg" radius="md" withBorder>
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{address?.city}</Text>
            {address?.isDefault && <Badge variant="light">default</Badge>}
          </Group>

          <Text size="sm" color="dimmed">
            {address?.addressLine1}
          </Text>

          <Text size="sm" color="dimmed">
            {address?.postalCode}
          </Text>

          <Text size="sm" color="dimmed">
            {address?.city}
          </Text>

          <Text size="sm" color="dimmed">
            {address?.country}
          </Text>
        </Card>
      </div>
    </div>
  );
}

export default OrderAddress;
