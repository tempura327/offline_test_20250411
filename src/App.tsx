import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet } from 'react-router';
import { RouterProvider } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';

import router from './pages/router';
import '@/styles/App.css';
import getTheme from './styles/theme';
import store from './stores/index';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = getTheme(prefersDarkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReduxProvider store={store}>
        <Outlet />
      </ReduxProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
