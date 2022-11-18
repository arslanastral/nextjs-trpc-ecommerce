import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  ActionIcon,
  Avatar,
  Text,
  LoadingOverlay
} from '@mantine/core';
import { trpc } from '@/utils/trpc';
import { IconTrash } from '@tabler/icons';
import { ItemInfo } from './ItemInfo';
import { ItemInfoProps } from './ItemInfo';
import { memo, useState } from 'react';
import { CartQuantityInput } from './CartQuantityInput';

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0]
  }
}));

interface ItemRowProps {
  toggleRow: (id: number, selected: boolean) => void;
  id: number;
  price: string;
  selected: boolean;
}

type ItemProps = ItemInfoProps & ItemRowProps;

export const Item = memo(
  ({
    id,
    toggleRow,
    title,
    image,
    selected,
    price,
    quantity,
    stock,
    storeName,
    productId
  }: ItemProps) => {
    const { classes, cx } = useStyles();
    const current = trpc.useContext();
    const deleteItem = trpc.cart.deleteItem.useMutation();

    const handleItemDelete = async () => {
      deleteItem.mutate(
        { id },
        {
          onSuccess: invalidateData
        }
      );
    };

    const invalidateData = () => {
      if (selected) {
        current.cart.getCartItemsPrice.invalidate();
      }
      current.cart.getItemCount.invalidate();
      current.cart.getCartItems.invalidate();
    };

    return (
      <tr className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selected}
            onChange={() => toggleRow(id, selected)}
            transitionDuration={0}
          />
        </td>
        <td>
          {/* <Group spacing="sm"> */}
          <ItemInfo
            image={image}
            title={title}
            quantity={quantity ?? 1}
            stock={stock}
            storeName={storeName}
            productId={productId}
          />
          {/* </Group> */}
        </td>
        <td>
          <Text size="lg">${price}</Text>
        </td>
        <td>
          <Group spacing={10} position="right">
            <LoadingOverlay visible={deleteItem.isLoading} overlayBlur={2} />
            <ActionIcon onClick={handleItemDelete} color="red" m={20} size="lg">
              <IconTrash size={22} stroke={1.5} />
            </ActionIcon>
            <div className="max-w-[130px]">
              <CartQuantityInput
                value={quantity}
                id={id}
                selectedRow={selected}
                productId={productId}
                max={stock}
              />
            </div>
          </Group>
        </td>
      </tr>
    );
  }
);

Item.displayName = 'Item';
