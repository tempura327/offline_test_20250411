import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import store from '@/stores';

const createWrapper = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const queryClient = new QueryClient();

  return ({ children }: PropsWithChildren) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ReduxProvider>
    </ThemeProvider>
  );
};

export default createWrapper;
