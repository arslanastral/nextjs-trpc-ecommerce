import { Skeleton, Modal, Button, Input, Grid, Checkbox } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
import AddressCard from './AddressCard';
import { type Address } from '@/server/schema';
import AddressModal from './AddressModal';

function Address() {
  const addresses = trpc.address.list.useQuery();
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className="p-8">
      <h2 className="font-semibold text-4xl mb-7">Address Book</h2>
      <AddressModal opened={opened} setOpened={setOpened} />
      <div className="flex gap-4 items-center flex-wrap">
        {!addresses.isLoading && (
          <div className="w-64 h-56 border-dashed border-2 border-brown-200 rounded-xl flex items-center justify-center text-brown-600">
            <Button
              onClick={() => setOpened(true)}
              leftIcon={<IconPlus size="15px" />}
              variant="subtle"
              mt="md"
              radius="md"
            >
              Add Address
            </Button>
          </div>
        )}

        {!addresses.data && (
          <div className="w-full">
            <Skeleton height={10} mt={20} width="40%" radius="xl" />
            <Skeleton height={10} mt={20} radius="xl" />
            <Skeleton height={10} mt={20} radius="xl" />
            <Skeleton height={10} mt={20} width="70%" radius="xl" />
          </div>
        )}

        {addresses.data?.map((e, i) => {
          return (
            <AddressCard
              key={i}
              isDefault={e.isDefault}
              addressLine1={e.addressLine1}
              city={e.city}
              country={e.country}
              postalCode={e.postalCode}
              region={e.region}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Address;
