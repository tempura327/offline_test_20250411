import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Outlet, useNavigate } from 'react-router';

const navItems = [
  {
    text: '點餐',
    to: '/',
  },
  {
    text: '訂單歷史',
    to: '/history',
  },
];

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <Typography variant="h6">小樹屋鬆餅</Typography>
          <div className="ml-auto">
            {navItems.map(({ text, to }) => (
              <Button
                variant="text"
                key={text}
                onClick={() => {
                  navigate(to);
                }}
              >
                {text}
              </Button>
            ))}
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <main className="p-4 h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
