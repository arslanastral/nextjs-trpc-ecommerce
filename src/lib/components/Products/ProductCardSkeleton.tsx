import { Skeleton, AspectRatio } from '@mantine/core';

function ProductCardSkeleton() {
  return (
    <div className="w-[337px] rounded-md border border-gray-200">
      <AspectRatio ratio={337 / 393} sx={{ maxWidth: '100%' }} className="relative">
        <Skeleton height={'100%'} radius={0} />
      </AspectRatio>
      <div className="p-4">
        <Skeleton height={12} mt={13} width="100%" radius="xl" />

        <Skeleton height={12} mt={13} width="60%" radius="xl" />

        <div className="flex justify-between gap-3 mt-6">
          <Skeleton height={12} mt={3} width="50%" radius="xl" />
          <Skeleton height={12} mt={3} width="30%" radius="xl" />
        </div>

        <Skeleton height={45} mt={20} width="100%" radius="sm" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
