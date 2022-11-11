import {
  TextInput,
  Button,
  Avatar,
  Menu,
  createStyles,
  ActionIcon,
  useMantineColorScheme
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
import Link from 'next/link';
import { useState } from 'react';
import { Burger } from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { SideNavBar } from './SideNavBar';

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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const [opened, setOpened] = useState(false);
  const title = opened ? 'Close navigation' : 'Open navigation';
  const dark = colorScheme === 'dark';
  const { data: session, status } = useSession();
  const { classes } = useStyles();

  return (
    <div className="w-full bg-white h-16 flex items-center justify-between mx-auto">
      <div className="flex items-center min-h-full">
        <Burger
          className="lg:hidden ml-3 z-20 relative block"
          color={opened ? 'white' : 'black'}
          opened={opened}
          onClick={() => {
            setOpened((o) => !o);
            setScrollLocked((c) => !c);
          }}
          title={title}
        />
        <SideNavBar opened={opened} />
      </div>

      <div className="flex items-center min-h-full gap-4 mr-4">
        <TextInput
          className="mx-4"
          classNames={{ input: classes.input }}
          icon={<IconSearch size="15px" />}
          placeholder="Search Zavy"
          radius="xl"
          size="sm"
        />

        <ActionIcon size="lg" color="brown" title="Checkout">
          <IconShoppingCart size={20} />
        </ActionIcon>

        {!session && (
          <>
            <Button
              component={Link}
              href="/login"
              leftIcon={<IconUser size="16px" />}
              className="text-[16px] font-medium rounded-lg hidden lg:block bg-brown-600 hover:bg-brown-700"
              variant="filled"
              size="sm"
            >
              Log In
            </Button>
          </>
        )}

        {session && (
          <>
            <Button
              component={Link}
              href="/dashboard/seller/products"
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
