import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import LogoHub from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { Divider, List, ListItem, ListItemText, Paper } from '@mui/material';

const pages = [
  { label: 'Home', path: '/theraphist/home' },
  { label: 'About', path: '/theraphist/about' },
  { label: 'Contact', path: '/theraphist/contact' },
  { label: 'All Students', path: '/therapist/allstudents' },
  { label: 'Parents', path: '/therapist/acceptedparents' },
  { label: 'Meetings', path: '/therapist/meeting' },
  { label: 'Activities', path: '/therapist/viewactivitylibrary' }
];

const TheraphistNavbar = ({ homebg = {}, aboutBg = {}, profilebg = {}, navigateToProfile = () => { }, theraphistdetails = {}, contactbg = {} }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleNotifications = () => {
    const wasOpen = notificationsOpen;
    setNotificationsOpen(!wasOpen);
    
    if (!wasOpen) {
      setNotifications([
        { id: 1, text: 'New parent request', time: '10 min ago', description: 'Sarah Johnson wants to connect with you' },
        { id: 2, text: 'Meeting scheduled', time: '1 hour ago', description: 'Meeting with Michael Brown at 3:00 PM' },
        { id: 3, text: 'Activity completed', time: '3 hours ago', description: 'John Smith completed the assigned activity' },
        { id: 4, text: 'Parent request accepted', time: '1 day ago', description: 'Emily Davis accepted your connection request' },
        { id: 5, text: 'System update', time: '2 days ago', description: 'New therapy tools available in your dashboard' },
      ]);
    }
  };

  const location = useLocation();

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'transparent', zIndex: 100, backgroundImage: `url(${contactbg})`, ...profilebg, ...aboutBg, ...homebg }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Link to="/theraphist/home">
                <Box component="img" src={LogoHub} alt='logo'
                  sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                </Box>
              </Link>
              <Link to="/theraphist/home" style={{ textDecoration: "none" }}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    textDecoration: 'none',
                    color: '#384371'
                  }}
                >
                  LearnHub
                </Typography>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon sx={{ color: "#384371" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page.label}
                    to={page.path}
                    onClick={handleCloseNavMenu}>
                    <Typography color='primary'
                      sx={{ textAlign: 'center', color: '#1967D2' }}>
                      {page.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Link to='/theraphist/home'>
              <Box component="img" src={LogoHub} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} ></Box>
            </Link>
            <Link to="/theraphist/home" style={{ textDecoration: "none" }}>
              <Typography
                variant="h5"
                color='primary'
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  textDecoration: 'none',
                }}
              >
                LearnHub
              </Typography>
            </Link>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: "40px" }}>
              {pages.map((page) => (
                <Link style={{ textDecoration: "none" }}
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  to={page.path}
                >
                  <Typography color='primary' sx={{
                    my: 2, fontSize: "14px", fontWeight: "500", display: 'block', textTransform: "inherit", borderBottom: location.pathname === page.path ? "1px solid #1967D2" : "none", '&:hover': {
                      borderBottom: "1px solid #1967D2",
                      color: '#1967D2'
                    }
                  }}> {page.label}</Typography>
                </Link>
              ))}
            </Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ flexGrow: 0, gap: "30px", position: 'relative' }}>
              {/* Notification Icon with Dropdown */}
              <Box sx={{ position: 'relative' }}>
                <IconButton onClick={toggleNotifications}>
                  <NotificationsOutlinedIcon color='primary' sx={{ height: '24px' }} />
                </IconButton>
                
                {/* Notifications dropdown with card styling */}
                {notificationsOpen && (
                  <Box sx={{ 
                    position: 'absolute',
                    top: '100%',
                    left: '-200px',
                    width: 370,
                    zIndex: 9999,
                    mt: '10px'
                  }}>
                    {/* Arrow pointing to the icon */}
                    <Box sx={{
                      position: 'absolute',
                      top: '-10px',
                      right: '140px',
                      width: 0,
                      height: 0,
                      borderLeft: '10px solid transparent',
                      borderRight: '10px solid transparent',
                      borderBottom: '10px solid white',
                      filter: 'drop-shadow(0px -2px 2px rgba(0,0,0,0.1))'
                    }} />
                    
                    <Paper sx={{ 
                      width: '100%',
                      maxHeight: 500,
                      overflow: 'auto',
                      borderRadius: '12px',
                      bgcolor: 'background.paper',
                      p: 1.5,
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                    }}>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <Paper 
                              key={notification.id}
                              elevation={0}
                              sx={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                p: 2,
                                borderRadius: '12px',
                                border: '1px solid #e0e0e0',
                                '&:hover': {
                                  backgroundColor: '#f5f5f5'
                                }
                              }}
                            >
                              <Avatar 
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  mr: 2,
                                  bgcolor: '#1976d2',
                                  color: 'white',
                                  fontSize: '16px'
                                }}
                              >
                                {notification.text.charAt(0)}
                              </Avatar>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography 
                                  variant="subtitle2" 
                                  noWrap
                                  sx={{ 
                                    fontWeight: 600,
                                    lineHeight: 1.3,
                                    mb: 0.5
                                  }}
                                >
                                  {notification.text}
                                </Typography>
                                <Typography 
                                  variant="body2" 
                                  color="text.secondary"
                                  noWrap
                                  sx={{
                                    lineHeight: 1.3,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden'
                                  }}
                                >
                                  {notification.description}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{
                                    display: 'block',
                                    mt: 0.5
                                  }}
                                >
                                  <li style={{color:"text.secondary"}}>{notification.time}</li>
                                </Typography>
                              </Box>
                            </Paper>
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                            No new notifications
                          </Typography>
                        )}
                      </Box>
                    </Paper>
                  </Box>
                )}
              </Box>
              
              <Link to={`/therapist/chat`}>
                <SmsOutlinedIcon color='primary' sx={{ height: '24px', color: location.pathname === `/therapist/chat` ? '#1967D2' : 'black' }} />
              </Link>

              <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: "30px" }}>
                <Typography color='secondary'>Hi, {theraphistdetails?.name}</Typography>
                {theraphistdetails?.profilePic?.filename ? (
                  <Avatar onClick={navigateToProfile} src={`http://localhost:4000/uploads/${theraphistdetails?.profilePic?.filename}`} alt={theraphistdetails?.name} />
                ) : (
                  <Avatar onClick={navigateToProfile}>{theraphistdetails?.name?.charAt(0)}</Avatar>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default TheraphistNavbar;