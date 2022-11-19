import { Timeline, Text, Title } from '@mantine/core';
import {
  IconLoader,
  IconPackage,
  IconTruck,
  IconPackgeExport,
  IconHeartHandshake
} from '@tabler/icons';

type OrderTimelineProps = {
  orderStatus:
    | 'OUTOFSTOCK'
    | 'USERCANCELLED'
    | 'SELLERCANCELLED'
    | 'PROCESSING'
    | 'PACKED'
    | 'SHIPPED'
    | 'OUTFORDELIVERY'
    | 'DELIVERED';
  paymentStatus?: 'PENDING' | 'SUCCESS' | 'FAILED';
  sellerName: string;
};

export function OrderTimeline({ orderStatus, paymentStatus, sellerName }: OrderTimelineProps) {
  return (
    <div className="bg-white p-10 rounded-lg">
      <Title order={2} weight={300} color="dark">
        Order Tracker
      </Title>
      <Timeline active={1} bulletSize={24} lineWidth={2} mt={15}>
        <Timeline.Item bullet={<IconLoader size={12} />} title="Processing">
          <Text color="dimmed" size="sm">
            Zavy is processing your order
          </Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconPackage size={12} />} title="Packed">
          <Text color="dimmed" size="sm">
            Seller has packed your order
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Shipped" bullet={<IconPackgeExport size={12} />} lineVariant="dashed">
          <Text color="dimmed" size="sm">
            Seller has successfully shipped your order
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Out For Delivery" bullet={<IconTruck size={12} />}>
          <Text color="dimmed" size="sm">
            Your order is out for delivery
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Delivered!" bullet={<IconHeartHandshake size={12} />}>
          <Text color="dimmed" size="sm">
            Your order has been delivered successfully
          </Text>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
