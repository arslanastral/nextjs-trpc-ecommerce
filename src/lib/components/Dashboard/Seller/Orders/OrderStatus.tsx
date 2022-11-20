import { useState } from 'react';
import { createStyles, UnstyledButton, Menu, Group, Loader } from '@mantine/core';
import { trpc } from '@/utils/trpc';
import { IconChevronDown } from '@tabler/icons';
import {
  IconLoader,
  IconPackage,
  IconTruck,
  IconPackgeExport,
  IconHeartHandshake,
  IconAlertTriangle,
  IconCircleX
} from '@tabler/icons';
import { StatusUpdateInput } from '@/server/schema';

const status = [
  {
    label: 'Processing',
    value: 'PROCESSING' as StatusUpdateInput['orderStatus'],
    icon: <IconLoader />
  },
  { label: 'Packed', value: 'PACKED' as StatusUpdateInput['orderStatus'], icon: <IconPackage /> },
  {
    label: 'Shipped',
    value: 'SHIPPED' as StatusUpdateInput['orderStatus'],
    icon: <IconPackgeExport />
  },
  {
    label: 'Out For Delivery',
    value: 'OUTFORDELIVERY' as StatusUpdateInput['orderStatus'],
    icon: <IconTruck />
  },
  {
    label: 'Delivered',
    value: 'DELIVERED' as StatusUpdateInput['orderStatus'],
    icon: <IconHeartHandshake />
  }
];

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: 200,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0]
    }
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)'
  }
}));

export function OrderStatus({ id, orderStatus }: { id: string; orderStatus: string }) {
  const current = trpc.useContext();
  const buyerOrderStatus = trpc.order.setBuyerOrderStatus.useMutation();
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(
    status[status.findIndex((status) => status.value === orderStatus)]
  );
  const items = status.map((status) => (
    <Menu.Item
      icon={status.icon}
      onClick={() => handlebuyerOrderStatus(status.value)}
      key={status.label}
    >
      {status.label}
    </Menu.Item>
  ));

  const handlebuyerOrderStatus = async (orderStatus: StatusUpdateInput['orderStatus']) => {
    if (status && id) {
      buyerOrderStatus.mutate(
        { id, orderStatus },
        {
          onSuccess: (id) => {
            if (id) {
              current.order.getSellerOrderById.invalidate({ id });
            } else {
              current.order.getSellerOrderById.invalidate();
            }
            setSelected(status[status.findIndex((status) => status.value === orderStatus)]);
          }
        }
      );
    }
  };

  return (
    <div className="flex items-center gap-4">
      {buyerOrderStatus.isLoading && <Loader variant="dots" />}
      <Menu
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
        radius="md"
        width="target"
      >
        <Menu.Target>
          <UnstyledButton
            className={`${classes.control} ${
              buyerOrderStatus.isLoading && 'text-slate-500 cursor-not-allowed'
            }`}
            disabled={buyerOrderStatus.isLoading}
          >
            <Group spacing="xs">
              {selected.icon}
              <span className={classes.label}>{selected.label}</span>
            </Group>
            <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>{items}</Menu.Dropdown>
      </Menu>
    </div>
  );
}
