import { Button, Card, Group, Text, Image, Badge } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { useState } from 'react';

function MyProducts() {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <div className="p-8">
      <h2 className="font-semibold text-4xl mb-7">My Products</h2>
      <ProductModal opened={opened} setOpened={setOpened} data={''} />
      <div className="flex gap-8 items-center flex-wrap">
        <div className="w-[337px] h-[583px] border-dashed border-2 border-brown-200 rounded-xl flex items-center justify-center text-brown-600">
          <Button
            onClick={() => setOpened(true)}
            leftIcon={<IconPlus size="15px" />}
            variant="outline"
            mt="md"
            radius="md"
          >
            New Product
          </Button>
        </div>

        <ProductCard
          title="Blue dress with silk cotten and smooth"
          description="Blue floral dress with beach vibes"
          price="20"
          status="sold out"
          image="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />

        <ProductCard
          title="Blue dress with silk cotten and smooth"
          description="Blue floral dress with beach vibes"
          price="20"
          status="sold out"
          badge="new"
          image="https://images.unsplash.com/photo-1612722432474-b971cdcea546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
        />
      </div>
    </div>
  );
}

export default MyProducts;
