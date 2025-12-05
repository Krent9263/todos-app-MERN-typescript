import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Make the query client available on `window` for devtools / debugging
// (TS declaration below ensures no type errors when assigning)
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__?: import('@tanstack/query-core').QueryClient;
  }
}

// expose for devtools / debugging
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

type Props = React.PropsWithChildren<{}>;

export const ReactQueryProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
