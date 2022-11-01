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
  IconSettings,
  IconUser,
  IconShoppingCart,
  IconBolt
} from '@tabler/icons';
import { useSession, signOut } from 'next-auth/react';
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
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { data: session, status } = useSession();
  const router = useRouter();
  const { classes } = useStyles();

  return (
    <div className="w-full bg-white h-16 flex items-center justify-between mx-auto">
      <div className="flex items-center min-h-full"></div>

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
              onClick={() => router.push('/login')}
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
            <ActionIcon onClick={() => signOut()} size="lg" color="brown" title="Logout">
              <IconLogout size={20} />
            </ActionIcon>
            <Button
              onClick={() => router.push('/login')}
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
                <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
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
