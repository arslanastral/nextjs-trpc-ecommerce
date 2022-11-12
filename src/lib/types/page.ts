import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type PageWithLayout<TProps = Record<string, unknown>, TInitialProps = TProps> = NextPage<
  TProps,
  TInitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};
