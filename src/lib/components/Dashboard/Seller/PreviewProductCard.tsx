import { Button, Card, Group, Text, Badge, AspectRatio, Image } from '@mantine/core';
// import Image from 'next/image';

type ProductCardProps = {
  title: string;
  image: string;
  description: string;
  price: string;
  status: string;
  badge?: string;
};

function PreviewProductCard({ title, image, description, price, status, badge }: ProductCardProps) {
  return (
    <div className="w-[337px]">
      <Card p="lg" radius="md" withBorder className="relative">
        <Card.Section>
          {badge && (
            <Badge className="absolute top-2 left-3 z-40 bg-black text-white">{badge}</Badge>
          )}

          <AspectRatio ratio={337 / 393} sx={{ maxWidth: '100%' }} className="relative">
            <Image
              width={337}
              height={393}
              src={null}
              alt="Your Product image goes here"
              withPlaceholder
            />
            {/* <Image fill={true} src={image} alt="Norway" /> */}
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
          <Badge variant="light" color="red">
            {status}
          </Badge>
        </Group>

        <Button fullWidth mt="md" radius="md">
          Add To Cart
        </Button>
      </Card>
    </div>
  );
}

export default PreviewProductCard;
