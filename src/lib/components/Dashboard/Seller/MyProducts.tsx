import { Button, Skeleton } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import EditProductModal from './EditProductModal';
import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import { ProductWithId } from '@/server/schema';

function MyProducts() {
  const productList = trpc.product.list.useQuery();
  const [opened, setOpened] = useState<boolean>(false);
  const [editableProduct, setEditableProduct] = useState<ProductWithId>();
  const [openProductModal, setOpenProductModal] = useState<boolean>(false);

  return (
    <div className="p-8">
      <h2 className="font-semibold text-4xl mb-7">My Products</h2>
      <ProductModal opened={opened} setOpened={setOpened} />
      <EditProductModal
        opened={openProductModal}
        setOpened={setOpenProductModal}
        data={editableProduct}
      />
      <div className="flex gap-8 items-center flex-wrap">
        {!productList.isLoading && (
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
        )}

        {!productList.data && (
          <div className="w-full">
            <Skeleton height={10} mt={20} width="40%" radius="xl" />
            <Skeleton height={10} mt={20} radius="xl" />
            <Skeleton height={10} mt={20} radius="xl" />
            <Skeleton height={10} mt={20} width="70%" radius="xl" />
          </div>
        )}

        {productList.data?.map((e, i) => {
          console.log(`https://res.cloudinary.com/dv9wpbflv/image/upload/v${e.image}.jpg`);
          return (
            <ProductCard
              key={i}
              id={e.id}
              title={e.title}
              description={e.description}
              price={(+e.priceInCents / 100).toString()}
              status="In Stock"
              image={`https://res.cloudinary.com/dv9wpbflv/image/upload/v${e.image}.jpg`}
              category={e.category[0].id.toString()}
              openEditModal={() => setOpenProductModal(true)}
              setEditableProduct={setEditableProduct}
              imageId={e.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MyProducts;
