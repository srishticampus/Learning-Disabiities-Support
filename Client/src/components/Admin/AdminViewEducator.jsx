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
import AdminViewSingleEducator from './Common/AdminViewSingleEducator';
import AdminSideBar from './Common/AdminSideBar';
import AdminLogout from './Common/AdminLogout';


const AdminViewEducator = () => {
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



    // fetching all educators
    const [educator, setEducator] = useState([])
    const [educatorDetails, setEducatorDetails] = useState([]);
    const fetchAllEducators = async () => {
        const token = localStorage.getItem("token");
        const alleducators = await axios.get("http://localhost:4000/ldss/educator/getalleducators", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(alleducators.data.educators);
        const educators = alleducators.data.educators;
        setEducator(educators)
        const unapproved = educators.filter(e => e.isAdminApproved === false);
        setEducatorDetails(unapproved);

    };
    useEffect(() => {
        fetchAllEducators();
    }, []);

    // const [approvedEducatorDetails,setApprovedEducatordetails]=useState([]);
    const approvedEducators = () => {
        const approved = educator.filter(e => e.isAdminApproved === true);
        setEducatorDetails(approved)

    };
    const [educatordetail, setEducatordetail] = useState({});
    const [openeducator, setOpenEducator] = useState(false);
    const handleEducatorOpen = () => setOpenEducator(true);
    const handleEducatorClose = () => setOpenEducator(false);

    const fetchEducatorDetail = async (educatorId) => {
        const token = localStorage.getItem("token");
        const educatordetail = await axios.get(`http://localhost:4000/ldss/educator/geteducator/${educatorId}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        });
        const educator = educatordetail.data.educator;
        setEducatordetail(educator);
        handleEducatorOpen();
        console.log(educatordetail.data.educator);

    };
    const approve = async (educatorId) => {
        const token = localStorage.getItem("token");
        const approve = await axios.post(`http://localhost:4000/ldss/admin/educator/accept/${educatorId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(approve);

        fetchAllEducators();
        setOpenEducator(false);

    }
    

    const rejectEducator = async (educatorId) => {
        const token = localStorage.getItem("token");
        const deleteEducator = await axios.delete(`http://localhost:4000/ldss/admin/educator/reject/${educatorId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        fetchAllEducators();
        setOpenEducator(false);
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
                            <Typography variant='h3' sx={{ fontSize: "24px", fontWeight: "500", ml: '20px' }} color='primary'>Educators</Typography>
                            <Button onClick={handleOpenLogout} variant="text" color='primary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }} startIcon={<LogoutIcon />}>logout</Button>
                        </Box>

                        {/* switch */}
<Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
  <Box
    sx={{
      backgroundColor: '#F6F7F9', // Background container
      borderRadius: '30px',
      padding: '5px',
      display: 'inline-flex',
      transition: 'all 0.3s ease-in-out',
      boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.05)' // optional subtle inner shadow
    }}
  >
    <Button
      onClick={() => {
        fetchAllEducators();
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
        approvedEducators();
        setActiveTab('educator');
      }}
      sx={{
        padding: '8px 20px',
        backgroundColor: activeTab === 'educator' ? '#1967D2' : 'transparent',
        color: activeTab === 'educator' ? '#fff' : '#000',
        borderRadius: '25px',
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '14px',
        minWidth: '120px',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: activeTab === 'educator' ? '#1152b4' : 'rgba(0,0,0,0.04)'
        }
      }}
    >
      Educator
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
                                            {educatorDetails.map((educator, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': {
                                                            border: 0, 
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
                                                        educator.profilePic.filename ? (<Avatar src={`http://localhost:4000/uploads/${educator.profilePic.filename}`}></Avatar>)
                                                            :
                                                            (<Avatar src={educator.name.charAt(0)}></Avatar>)
                                                    }</TableCell>
                                                    <TableCell align="left">{educator.name}</TableCell>

                                                    <TableCell align="left">{educator.phone}</TableCell>
                                                    <TableCell align="left">{educator.email}</TableCell>
                                                    <TableCell align="left">{educator.address}</TableCell>
                                                    <TableCell align="left">{<VisibilityIcon color='secondary' onClick={() => fetchEducatorDetail(educator._id)} />}</TableCell>
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
                    open={openeducator}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={openeducator}>
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
                            <AdminViewSingleEducator educatordetail={educatordetail} handleEducatorClose={handleEducatorClose} approve={approve} rejectEducator={rejectEducator} />
                        </Box>
                    </Fade>
                </Modal>
                {/* logout modal */}
               <AdminLogout handleCloseLogout={handleCloseLogout} openLogout={openLogout}/>

            </Container>
        </>
    )
}

export default AdminViewEducator
