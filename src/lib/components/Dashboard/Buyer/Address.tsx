import { Card, Text, Badge, Button, Group } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

function Address({}) {
  return (
    <div className="p-8">
      <h2 className="font-semibold text-4xl mb-7">Address Book</h2>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="w-64 h-56 border-dashed border-2 border-brown-200 rounded-xl flex items-center justify-center text-brown-600">
          <Button
            leftIcon={<IconPlus size="15px" />}
            variant="subtle"
            mt="md"
            radius="md"
            // className="w-4/5 "
          >
            Add Address
          </Button>
        </div>

        <div className="w-64">
          <Card p="lg" radius="md" withBorder>
            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>119 New York</Text>
              <Badge variant="light">default</Badge>
            </Group>

            <Text size="sm" color="dimmed">
              469 Linden Drive Twin Falls
            </Text>

            <Text size="sm" color="dimmed">
              10512
            </Text>

            <Text size="sm" color="dimmed">
              New York
            </Text>

            <Text size="sm" color="dimmed">
              United States
            </Text>

            <Button variant="light" fullWidth mt="md" radius="md">
              Edit
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Address;
