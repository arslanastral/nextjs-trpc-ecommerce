import { ProductWithId } from '@/server/schema';
import { Skeleton, Button, Card, Group, Text, Badge, AspectRatio } from '@mantine/core';
import Image from 'next/image';
import { useState } from 'react';

type ProductCardProps = {
  id: string;
  title: string;
  image: string;
  description: string;
  price: string;
  status?: string;
  badge?: string;
};

function ProductCard({ id, title, image, description, price, status, badge }: ProductCardProps) {
  const [loading, setLoading] = useState<boolean>(true);

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
          <Text
            className="whitespace-nowrap"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
            weight={500}
          >
            {title}
          </Text>
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
            className="whitespace-nowrap w-48"
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

        <Button onClick={() => console.log('Added To Cart')} fullWidth mt="md" radius="md">
          Add To Cart
        </Button>
      </Card>
    </div>
  );
}

export default ProductCard;
