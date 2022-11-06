import { Button, Card, Group, Text, Badge, AspectRatio } from '@mantine/core';
import Image from 'next/image';

type ProductCardProps = {
  title: string;
  image: string;
  description: string;
  price: string;
  status: string;
};

function ProductCard({ title, image, description, price, status }: ProductCardProps) {
  return (
    <Card p="lg" radius="md" withBorder className="relative">
      <Card.Section>
        <Badge className="absolute top-2 left-3 z-40 bg-black text-white">new</Badge>
        <AspectRatio ratio={337 / 393} sx={{ maxWidth: '100%' }} className="relative">
          <Image fill={true} src={image} alt="Norway" />
        </AspectRatio>
      </Card.Section>
      <Group position="apart" mt="md" mb="xs">
        <Text
          className=" whitespace-nowrap"
          weight={500}
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
        >
          {title}
        </Text>
      </Group>

      <Text size="sm" color="dimmed">
        {description}
      </Text>

      <Group position="apart" mt="md" mb="xs">
        <Text size={20} weight={500}>
          US ${price}
        </Text>
        <Badge variant="light" color="red">
          {status}
        </Badge>
      </Group>

      <Button fullWidth mt="md" radius="md">
        Edit
      </Button>
    </Card>
  );
}

export default ProductCard;
