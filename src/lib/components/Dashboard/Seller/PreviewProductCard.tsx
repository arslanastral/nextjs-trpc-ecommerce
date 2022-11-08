import {
  Button,
  Card,
  Group,
  Text,
  ActionIcon,
  Badge,
  AspectRatio,
  Image as MantineImage
} from '@mantine/core';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { IconCrop } from '@tabler/icons';
import { useEffect, useState, useCallback } from 'react';

type ProductCardProps = {
  title: string;
  image?: string;
  description: string;
  price: string;
  status: string;
  badge?: string;
  src?: string;
  imageEditMode?: boolean;
  setImageEditMode: (state: boolean) => void;
};

function PreviewProductCard({
  title,
  image,
  description,
  price,
  status,
  badge,
  src,
  imageEditMode,
  setImageEditMode
}: ProductCardProps) {
  const [cropSrc, setCropSrc] = useState<any>(null);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    // console.log(croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(src, croppedAreaPixels, rotation);
      // console.log('donee', { croppedImage });
      setImageEditMode(false);
      setCropSrc(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, src, setCropSrc, setImageEditMode]);

  useEffect(() => {
    setCroppedAreaPixels(null);
    setCropSrc(null);
  }, [src]);

  return (
    <div className="bg-brown-50 p-8">
      <div className="flex items-center mb-4 justify-between">
        <Badge className="bg-black text-white">live preview</Badge>

        <div className="flex gap-2">
          {!imageEditMode && (
            <ActionIcon
              className="bg-black text-white hover:bg-black"
              onClick={() => setImageEditMode(true)}
              // variant="default"
            >
              <IconCrop size={16} />
            </ActionIcon>
          )}

          {imageEditMode && (
            <Button
              className="font-thin bg-black hover:bg-black"
              leftIcon={<IconCrop size={16} />}
              onClick={showCroppedImage}
              compact
              radius="md"
            >
              Finish
            </Button>
          )}
        </div>
      </div>
      <div className="w-[337px]">
        <Card p="lg" radius="md" withBorder className="relative">
          <Card.Section>
            {badge && (
              <Badge className="absolute top-2 left-3 z-40 bg-black text-white">{badge}</Badge>
            )}

            <AspectRatio ratio={337 / 393} sx={{ maxWidth: '100%' }}>
              {imageEditMode && (
                <Cropper
                  objectFit="horizontal-cover"
                  image={src}
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

              {!imageEditMode && (
                <MantineImage
                  width={337}
                  height={393}
                  src={cropSrc ? cropSrc : src}
                  alt="Your Product image goes here"
                  withPlaceholder
                />
              )}

              {image && !imageEditMode && <Image fill={true} src={image} alt="Image goes here" />}
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
    </div>
  );
}

export default PreviewProductCard;
