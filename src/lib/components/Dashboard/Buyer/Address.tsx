import { Skeleton, Modal, Button, Input, Grid, Checkbox } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { trpc } from '@/utils/trpc';
import AddressCard from './AddressCard';
import { useState } from 'react';
import { Address } from '@/server/schema';

function Address() {
  const [opened, setOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>();
  const addresses = trpc.address.list.useQuery();
  const createBuyerAddress = trpc.address.create.useMutation();

  // const handleAddressCreation = async () => {
  //   createBuyerAddress.mutate(newAddress);
  // };

  return (
    <div className="p-8">
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Address">
        <Input.Wrapper label="Shipping Address" required>
          <Input placeholder="934 Hogwart 21st" />
        </Input.Wrapper>

        <Grid>
          <Grid.Col span={6}>
            {' '}
            <Input.Wrapper label="City" required mt={15}>
              <Input placeholder="City" />
            </Input.Wrapper>
          </Grid.Col>
          <Grid.Col span={6}>
            {' '}
            <Input.Wrapper label="Postal Code" required mt={15}>
              <Input placeholder="Postal Code" />
            </Input.Wrapper>
          </Grid.Col>
        </Grid>

        <Input.Wrapper label="Region/State" required mt={15}>
          <Input placeholder="Region/State" />
        </Input.Wrapper>

        <Input.Wrapper label="Country" required mt={15}>
          <Input placeholder="Country" />
        </Input.Wrapper>

        <Checkbox
          checked={checked}
          onChange={(event) => setChecked(event.currentTarget.checked)}
          label="Set as default address"
          mt={15}
        />

        <Button mt="md" radius="md">
          Create
        </Button>
      </Modal>
      <h2 className="font-semibold text-4xl mb-7">Address Book</h2>

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
          <div className="w-64 mt-7">
            <Skeleton height={10} mt={7} width="40%" radius="xl" />
            <Skeleton height={10} mt={7} radius="xl" />
            <Skeleton height={10} mt={7} radius="xl" />
            <Skeleton height={10} mt={7} width="70%" radius="xl" />
          </div>
        )}

        {addresses.data?.map((e, i) => {
          return (
            <AddressCard
              key={i}
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
