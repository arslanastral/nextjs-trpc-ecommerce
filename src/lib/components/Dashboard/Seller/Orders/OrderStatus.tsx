import { useState } from 'react';
import { createStyles, UnstyledButton, Menu, Image, Group } from '@mantine/core';
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

//   'OUTOFSTOCK'
//   | 'USERCANCELLED'
//   | 'SELLERCANCELLED'
//   | 'PROCESSING'
//   | 'PACKED'
//   | 'SHIPPED'
//   | 'OUTFORDELIVERY'
//   | 'DELIVERED';

const status = [
  { label: 'Processing', value: 'PROCESSING', icon: <IconLoader /> },
  { label: 'Packed', value: 'PACKED', icon: <IconPackage /> },
  { label: 'Shipped', value: 'SHIPPED', icon: <IconPackgeExport /> },
  { label: 'Out For Delivery', value: 'OUTFORDELIVERY', icon: <IconTruck /> },
  { label: 'Delivered', value: 'DELIVERED', icon: <IconHeartHandshake /> }
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

export function OrderStatus() {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const [selected, setSelected] = useState(status[0]);
  const items = status.map((status) => (
    <Menu.Item icon={status.icon} onClick={() => setSelected(status)} key={status.label}>
      {status.label}
    </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            {selected.icon}
            <span className={classes.label}>{selected.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}
