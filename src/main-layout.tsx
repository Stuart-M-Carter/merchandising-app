import { styled, type Theme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import LanIcon from '@mui/icons-material/Lan';
import CategoryIcon from '@mui/icons-material/Category';
import { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Link, Outlet } from 'react-router';

const drawerWidth = 240;

function MainLayout() {

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path : '/' },
    { text: 'Assortments', icon: <CategoryIcon />, path: '/assortments' },
    { text: 'Hierarchy', icon: <LanIcon />, path: '/hierarchy' }
  ];

  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
  
  return (
    <Box sx={{ display: 'flex', padding: 0 }}>

      <AppBar position="fixed" sx={{ zIndex: (theme :Theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, '&:focus': {
      outline: 'none', // Removes the default focus outline
    },
    // Optionally, to remove the specific MUI focus-visible overlay:
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent', 
    } }} // Hide icon when drawer is open
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Merchandising
            </Typography>
          </Toolbar>
      </AppBar>
    <Drawer
        variant="temporary" // Use "temporary" for a standard slide-in experience
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{ // Optional: ensures the drawer closes when clicking the overlay
            keepMounted: true, 
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            transition: (theme) => // Custom transition if needed, but MUI has a default one
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          },
        }}
      >
        <Toolbar>
            {/* Drawer Header with close button */}
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
        
        {/* Sidebar Content */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding component={Link} to={item.path} onClick={handleDrawerClose}>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 0, height: '100vh', width: '100vw', display :'flex', flexDirection: 'column' }}>
        <Offset /> 
        <Outlet />
      </Box>

    </Box>
  );
}

export default MainLayout;