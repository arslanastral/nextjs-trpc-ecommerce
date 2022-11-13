import { AspectRatio } from '@mantine/core';
import { Skeleton } from '@mantine/core';

const ProductSkeleton = () => {
  return (
    <>
      <div className="lg:p-6 lg:pt-1 flex justify-center w-full min-h-[640px]">
        <div className="flex flex-col justify-center lg:flex-row bg-white gap-6 min-w-full xl:min-w-[1400px] max-w-[1400px]">
          <div className="w-full md:w-3/5 lg:w-[525px] mx-auto">
            <AspectRatio ratio={337 / 393} sx={{ maxWidth: '100%', minHeight: '100%' }}>
              <Skeleton height={'100%'} radius={0} />
            </AspectRatio>
          </div>

          <div className="p-2 flex flex-1 flex-col justify-between">
            <div className="p-5">
              <Skeleton height={15} mt={6} width="10%" radius="xl" />
              <Skeleton height={26} mt={18} width="40%" radius="xl" />
            </div>

            <div className="p-5">
              <Skeleton height={12} mt={13} width="100%" radius="xl" />
              <Skeleton height={12} mt={13} width="100%" radius="xl" />
              <Skeleton height={12} mt={13} width="100%" radius="xl" />
            </div>

            <div className="p-5 flex">
              <Skeleton height={18} mt={6} width="20%" radius="xl" />
            </div>

            <div className=" gap-3 p-5 items-center justify-between hidden lg:flex">
              <Skeleton height={50} mt={6} width="30%" radius="sm" />
              <Skeleton height={50} mt={6} width="40%" radius="sm" />
            </div>

            <div className="fixed flex gap-3 p-5 w-full items-center justify-between lg:hidden bg-white shadow bottom-0 left-0 right-0">
              <Skeleton height={50} mt={6} width="40%" radius="sm" />
              <Skeleton height={50} mt={6} width="40%" radius="sm" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSkeleton;
