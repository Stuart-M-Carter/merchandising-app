import HomeIcon from '@mui/icons-material/Home';
import LanIcon from '@mui/icons-material/Lan';
import CategoryIcon from '@mui/icons-material/Category';
import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import AppBar from './components/_core/app-bar';
import NavBar from './components/_core/nav-bar';
import { features } from './components/views/features';

function MainLayout() {

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', padding: 0, height: '100vh', width: '100vw',  flexDirection: 'column' }}>
      <AppBar title='Merchandising' showSearch={true} onMenuClick={handleDrawerOpen}></AppBar> 
      <NavBar links={features} handleDrawerClose={handleDrawerClose} open={open} />
      <Box component="main" sx={{ flexGrow: 1, p: 0, display :'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;