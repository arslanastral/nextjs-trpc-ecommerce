import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5]
  }
}));

export interface ItemInfoProps {
  image: string;
  title: string;
  quantity: number;
  stock?: string;
}

export function ItemInfo({ image, title, quantity, stock }: ItemInfoProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group noWrap>
        <Avatar src={image} size={94} radius="md" />
        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            Free Shipping
          </Text>

          <Text size="lg" weight={500}>
            {title}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <Text size="md" color="dimmed">
              x{quantity}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <IconAlertCircle stroke={1.5} size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              1 Item Left
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}
