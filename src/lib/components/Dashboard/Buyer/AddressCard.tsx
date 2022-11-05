import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { Address, AddressWithId } from '@/server/schema';

type AddressCardProps = AddressWithId & {
  openEditModal: () => void;
  setEditableaddress: (state: AddressWithId) => void;
};

function AddressCard({
  isDefault,
  id,
  addressLine1,
  city,
  postalCode,
  region,
  country,
  openEditModal,
  setEditableaddress
}: AddressCardProps) {
  const handleEditModal = () => {
    let address = {
      isDefault,
      id,
      addressLine1,
      city,
      postalCode,
      region,
      country
    };

    setEditableaddress(address);
    openEditModal();
  };

  return (
    <div className="w-64">
      <Card p="lg" radius="md" withBorder>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{city}</Text>
          {isDefault && <Badge variant="light">default</Badge>}
        </Group>

        <Text size="sm" color="dimmed">
          {addressLine1}
        </Text>

        <Text size="sm" color="dimmed">
          {postalCode}
        </Text>

        <Text size="sm" color="dimmed">
          {city}
        </Text>

        <Text size="sm" color="dimmed">
          {country}
        </Text>

        <Button onClick={handleEditModal} variant="light" fullWidth mt="md" radius="md">
          Edit
        </Button>
      </Card>
    </div>
  );
}

export default AddressCard;
