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
import MenuItem from '@mui/material/MenuItem';
import LogoHub from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { Divider, List, ListItem, ListItemText, Paper } from '@mui/material';

const pages = [
    { label: 'Home', path: '/educator/home' },
    { label: 'About', path: '/educator/about' },
    { label: 'Contact', path: '/educator/contact' },
    { label: 'All students', path: '/educator/allstudents' },
    { label: 'Parents', path: '/educator/acceptedparents' },
    { label: 'Meetings', path: '/educator/meeting' },
    // { label: 'Activities', path: '/educator/viewactivitylibrary' }
];

const EducatorNavbar = ({ homebg = {}, aboutBg = {}, contactbg = {}, navigateToProfile = () => { }, profilebg = {}, educatorDetails = {} }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const toggleNotifications = () => {
        const wasOpen = notificationsOpen;
        setNotificationsOpen(!wasOpen);
        
        if (!wasOpen) {
            setNotifications([
                { id: 1, text: 'New message from Jane Doe', time: '10 min ago', description: 'Regarding tomorrow\'s assignment submission' },
                { id: 2, text: 'Meeting scheduled for tomorrow', time: '1 hour ago', description: 'Parent-teacher meeting at 2:00 PM' },
                { id: 3, text: 'New student assignment submitted', time: '3 hours ago', description: 'Math homework from John Smith' },
                { id: 4, text: 'Parent request accepted', time: '1 day ago', description: 'Sarah Johnson approved your meeting request' },
                { id: 5, text: 'System update available', time: '2 days ago', description: 'New features added to your dashboard' },
            ]);
        }
    };

    const location = useLocation();

    return (
        <AppBar position="static" sx={{ zIndex: 100, boxShadow: "none", backgroundColor: 'transparent', backgroundImage: `url(${contactbg})`, ...homebg, ...aboutBg, ...profilebg, mt: "10px", ...contactbg }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Left side - Logo and Brand */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/educator/home">
                            <Box component="img" src={LogoHub} alt='logo' sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        </Link>
                        <Link to="/educator/home" style={{ textDecoration: "none" }}>
                            <Typography variant="h6" noWrap sx={{
                                mr: 2, display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem',
                                textDecoration: 'none', color: '#384371'
                            }}>
                                LearnHub
                            </Typography>
                        </Link>
                    </Box>

                    {/* Mobile menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon sx={{ color: "#384371" }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.label} to={page.path} onClick={handleCloseNavMenu} component={'Link'}>
                                    <Typography color='primary' sx={{ textAlign: 'center', color: '#1967D2' }}>
                                        {page.label}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* Mobile logo */}
                    <Link to='/educator/home'>
                        <Box component="img" src={LogoHub} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    </Link>
                    <Link to="/educator/home" style={{ textDecoration: "none" }}>
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

                    {/* Desktop menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: "40px" }}>
                        {pages.map((page) => (
                            <Link style={{ textDecoration: "none" }} key={page.label} onClick={handleCloseNavMenu} to={page.path}>
                                <Typography color='primary' sx={{
                                    my: 2, fontSize: "14px", fontWeight: "500", display: 'block', textTransform: "inherit", borderBottom: location.pathname === page.path ? "1px solid #1967D2" : "none", '&:hover': {
                                        borderBottom: "1px solid #1967D2",
                                        color: '#1967D2'
                                    }
                                }}> {page.label}</Typography>
                            </Link>
                        ))}
                    </Box>

                    {/* Right side - Icons and profile */}
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ flexGrow: 0, gap: "30px", position: 'relative' }}>
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
                        
                        <Link to={`/educator/chat`}>
                            <SmsOutlinedIcon color='primary' sx={{ height: '24px', color: location.pathname === `/educator/chat` ? '#1967D2' : 'black' }} />
                        </Link>

                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: "30px" }}>
                            <Typography color='secondary'>Hi, {educatorDetails.name}</Typography>
                            {educatorDetails?.profilePic?.filename ? (
                                <Avatar onClick={navigateToProfile} src={`http://localhost:4000/uploads/${educatorDetails?.profilePic?.filename}`} alt={educatorDetails?.name} />
                            ) : (
                                <Avatar onClick={navigateToProfile}>{educatorDetails?.name?.charAt(0)}</Avatar>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default EducatorNavbar;