import '@/lib/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { RouterTransition } from '@/lib/components/UX/RouterTransition';
import type { AppProps } from 'next/app';
import { ReactNode, useState } from 'react';
import { NextPage } from 'next';
import { trpc } from '../utils/trpc';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps<{
  session: Session;
}> & { Component: Page };

function App({ Component, pageProps: { session, ...pageProps } }: Props) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        theme={{
          fontFamily: 'Inter',
          headings: { fontFamily: 'Inter' },
          colorScheme: colorScheme,
          colors: {
            brown: [
              '#feefe9',
              '#e3d4d1',
              '#cab9b4',
              '#b49d98',
              '#9d817b',
              '#846862',
              '#67514b',
              '#4b3a35',
              '#2f221e',
              '#180903'
            ]
          },
          primaryColor: 'brown',
          primaryShade: 6,
          defaultRadius: 12,
          globalStyles: (theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
              ...theme.fn.fontStyles()
            },

            body: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
              color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
              lineHeight: theme.lineHeight
            }
          })
        }}
      >
        <ModalsProvider>
          <RouterTransition />
          <SessionProvider session={session}>
            {getLayout(<Component {...pageProps} />)}
          </SessionProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default trpc.withTRPC(App);
