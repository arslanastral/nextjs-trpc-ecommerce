import {
  Button,
  Card,
  Group,
  Text,
  LoadingOverlay,
  Badge,
  AspectRatio,
  Image as MantineImage
} from '@mantine/core';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';
import { IconCrop } from '@tabler/icons';
import { useEffect, useState, useCallback } from 'react';

type PreviewProductCardProps = {
  title: string;
  image?: string;
  description: string;
  price: number;
  status: string;
  badge?: string;
  src?: string;
  imageEditMode?: boolean;
  setImageEditMode: (state: boolean) => void;
  cropSrc?: string;
  setCropSrc: (file: string | null) => void;
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
  setImageEditMode,
  cropSrc,
  setCropSrc
}: PreviewProductCardProps) {
  const [isCropping, setIsCropping] = useState<boolean>(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      setIsCropping(true);
      const croppedImage = await getCroppedImg(src, croppedAreaPixels, rotation);
      setCropSrc(croppedImage);
      setImageEditMode(false);
      setIsCropping(false);
      resetCropState();
    } catch (e) {
      setIsCropping(false);
      resetCropState();
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, src, setCropSrc, setImageEditMode]);

  useEffect(() => {
    resetCropState();
  }, [src]);

  const resetCropState = () => {
    setRotation(0);
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  return (
    <div className="bg-brown-50 p-8 flex flex-col items-center">
      <div className="flex items-center mb-4 justify-between w-[337px]">
        <Badge className="bg-black text-white">live preview</Badge>

        <div className="flex gap-2">
          {src && !imageEditMode && (
            <Button
              className="font-thin bg-black hover:bg-black"
              leftIcon={<IconCrop size={16} />}
              onClick={() => setImageEditMode(true)}
              compact
              radius="md"
            >
              Crop
            </Button>
          )}

          {src && imageEditMode && (
            <Button
              disabled={isCropping}
              className="font-thin bg-black hover:bg-black"
              leftIcon={<IconCrop size={16} />}
              onClick={showCroppedImage}
              compact
              radius="md"
            >
              Save
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
              <LoadingOverlay visible={isCropping} overlayBlur={1} />
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

          <Button
            fullWidth
            mt="md"
            radius="md"
            variant="outline"
            className="h-[45px] font-light text-lg"
          >
            Add To Cart
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default PreviewProductCard;
