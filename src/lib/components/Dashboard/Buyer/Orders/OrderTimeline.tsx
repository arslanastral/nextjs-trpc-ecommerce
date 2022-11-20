import { Timeline, Text, Title } from '@mantine/core';
import {
  IconLoader,
  IconPackage,
  IconTruck,
  IconPackgeExport,
  IconHeartHandshake,
  IconAlertTriangle,
  IconCircleX
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
  sellerName?: string;
  title?: string;
};

export function OrderTimeline({
  title = 'Track Order',
  orderStatus,
  paymentStatus,
  sellerName = 'Seller'
}: OrderTimelineProps) {
  let status = {
    OUTOFSTOCK: 0,
    USERCANCELLED: 0,
    SELLERCANCELLED: 0,
    PROCESSING: 0,
    PACKED: 1,
    SHIPPED: 2,
    OUTFORDELIVERY: 3,
    DELIVERED: 4
  };

  let processingInfo = {
    PENDING: 'Awaiting order payment',
    SUCCESS: `${sellerName} is processing your order`,
    FAILED: 'Awaiting order payment'
  };

  let processingIcon = {
    SUCCESS: <IconLoader size={12} />,
    PENDING: <IconAlertTriangle size={12} />,
    FAILED: <IconCircleX size={12} />
  };

  let processingColor = {
    SUCCESS: '',
    PENDING: 'orange',
    FAILED: 'red'
  };

  let processingTitle = {
    SUCCESS: 'Processing',
    PENDING: 'Pending Payment',
    FAILED: 'Pending Failed'
  };

  return (
    <div className="bg-white p-4 lg:p-10 rounded-lg">
      <Title order={2} weight={300} color="dark">
        {title}
      </Title>
      <Timeline
        active={status[orderStatus]}
        bulletSize={24}
        lineWidth={2}
        mt={15}
        color={paymentStatus && processingColor[paymentStatus]}
      >
        <Timeline.Item
          bullet={paymentStatus && processingIcon[paymentStatus]}
          title={paymentStatus && processingTitle[paymentStatus]}
          lineVariant={status[orderStatus] === 0 ? 'dashed' : 'solid'}
        >
          <Text color="dimmed" size="sm">
            {paymentStatus && processingInfo[paymentStatus]}
          </Text>
        </Timeline.Item>

        <Timeline.Item
          bullet={<IconPackage size={12} />}
          title="Packed"
          lineVariant={status[orderStatus] === 1 ? 'dashed' : 'solid'}
        >
          <Text color="dimmed" size="sm">
            Seller has packed your order
          </Text>
        </Timeline.Item>

        <Timeline.Item
          title="Shipped"
          bullet={<IconPackgeExport size={12} />}
          lineVariant={status[orderStatus] === 2 ? 'dashed' : 'solid'}
        >
          <Text color="dimmed" size="sm">
            Seller has successfully shipped your order
          </Text>
        </Timeline.Item>

        <Timeline.Item
          title="Out For Delivery"
          bullet={<IconTruck size={12} />}
          lineVariant={status[orderStatus] === 3 ? 'dashed' : 'solid'}
        >
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
