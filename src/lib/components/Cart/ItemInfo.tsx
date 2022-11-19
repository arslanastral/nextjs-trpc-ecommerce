import { createStyles, Avatar, Text, Group, Indicator } from '@mantine/core';
import { IconAlertCircle, IconTag } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5]
  }
}));

export interface ItemInfoProps {
  storeName?: string;
  image: string;
  title: string;
  quantity: number;
  stock?: number;
  price?: string;
  isForCheckout?: boolean;
  productId: string;
}

export function ItemInfo({
  image,
  title,
  quantity,
  stock,
  storeName,
  price,
  productId,
  isForCheckout = false
}: ItemInfoProps) {
  const { classes } = useStyles();
  return (
    <div>
      <Group>
        <Indicator label={quantity} disabled={!isForCheckout} inline size={22}>
          <Avatar
            src={`https://res.cloudinary.com/dv9wpbflv/image/upload/w_100,f_auto,q_auto/v${image}.jpg`}
            size={94}
            radius="md"
          />
        </Indicator>

        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {storeName}
          </Text>

          <Link href={`${process.env.NEXT_PUBLIC_CURRENT_URL}products/${productId}`}>
            <Text size="lg" weight={500}>
              {title}
            </Text>
          </Link>

          {!isForCheckout && (
            <Group noWrap spacing={10} mt={3}>
              <Text size="md" color="dimmed">
                x{quantity}
              </Text>
            </Group>
          )}

          <Group noWrap spacing={10} mt={5}>
            {price && (
              <>
                <IconTag stroke={1.5} size={16} className={classes.icon} />
                <Text size="sm" color="dimmed">
                  ${price}
                </Text>
              </>
            )}

            {stock && (
              <>
                <IconAlertCircle stroke={1.5} size={16} className={classes.icon} />
                <Text size="sm" color="dimmed">
                  {stock} Item Left
                </Text>
              </>
            )}
          </Group>
        </div>
      </Group>
    </div>
  );
}
