import { Drawer, Toolbar, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { type JSX } from "react";
import { Link } from "react-router";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

type NavLink = {
    text: string;
    icon: JSX.Element;
    path: string;
};

const navStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
    borderBottom: "1px solid #e5e7eb",
    background: "#fff",
};

const titleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: 600,
};

const listStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.75rem",
    margin: 0,
    padding: 0,
    listStyle: "none",
    alignItems: "center",
};

const linkStyle: React.CSSProperties = {
    textDecoration: "none",
    color: "#111827",
    padding: "0.25rem 0.5rem",
    borderRadius: 4,
};

const drawerWidth = 240;


export default function NavBar({ links, handleDrawerClose, open}: {links: NavLink[], handleDrawerClose: () => void, open: boolean   }) {
    return (
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
            <IconButton onClick={handleDrawerClose} sx={{ ml: 'auto' }} aria-label="close drawer" edge="end">
              <ChevronLeftIcon />
            </IconButton>
        </Toolbar>
        
        {/* Sidebar Content */}
        <List>
          {links.map((item) => (
            <ListItem key={item.text} disablePadding component={Link} to={item.path} onClick={handleDrawerClose} sx={{color:"common.black"}}>
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
          );
}