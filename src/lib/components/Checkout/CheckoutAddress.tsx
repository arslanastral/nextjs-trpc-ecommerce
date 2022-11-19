import { trpc } from '@/utils/trpc';
import { Title, Button, SimpleGrid, ScrollArea, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useState, useCallback, useEffect } from 'react';
import AddressModal from '../Dashboard/Buyer/AddressModal';
import { AddressCheckbox } from './AddressCheckbox';

type CheckoutAddressProps = {
  setAddressId: (id: string) => void;
  addressId: string;
};

function CheckoutAddress({ setAddressId, addressId }: CheckoutAddressProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const { data, isLoading, error } = trpc.address.list.useQuery();

  const handleAddressSelect = useCallback(
    (id: string) => {
      if (addressId === id) {
        return;
      }
      setAddressId(id);
    },
    [setAddressId, addressId]
  );

  useEffect(() => {
    if (data?.length && !addressId) {
      handleAddressSelect(data[0].id);
    }
  }, [data, handleAddressSelect, addressId]);

  return (
    <div className="flex flex-col p-6 flex-1">
      <AddressModal opened={opened} setOpened={setOpened} />
      <Title order={2} color="dark">
        Shipping Address
      </Title>
      <Title order={4} color="dark" weight={300} mt={4}>
        {data?.length ? (
          'Select an address or add a new one'
        ) : (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Forgetting Address?"
            color="red"
            mt={15}
          >
            No Addresses found. Please add a shipping address for your items.
          </Alert>
        )}
      </Title>
      <div className="mt-4">
        <ScrollArea style={{ maxHeight: 240 }}>
          <SimpleGrid spacing="lg" cols={1}>
            {data &&
              data
                .sort((a, b) => (a.isDefault ? -1 : 1))
                .map((item) => {
                  const checked = addressId === item.id;
                  return (
                    <AddressCheckbox
                      isDefault={item.isDefault}
                      city={item.city}
                      addressLine1={item.addressLine1}
                      key={item.id}
                      checked={checked}
                      onChange={() => handleAddressSelect(item.id)}
                    />
                  );
                })}
          </SimpleGrid>
        </ScrollArea>

        <Button
          onClick={() => setOpened(true)}
          fullWidth
          radius="md"
          variant="outline"
          className="h-[45px] text-md"
          mt={14}
        >
          + Add New Address
        </Button>
      </div>
    </div>
  );
}

export default CheckoutAddress;
