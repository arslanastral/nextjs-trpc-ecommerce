import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type PageWithLayout = NextPage & {
  getLayout: (page: ReactElement) => ReactNode;
};
