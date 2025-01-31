"use client";

import React from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { FaUsers, FaHome } from "react-icons/fa";
import { Logout, SportsGymnasticsOutlined } from "@mui/icons-material";

const drawerWidth = 240;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ 
      display: "flex",
       minHeight: "100vh", 
       backgroundColor: "#f4f5f7" 
       }}>
      <CssBaseline />

      {/* 🟥 Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#021126",
            color: "#021126",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ backgroundColor: "#021126", textAlign: "center", padding: 2 }}>
          <Typography variant="h6" noWrap component="div" sx={{color: "white"}}>
            Gym Admin
          </Typography>
        </Toolbar>
        <List>
          <ListItem  component="a" href="/clients" sx={{ "&:hover": { backgroundColor: "#03224c" } }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <FaUsers />
            </ListItemIcon>
            <ListItemText primary="Clients" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem  component="a" href="/trainers" sx={{ "&:hover": { backgroundColor: "#03224c" } }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <SportsGymnasticsOutlined />
            </ListItemIcon>
            <ListItemText primary="Trainers" sx={{ color: "#fff" }} />
          </ListItem>
          <ListItem  component="a" href="/logout" sx={{ "&:hover": { backgroundColor: "#03224c" } }}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "#fff" }} />
          </ListItem>
        </List>
      </Drawer>

      {/* 🟥 Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        {/* 🔵 Header */}
        <AppBar position="static" sx={{ backgroundColor: "#021126", color: "#fff", marginBottom: 3 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* 🟢 Contenido Dinámico */}
        <Box sx={{ flexGrow: 1 }}>
          {children}
        </Box>
   
       
      </Box>
    </Box>
  );
};

export default DashboardLayout;
