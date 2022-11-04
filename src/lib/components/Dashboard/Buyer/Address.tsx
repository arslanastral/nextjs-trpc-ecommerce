import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { trpc } from '@/utils/trpc';
import { Skeleton } from '@mantine/core';
import AddressCard from './AddressCard';

function Address() {
  const addresses = trpc.address.list.useQuery();

  return (
    <div className="p-8">
      <h2 className="font-semibold text-4xl mb-7">Address Book</h2>

      <div className="flex gap-4 items-center flex-wrap">
        {!addresses.isLoading && (
          <div className="w-64 h-56 border-dashed border-2 border-brown-200 rounded-xl flex items-center justify-center text-brown-600">
            <Button
              disabled={true}
              // onClick={createAddress}
              leftIcon={<IconPlus size="15px" />}
              variant="subtle"
              mt="md"
              radius="md"
              // className="w-4/5 "
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
      </div>
    </div>
  );
}

export default Address;
