import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons';

function MyProducts() {
  return (
    <div className="p-8">
      <h2 className="font-semibold text-4xl mb-7">My Products</h2>
      <div className="w-64 h-72 border-dashed border-2 border-brown-200 rounded-xl flex items-center justify-center text-brown-600">
        <Button leftIcon={<IconPlus size="15px" />} variant="outline" mt="md" radius="md">
          New Product
        </Button>
      </div>
    </div>
  );
}

export default MyProducts;
