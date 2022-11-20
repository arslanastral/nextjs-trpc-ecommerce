import { useEffect, useState } from 'react';
import { createStyles, Navbar, Group, Burger, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useSession, signOut } from 'next-auth/react';
import { IconLogout, IconUser } from '@tabler/icons';
import Link from 'next/link';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      backgroundColor: theme.colors.dark
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      )}`
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
        0.1
      )}`
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.lg,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 300,

      '&:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.1
        )
      }
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background!,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.9
        }
      }
    }
  };
});

export const pages = [
  { link: '/', label: 'New' },
  { link: '/category/health-and-beauty', label: 'Health & Beauty' },
  { link: '/category/women-fashion', label: `Women's Fashion` },
  { link: '/category/men-fashion', label: `Men's Fashion` },
  { link: '/category/luxury', label: 'Luxury' },
  { link: '/category/electronics', label: 'Electronics' },
  { link: '/category/sports', label: 'Sports' },
  { link: '/category/other', label: 'Other' }
];

export function SideNavBar({
  opened,
  closeSideBar
}: {
  opened: boolean;
  closeSideBar: () => void;
}) {
  const { data: session, status } = useSession();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('');
  const links = pages.map((item) => (
    <Link
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={() => {
        closeSideBar();
        setActive(item.label);
      }}
    >
      <span>{item.label.toUpperCase()}</span>
    </Link>
  ));

  return (
    <Navbar
      className={`lg:invisible ${classes.navbar}`}
      hiddenBreakpoint="lg"
      height={'100%'}
      width={{ sm: 300 }}
      p="md"
      fixed={true}
      hidden={!opened}
      zIndex={150}
    >
      <Navbar.Section grow>
        <Group className={classes.header} position="right">
          <Text className="font-logo text-3xl text-white">Zavy</Text>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {session && (
          <a href="#" className={classes.link} onClick={() => signOut()}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        )}

        {!session && (
          <Link href="/login" className={classes.link}>
            <IconUser className={classes.linkIcon} stroke={1.5} />
            <span>Log In</span>
          </Link>
        )}
      </Navbar.Section>
    </Navbar>
  );
}
