import { useEffect, useState } from 'react';
import {
  Navbar,
  SegmentedControl,
  Text,
  createStyles,
  useMantineTheme,
  AppShell,
  Header,
  MediaQuery,
  Burger
} from '@mantine/core';
import { useDisclosure, useScrollLock } from '@mantine/hooks';
import { useRouter } from 'next/router';
import {
  IconShoppingCart,
  IconBuildingStore,
  IconShirt,
  IconSettings,
  IconUsers,
  IconAddressBook,
  IconReceiptRefund,
  IconLogout,
  IconSwitchHorizontal
} from '@tabler/icons';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    navbar: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
    },

    title: {
      textTransform: 'uppercase',
      letterSpacing: -0.25
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.md,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 400,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
        }
      }
    },

    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md
    }
  };
});

const tabs = {
  '/dashboard/buyer': [
    { link: '/dashboard/buyer/orders', label: 'My Orders', icon: IconShoppingCart },
    { link: '/dashboard/buyer/addresses', label: 'Address Book', icon: IconAddressBook }
  ],
  '/dashboard/seller': [
    { link: '/dashboard/seller/products', label: 'My Products', icon: IconBuildingStore },
    { link: '/dashboard/seller/orders', label: 'Order Fulfillment', icon: IconShoppingCart }
  ]
};

type DashboardSection = '/dashboard/buyer' | '/dashboard/seller';

export function DashboardLayout({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const [opened, handlers] = useDisclosure(false);
  const [scrollLocked, setScrollLocked] = useScrollLock();
  const currentPath = router.pathname as DashboardSection;
  const { data: session, status } = useSession();
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<'/dashboard/buyer' | '/dashboard/seller'>(
    '/dashboard/buyer'
  );
  const [active, setActive] = useState('/dashboard/seller/products');

  const links = tabs[section].map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.link === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.link);
        handlers.close();
        router.push(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const handleDashboardChange = (value: DashboardSection) => {
    setSection(value);
    router.push(value);
  };

  useEffect(() => {
    if (currentPath.includes('/dashboard/buyer')) {
      setSection('/dashboard/buyer');
      setActive(currentPath);
    }

    if (currentPath.includes('/dashboard/seller')) {
      setSection('/dashboard/seller');
      setActive(currentPath);
    }
  }, [currentPath]);

  return (
    <AppShell
      zIndex={160}
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
        }
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 300, lg: 300 }}
          className={classes.navbar}
        >
          <Navbar.Section>
            <Text weight={500} size="sm" className={classes.title} color="dimmed" mb="xs">
              {session?.user?.name}
            </Text>

            <SegmentedControl
              value={section}
              onChange={(value: '/dashboard/buyer' | '/dashboard/seller') =>
                handleDashboardChange(value)
              }
              transitionTimingFunction="ease"
              fullWidth
              data={[
                { label: 'Buyer', value: '/dashboard/buyer' },
                { label: 'Seller', value: '/dashboard/seller' }
              ]}
            />
          </Navbar.Section>

          <Navbar.Section grow mt="xl">
            {links}
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <a href="" className={classes.link} onClick={() => signOut()}>
              <IconLogout className={classes.linkIcon} stroke={1.5} />
              <span>Logout</span>
            </a>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => {
                  handlers.toggle();
                  setScrollLocked((c) => !c);
                }}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Link href="/">
              <Text className="font-logo text-4xl">Zavy</Text>
            </Link>
          </div>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
