import {
  Button,
  Card,
  Group,
  Text,
  Badge,
  AspectRatio,
  Image as MantineImage
} from '@mantine/core';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { useState, useCallback } from 'react';

type ProductCardProps = {
  title: string;
  image?: string;
  description: string;
  price: string;
  status: string;
  badge?: string;
  src?: string;
  originalSrc?: string;
  editMode: boolean;
  setCropSrc: (src: string | null) => void;
};

function PreviewProductCard({
  title,
  image,
  description,
  price,
  status,
  badge,
  src, //originalSrc || cropSrc
  originalSrc,
  editMode,
  setCropSrc
}: ProductCardProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(originalSrc, croppedAreaPixels, rotation);
      console.log('donee', { croppedImage });
      setCropSrc(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, originalSrc, setCropSrc]);

  return (
    <div className="w-[337px]">
      <Card p="lg" radius="md" withBorder className="relative">
        <Card.Section>
          {badge && (
            <Badge className="absolute top-2 left-3 z-40 bg-black text-white">{badge}</Badge>
          )}

          <AspectRatio ratio={337 / 393} sx={{ maxWidth: '100%' }}>
            {!editMode && (
              <MantineImage
                className="relative"
                width={337}
                height={393}
                src={src}
                alt="Your Product image goes here"
                withPlaceholder
              />
            )}

            {image && !editMode && <Image fill={true} src={image} alt="Image goes here" />}

            {editMode && (
              <Cropper
                objectFit="horizontal-cover"
                image={originalSrc}
                crop={crop}
                rotation={rotation}
                zoom={zoom}
                aspect={337 / 393}
                onCropChange={setCrop}
                onRotationChange={setRotation}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
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

        <Button onClick={showCroppedImage} fullWidth mt="md" radius="md">
          Add To Cart
        </Button>
      </Card>
    </div>
  );
}

export default PreviewProductCard;
