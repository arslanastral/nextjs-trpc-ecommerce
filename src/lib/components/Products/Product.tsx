import { Button, Spoiler, AspectRatio, Text, Skeleton, Loader } from '@mantine/core';
import { trpc } from '@/utils/trpc';
import Image from 'next/image';
import { QuantityInput } from '@/lib/components/Products/QuantityInput';
import { IconShoppingCart, IconAlertCircle } from '@tabler/icons';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type ProductProps = {
  id: string;
  title: string;
  image: string;
  description: string;
  category: string;
  price: string;
  stock: number;
};

const Product = ({ id, title, image, description, category, price, stock }: ProductProps) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const current = trpc.useContext();
  const addToCart = trpc.cart.addToCart.useMutation();
  const [loading, setLoading] = useState<boolean>(true);
  const [itemQuantity, setItemQuantity] = useState<number | undefined>(1);
  const [cartLimit, setCartLimit] = useState<boolean>(false);

  const handleAddToCart = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    const quantity = itemQuantity ?? 1;

    addToCart.mutate(
      { id: id, quantity: quantity },
      {
        onSuccess: (data) => {
          if (data === 'stock_limit') setCartLimit(true);
          setItemQuantity(1);
          current.cart.getItemCount.invalidate();
        }
      }
    );
  };

  return (
    <>
      <div className="lg:p-6 lg:pt-1 flex justify-center w-full min-h-[640px]">
        <div className="flex flex-col justify-center lg:flex-row bg-white h-full gap-6 max-w-[1400px]">
          <div className="w-full md:w-3/5 lg:w-[525px] h-full mx-auto">
            <AspectRatio ratio={337 / 393} sx={{ maxWidth: '100%', minHeight: '100%' }}>
              <Skeleton visible={loading} radius={0}>
                <Image
                  fill={true}
                  src={`https://res.cloudinary.com/dv9wpbflv/image/upload/f_auto,q_auto/v${image}.jpg`}
                  alt="Product Image"
                  onLoad={() => setLoading(false)}
                />
              </Skeleton>
            </AspectRatio>
          </div>

          <div className="p-2 flex flex-1 flex-col justify-between">
            <div className="p-5">
              <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                {category}
              </Text>
              <Text className="text-3xl" mt="xs" mb="md">
                {title}
              </Text>
            </div>

            <div className="p-5">
              <Text className="text-xl text-brown-500" mt="xs" mb="md" weight={300}>
                <Spoiler maxHeight={90} showLabel="Read More" hideLabel="Hide">
                  {description}. Cake croissant gummi bears dessert bear claw oat cake danish. Bear
                  claw candy marzipan soufflé dragée pudding halvah cheesecake. Cheesecake
                  marshmallow sugar plum sugar plum apple pie marshmallow marshmallow soufflé pie.
                </Spoiler>
              </Text>
            </div>

            <div className="p-5 flex ">
              <Text className="text-4xl" mt="xs" mb="md">
                $ {price}
              </Text>
            </div>

            {cartLimit && (
              <div className="flex items-center gap-3 px-5">
                <IconAlertCircle stroke={1.5} size={16} />
                <Text size="sm" color="dimmed">
                  Max cart limit reached
                </Text>
              </div>
            )}

            <div className=" gap-3 px-5 pb-5 items-center justify-between hidden lg:flex">
              <div className="flex items-center gap-6">
                <QuantityInput
                  value={itemQuantity}
                  setValue={setItemQuantity}
                  max={stock}
                  disabled={!stock || cartLimit}
                />
                <Text color="dimmed" className="text-md">
                  {stock} Items Left
                </Text>
              </div>

              <Button
                disabled={!stock || cartLimit}
                onClick={handleAddToCart}
                leftIcon={
                  addToCart.isLoading ? (
                    <Loader color="white" size="sm" />
                  ) : (
                    <IconShoppingCart stroke={1.2} />
                  )
                }
                fullWidth
                className="h-[50px] max-w-[20rem] text-xl font-light"
                radius="sm"
              >
                {stock ? 'Add To Cart' : 'Out Of Stock'}
              </Button>
            </div>

            <div className="fixed flex gap-3 p-5 w-full items-center justify-between lg:hidden bg-white shadow bottom-0 left-0 right-0">
              <Text className="text-3xl">${price}</Text>
              <QuantityInput
                value={itemQuantity}
                setValue={setItemQuantity}
                max={stock}
                disabled={!stock || cartLimit}
              />

              <Button
                disabled={!stock || cartLimit}
                onClick={handleAddToCart}
                leftIcon={
                  addToCart.isLoading ? (
                    <Loader color="white" size="sm" />
                  ) : (
                    <IconShoppingCart stroke={1.2} />
                  )
                }
                fullWidth
                className="h-[50px] max-w-[10rem] text-md font-light"
                radius="sm"
              >
                {stock ? 'Add To Cart' : 'Out Of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
