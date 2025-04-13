import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Outlet } from 'react-router';
import { RouterProvider } from 'react-router';

import router from './pages/router';
import '@/styles/App.css';
import getTheme from './styles/theme';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = getTheme(prefersDarkMode ? 'dark' : 'light');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
