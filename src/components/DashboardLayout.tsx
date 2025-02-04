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
  IconButton,
  useTheme,
  Divider
} from "@mui/material";
import { 
  HomeOutlined,
  PeopleAltOutlined,
  FitnessCenterOutlined,
  LogoutOutlined,
  MenuBookOutlined 
} from "@mui/icons-material";

const drawerWidth = 260;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      display: "flex",
      minHeight: "100vh",
      backgroundColor: "#f8fafc"
    }}>
      <CssBaseline />

      {/* 🟪 Modern Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "linear-gradient(195deg, #021126 0%, #03245c 100%)",
            color: "#e2e8f0",
            borderRight: "none"
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* 🟦 Logo Section */}
        <Box sx={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: theme.spacing(3),
          borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
          <Box sx={{ 
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            textDecoration: "none"
          }}>
            <FitnessCenterOutlined sx={{ 
              fontSize: 32,
              color: theme.palette.primary.main 
            }}/>
            <Typography 
              variant="h5" 
              component="div" 
              sx={{ 
                fontWeight: 700,
                background: "linear-gradient(45deg, #6b8cff 0%, #a063ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              IronCore
            </Typography>
          </Box>
        </Box>

        {/* 🟦 Navigation Menu */}
        <List sx={{ padding: theme.spacing(2), mt: 1} }>
          {[
            { text: "Dashboard", icon: <HomeOutlined />, path: "/clients",  },
            { text: "Clients", icon: <PeopleAltOutlined />, path: "/clients" },
            { text: "Trainers", icon: <FitnessCenterOutlined />, path: "/trainers" },
            { text: "Class", icon: <MenuBookOutlined />, path: "/workout" },
          ].map((item) => (
            <ListItem
              key={item.text}
           
              component="a"
              href={item.path}
              sx={{
                borderRadius: 2,
                marginBottom: 0.5,
                "&:hover": { 
                  backgroundColor: "rgba(255,255,255,0.08)",
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.main
                  }
                },
                "&.Mui-selected": {
                  backgroundColor: "rgba(96, 165, 250, 0.16)",
                  borderLeft: `4px solid ${theme.palette.primary.main}`
                }
              }}
            >
              <ListItemIcon sx={{ 
                color: "#94a3b8",
                minWidth: "40px" 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ color: "#fff" }}
                primaryTypographyProps={{ 
                  fontSize: 15,
                  
                  fontWeight: 500 
                }} 
              />
            </ListItem>
          ))}
        </List>

        {/* 🟦 Logout Section */}
        <Box sx={{ marginTop: "auto", padding: theme.spacing(2) }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 2 }} />
          <ListItem
            
            component="a"
            href="/logout"
            sx={{
              color: "#fff",
              borderRadius: 2,
              "&:hover": { 
                backgroundColor: "rgba(255,255,255,0.08)",
                "& .MuiListItemIcon-root": {
                  color: theme.palette.error.main
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: "#fff", minWidth: "40px" }}>
              <LogoutOutlined />
            </ListItemIcon>
            <ListItemText 
            sx={{ color: "#fff" }}
              primary="Logout" 
              primaryTypographyProps={{ 
                fontSize: 15,
                fontWeight: 500 
              }} 
            />
          </ListItem>
        </Box>
      </Drawer>

      {/* 🟪 Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {/* 🔷 Modern AppBar */}
        <AppBar 
          position="static" 
          sx={{ 
            backgroundColor: "white",
            color: theme.palette.text.primary,
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            borderRadius: 0
          }}
        >
          <Toolbar sx={{ minHeight: "80px!important" }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 600,
                fontSize: "1.25rem",
                color: theme.palette.text.primary
              }}
            >
              Admin Dashboard
            </Typography>
            <IconButton sx={{ 
              backgroundColor: "#f1f5f9",
              "&:hover": { backgroundColor: "#e2e8f0" }
            }}>
              <Box sx={{ 
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(45deg, #6b8cff 0%, #a063ff 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 600
              }}>
                AJ
              </Box>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* 🟢 Dynamic Content */}
        <Box sx={{ 
          padding: theme.spacing(4),
          minHeight: "calc(100vh - 80px)",
          position: "relative"
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;