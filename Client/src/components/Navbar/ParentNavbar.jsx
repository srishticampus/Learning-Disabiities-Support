
import React, { useEffect, useState } from 'react';
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
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import LogoHub from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

const pages = [
    { label: 'Home', path: '/parent/home' },
    { label: 'About', path: '/parent/about' },
    { label: 'Contact', path: '/parent/contact' },
    { label: 'Child', path: '/parent/childprofile' },
    { label: 'learning', path: '/parent/learningplan' },
    { label: 'Meetings', path: '/parent/meeting' },
    { label: 'Activities', path: '/parent/activites' },
    
];

const ParentNavbar = ({ homebg = {},aboutBg={}, profilebg = {}, navigateToProfile = () => { }, parentdetails={},contactbg={} }) => {
    // console.log(parent.profilePic?.filename, "from navbar");
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    
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

    const location = useLocation();
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: 'transparent',boxShadow:"none", backgroundImage: `url(${contactbg})`,...profilebg, ...aboutBg, ...homebg ,zIndex:100}}>
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
                            <Link to="/parent/home">
                                <Box component="img" src={LogoHub} alt='logo'
                                    sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>

                                </Box>
                            </Link>
                            <Link to="/parent/home" style={{ textDecoration: "none" }}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'flex' },
                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.3rem',
                                        // color: '#384371',
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
                        <Link to='/parent/home'>
                            <Box component="img" src={LogoHub} sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} ></Box>
                        </Link>
                        <Link to="/parent/home" style={{ textDecoration: "none" }}>
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
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ flexGrow: 0, gap: "30px" }}>
                            <Link to={'/parent/chat'}><SmsOutlinedIcon color='primary' sx={{ height: '24px' }} /></Link>
                            <NotificationsOutlinedIcon color='primary' sx={{ height: '24px' }} />
                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: "30px" }}>
                                <Typography color='secondary'>Hi, {parentdetails?.name}</Typography>
                                {/* <Avatar/> */}
                                {parentdetails?.profilePic?.filename ? (
                                    <Avatar src={`http://localhost:4000/uploads/${parentdetails?.profilePic?.filename}`} alt={parentdetails?.name} onClick={navigateToProfile} />
                                ) : (
                                    <Avatar onClick={navigateToProfile}>{parentdetails?.name?.charAt(0)}</Avatar>
                                )}


                            </Box>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default ParentNavbar
