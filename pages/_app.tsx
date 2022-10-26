import '@/lib/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { RouterTransition } from '@/lib/components/UX/RouterTransition';
import type { AppProps } from 'next/app';
import { ReactNode, useState } from 'react';
import { NextPage } from 'next';

type Page<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & { Component: Page };

export default function App({ Component, pageProps: { session, ...pageProps } }: Props) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <SessionProvider session={session}>
        <MantineProvider
          withGlobalStyles
          theme={{
            fontFamily: 'Inter',
            headings: { fontFamily: 'Inter' },
            colorScheme: colorScheme,
            primaryShade: 5,
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
          <RouterTransition />
          {getLayout(<Component {...pageProps} />)}
        </MantineProvider>
      </SessionProvider>
    </ColorSchemeProvider>
  );
}
