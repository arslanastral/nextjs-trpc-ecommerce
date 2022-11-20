import { ProductWithId } from '@/server/schema';
import { Skeleton, Button, Card, Group, Text, Badge, AspectRatio } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type ProductCardProps = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: string;
  category: string;
  badge?: string;
  imageId: string;
  stock: number;
  openEditModal: () => void;
  setEditableProduct: (state: ProductWithId) => void;
};

function ProductCard({
  id,
  title,
  image,
  description,
  category,
  price,
  badge,
  stock,
  openEditModal,
  setEditableProduct,
  imageId
}: ProductCardProps) {
  const handleEditModal = () => {
    let product = {
      id,
      title,
      image,
      description,
      price: +price,
      category,
      imageId,
      stock
    };

    setEditableProduct(product);
    openEditModal();
  };
  const [loading, setLoading] = useState<boolean>(true);

  let status;

  switch (true) {
    case stock < 10:
      status = `${stock} ${stock === 1 ? 'Item' : 'Items'} Left`;
      break;
    case stock === 0:
      status = `Out Of Stock`;
      break;
    default:
      status = `${stock} In Stock`;
  }

  return (
    <div className="w-[337px]">
      <Card p="lg" radius="md" withBorder className="relative">
        <Card.Section>
          {badge && (
            <Badge className="absolute top-2 left-3 z-40 bg-black text-white">{badge}</Badge>
          )}

          <AspectRatio ratio={337 / 393} sx={{ maxWidth: '100%' }} className="relative">
            <Skeleton visible={loading} radius={0}>
              <Image fill={true} src={image} alt="Product Image" onLoad={() => setLoading(false)} />
            </Skeleton>
          </AspectRatio>
        </Card.Section>
        <Group position="apart" mt="md" mb="xs">
          <Link href={`/products/${id}`}>
            <Text
              className="whitespace-nowrap"
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
              weight={500}
            >
              {title}
            </Text>
          </Link>
        </Group>

        <Text
          className="whitespace-nowrap"
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          size="sm"
          color="dimmed"
        >
          {description}
        </Text>

        <Group position="apart" mt="md" mb="xs">
          <Text
            className="whitespace-nowrap w-32"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
            size={20}
            weight={500}
          >
            US ${price}
          </Text>
          <Badge variant="light" color="green">
            {status}
          </Badge>
        </Group>

        <Button
          onClick={() => handleEditModal()}
          fullWidth
          mt="md"
          radius="md"
          className="h-[45px] font-light text-lg"
        >
          Edit
        </Button>
      </Card>
    </div>
  );
}

export default ProductCard;
