import { trpc } from '@/utils/trpc';
import {
  TextInput,
  Button,
  Avatar,
  Menu,
  createStyles,
  ActionIcon,
  useMantineColorScheme,
  Indicator
} from '@mantine/core';
import {
  IconSearch,
  IconLogout,
  IconHome,
  IconUser,
  IconShoppingCart,
  IconBolt
} from '@tabler/icons';
import { useSession, signOut } from 'next-auth/react';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useState } from 'react';
import { Burger } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { SideNavBar } from './SideNavBar';
import ProductModal from '../Dashboard/Seller/ProductModal';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  input: {
    fontFamily: 'Inter',
    fontWeight: 400,

    '&:focus': {
      borderColor: theme.colors.brown[6]
    }
  }
}));

function ControlBar() {
  const router = useRouter();
  const [modalOpened, setModalOpened] = useState<boolean>(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, handlers] = useDisclosure(false);
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const title = opened ? 'Close navigation' : 'Open navigation';
  const dark = colorScheme === 'dark';
  const [searchTerm, setSearchTerm] = useState('');
  const { data: session, status } = useSession();
  const { data, isLoading, error } = trpc.cart.getItemCount.useQuery(undefined, {
    enabled: !!session
  });
  const { classes } = useStyles();

  return (
    <div
      className={`w-full bg-white h-16 ${
        status === 'loading' ? 'invisible' : 'flex'
      } items-center justify-between mx-auto `}
    >
      <div className="flex items-center min-h-full">
        <Burger
          className="lg:hidden ml-3 z-[160] relative block"
          color={opened ? 'white' : 'black'}
          opened={opened}
          onClick={() => {
            handlers.toggle();
            setScrollLocked((c) => !c);
          }}
          title={title}
        />
        <SideNavBar opened={opened} closeSideBar={() => handlers.close()} />
      </div>

      <div className="flex items-center min-h-full gap-5 mr-4">
        <TextInput
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }
          }}
          className="mx-4"
          classNames={{ input: classes.input }}
          icon={<IconSearch size="15px" />}
          placeholder="Search Zavy"
          radius="xl"
          size="sm"
        />

        <div className={`mr-3 ${session ? 'mt-3' : ''}`}>
          <Indicator label={data ?? 0} inline size={22} disabled={!session}>
            <ActionIcon component={Link} href="/cart" size="lg" color="brown" title="Checkout">
              <IconShoppingCart size={25} stroke={1.6} />
            </ActionIcon>
          </Indicator>
        </div>

        {!session && (
          <>
            <Button
              component={Link}
              href="/login"
              leftIcon={<IconBolt size="16px" />}
              className="text-[16px] font-medium rounded-lg hidden lg:block bg-brown-600 hover:bg-brown-700"
              variant="filled"
              size="sm"
            >
              Start Selling
            </Button>
          </>
        )}

        {session && (
          <>
            <ProductModal opened={modalOpened} setOpened={setModalOpened} />
            <Button
              onClick={() => setModalOpened(true)}
              leftIcon={<IconBolt size="16px" />}
              className="text-[16px] font-medium rounded-lg hidden lg:block hover:bg-brown-50"
              variant="outline"
              size="sm"
            >
              Sell
            </Button>
            <Menu shadow="sm" width={180} radius={20}>
              <Menu.Target>
                <Avatar
                  className="cursor-pointer"
                  src={session?.user?.image}
                  radius="xl"
                  color="indigo"
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>{session?.user?.name}</Menu.Label>
                <Menu.Item component={Link} href="/dashboard/buyer" icon={<IconHome size={14} />}>
                  Dashboard
                </Menu.Item>
                <Menu.Item onClick={() => signOut()} icon={<IconLogout size={14} />}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
}

export default ControlBar;
