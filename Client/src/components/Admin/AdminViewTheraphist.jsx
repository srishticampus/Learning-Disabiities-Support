import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, ButtonGroup, Container, Grid, InputAdornment, Menu, MenuItem, TextField, Typography, alpha, styled, Avatar, Tooltip } from '@mui/material'
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useLocation } from 'react-router-dom';
import AdminViewSingleTherapist from './Common/AdminViewSingleTherapist';
import AdminSideBar from './Common/AdminSideBar';
import AdminLogout from './Common/AdminLogout';

const AdminViewTheraphist = () => {
    // logout
    const [openLogout, setOpenLogout] = useState(false);
    const handleOpenLogout = () => setOpenLogout(true);
    const handleCloseLogout = () => setOpenLogout(false);
    const [activeTab, setActiveTab] = useState('request');


    const StyledTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
            borderRadius: '30px', // Custom border radius
            border: "1px solid black"
        },

    });

    // dropdown
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };



    // fetching all theraphist
    const [theraphist, setTheraphist] = useState([]);
    const [theraphistDetails, setTheraphistDetails] = useState([]);
    const fetchAllTheraphist = async () => {
        const token = localStorage.getItem("token");
        const allTheraphist = await axios.get("http://localhost:4000/ldss/theraphist/getalltheraphist", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(allTheraphist.data.theraphist);
        const theraphist = allTheraphist.data.theraphist;
        setTheraphist(theraphist)
        const unapproved = theraphist.filter(e => e.isAdminApproved === false);
        setTheraphistDetails(unapproved);

    };
    useEffect(() => {
        fetchAllTheraphist();
    }, []);

    
    const approvedTheraphist = () => {
        const approved = theraphist.filter(e => e.isAdminApproved === true);
        setTheraphistDetails(approved)

    };
    const [theraphistdetail, setTheraphistdetail] = useState({});
    const [openTheraphist, setOpenTheraphist] = useState(false);
    const handleTheraphistOpen = () => setOpenTheraphist(true);
    const handleTheraphistClose = () => setOpenTheraphist(false);

    const fetchTheraphistDetail = async (theraphistId) => {
        const token = localStorage.getItem("token");
        const theraphistdetail = await axios.get(`http://localhost:4000/ldss/theraphist/gettheraphist/${theraphistId}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        });
        const theraphist = theraphistdetail.data.theraphist;
        setTheraphistdetail(theraphist);
        handleTheraphistOpen();
        console.log(theraphistdetail.data.theraphist);

    };
    const approve = async (theraphistId) => {
        const token = localStorage.getItem("token");
        const approve = await axios.post(`http://localhost:4000/ldss/admin/theraphist/accept/${theraphistId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(approve);

        fetchAllTheraphist();
        setOpenTheraphist(false);

    }
    const location = useLocation();

    const rejectTheraphist = async (theraphistId) => {
        const token = localStorage.getItem("token");
        const deleteTheraphiat = await axios.delete(`http://localhost:4000/ldss/admin/theraphist/reject/${theraphistId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fetchAllTheraphist();
        setOpenTheraphist(false);
    };
  return (
    <>
      <Container maxWidth="x-lg" sx={{ background: "#F6F7F9" }}>
                <Grid container spacing={2} sx={{ height: "100vh", width: "100%" }}>
                    <Grid size={{ xs: 6, md: 2 }} sx={{ height: "100%", background: "white", margin: "15px 0px", borderRadius: "8px" }} display={'flex'} justifyContent={'start'} alignItems={'center'} flexDirection={'column'}>
                        <AdminSideBar/>

                    </Grid>
                    {/* Content (right part) */}
                    <Grid item xs={6} md={10} sx={{ height: "100%", display: "flex", justifyContent: "start", alignItems: "center", gap: "30px", flexDirection: "column", padding: "15px 0px", borderRadius: "8px", flexGrow: 1 }}>
                        <Box sx={{ height: "70px", background: "white", borderRadius: "8px", width: "100%" }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='h3' sx={{ fontSize: "24px", fontWeight: "500", ml: '20px' }} color='primary'>Theraphist</Typography>
                            <Button onClick={handleOpenLogout} variant="text" color='primary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }} startIcon={<LogoutIcon />}>logout</Button>
                        </Box>

                        {/* switch */}
                        <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
  <Box
    sx={{
      backgroundColor: '#F6F7F9',      // Outer background (matches overall theme)
      borderRadius: '30px',
      padding: '5px',
      display: 'inline-flex',
      transition: 'all 0.3s ease-in-out',
      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.05)'  // Optional subtle inner shadow
    }}
  >
    <Button
      onClick={() => {
        fetchAllTheraphist();
        setActiveTab('request');
      }}
      sx={{
        padding: '8px 20px',
        backgroundColor: activeTab === 'request' ? '#1967D2' : 'transparent',
        color: activeTab === 'request' ? '#fff' : '#000',
        borderRadius: '25px',
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '14px',
        minWidth: '120px',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: activeTab === 'request' ? '#1152b4' : 'rgba(0,0,0,0.04)'
        }
      }}
    >
      Request
    </Button>

    <Button
      onClick={() => {
        approvedTheraphist();
        setActiveTab('therapist');
      }}
      sx={{
        padding: '8px 20px',
        backgroundColor: activeTab === 'therapist' ? '#1967D2' : 'transparent',
        color: activeTab === 'therapist' ? '#fff' : '#000',
        borderRadius: '25px',
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '14px',
        minWidth: '120px',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: activeTab === 'therapist' ? '#1152b4' : 'rgba(0,0,0,0.04)'
        }
      }}
    >
      Therapist
    </Button>
  </Box>
</Box>

                        {/* switch ends */}

                        {/* table */}
                        <Box sx={{ height: "562px", width: "100%", padding: "20px 10px" }}>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography variant='h4' color='primary' sx={{ fontSize: '18px', fontWeight: "600" }}> Requests</Typography>
                                <StyledTextField placeholder='search here...' id="outlined-basic" variant="outlined" InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="primary" />

                                        </InputAdornment>
                                    ),
                                }} />

                            </Box>
                            <Box sx={{ height: "320px" }}>
                                {/* table datas */}
                                <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
                                    <Table sx={{ minWidth: 650, border: "none" }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: "#1967D2" }}>S.NO</TableCell>
                                                <TableCell align="left" sx={{ color: "#1967D2" }}>Profile</TableCell>
                                                <TableCell align="left" sx={{ color: "#1967D2" }}>Name</TableCell>
                                                <TableCell align="left" sx={{ color: "#1967D2" }}>Phone Number</TableCell>
                                                <TableCell align="left" sx={{ color: "#1967D2" }}>Email Id</TableCell>
                                                <TableCell align="left" sx={{ color: "#1967D2" }} >Address</TableCell>
                                                <TableCell align="left" sx={{ color: "#1967D2" }}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {theraphistDetails.map((theraphist, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': {
                                                            border: 0, // Remove border for last row
                                                        },
                                                        '& td, & th': {
                                                            border: 'none', // Remove all borders for cells
                                                        }
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="left">{
                                                        theraphist.profilePic.filename ? (<Avatar src={`http://localhost:4000/uploads/${theraphist.profilePic.filename}`}></Avatar>)
                                                            :
                                                            (<Avatar src={theraphist.name.chartAt(0)}></Avatar>)
                                                    }</TableCell>
                                                    <TableCell align="left">{theraphist.name}</TableCell>

                                                    <TableCell align="left">{theraphist.phone}</TableCell>
                                                    <TableCell align="left">{theraphist.email}</TableCell>
                                                    <TableCell align="left">{theraphist.address}</TableCell>
                                                    <TableCell align="left">{<VisibilityIcon color='secondary' onClick={() => fetchTheraphistDetail(theraphist._id)} />}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </Box>

                        </Box>
                        
                       
                    </Grid>

                </Grid>

                <Modal
                    open={openTheraphist}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={openTheraphist}>
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: "900px",
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                            height: "600px"
                        }}>
                            <AdminViewSingleTherapist theraphistdetail={theraphistdetail} handleTheraphistClose={handleTheraphistClose} approve={approve} rejectTheraphist={rejectTheraphist} />
                        </Box>
                    </Fade>
                </Modal>
                {/* logout modal */}
               <AdminLogout handleCloseLogout={handleCloseLogout} openLogout={openLogout}/>

            </Container>
    </>
  )
}

export default AdminViewTheraphist
