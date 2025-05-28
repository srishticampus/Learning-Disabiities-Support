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
import AdminViewSingleParent from './Common/AdminViewSingleParent';
import AdminLogout from './Common/AdminLogout';

const AdminViewParent = () => {
    const [openLogout, setOpenLogout] = useState(false);
    const handleOpenLogout = () => setOpenLogout(true);
    const handleCloseLogout = () => setOpenLogout(false);
    
    
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



    // fetching all parents
    
    const [parentDetails, setParentDetails] = useState([]);
    const fetchAllParents = async () => {
        const token = localStorage.getItem("token");
        const allparents = await axios.get("http://localhost:4000/ldss/parent/getallparents", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(allparents.data.allparents);
        setParentDetails(allparents.data.allparents)
        

    };
    useEffect(() => {
        fetchAllParents();
    }, []);

    const [parentdetail, setParentdetail] = useState({});
    const [openparent, setOpenparent] = useState(false);
    const handleParentOpen = () => setOpenparent(true);
    const handleParentClose = () => setOpenparent(false);

    const fetchParentDetail = async (parentId) => {
        const token = localStorage.getItem("token");
        const parentdetail = await axios.get(`http://localhost:4000/ldss/parent/getparent/${parentId}`, {
            headers: {
                Authorization: `bearer ${token}`
            }
        });
        const parent = parentdetail.data.parent;
        setParentdetail(parent);
        handleParentOpen();
        console.log(parentdetail.data.parent);

    };
    return (
        <>
            <Container maxWidth="x-lg" sx={{ background: "#F6F7F9" }}>
                <Grid container spacing={2} sx={{ height: "100vh", width: "100%" }}>
                    <Grid size={{ xs: 6, md: 2 }} sx={{ height: "100%", background: "white", margin: "15px 0px", borderRadius: "8px" }} display={'flex'} justifyContent={'start'} alignItems={'center'} flexDirection={'column'}>
                        <AdminSideBar />
                    </Grid>
                    {/* Content (right part) */}
                    <Grid item xs={6} md={10} sx={{ height: "100%", display: "flex", justifyContent: "start", alignItems: "center", gap: "30px", flexDirection: "column", padding: "15px 0px", borderRadius: "8px", flexGrow: 1 }}>
                        <Box sx={{ height: "70px", background: "white", borderRadius: "8px", width: "100%" }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Typography variant='h3' sx={{ fontSize: "24px", fontWeight: "500", ml: '20px' }} color='primary'>Parents</Typography>
                            <Button onClick={handleOpenLogout} variant="text" color='primary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }} startIcon={<LogoutIcon />}>logout</Button>
                        </Box>



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
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {parentDetails.map((parent, index) => (
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
                                                        parent.profilePic?.filename ? (<Avatar src={`http://localhost:4000/uploads/${parent.profilePic?.filename}`}></Avatar>)
                                                            :
                                                            (<Avatar src={parent.name.charAt(0)}></Avatar>)
                                                    }</TableCell>
                                                    <TableCell align="left">{parent.name}</TableCell>

                                                    <TableCell align="left">{parent.phone}</TableCell>
                                                    <TableCell align="left">{parent.email}</TableCell>
                                                    <TableCell align="left">{parent.address}</TableCell>
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
                    open={openparent}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={openparent}>
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
                            <AdminViewSingleParent parentdetail={parentdetail} handleParentClose={handleParentClose} />
                        </Box>
                    </Fade>
                </Modal>
                {/* logout modal */}
               <AdminLogout handleCloseLogout={handleCloseLogout} openLogout={openLogout}/>

            </Container>
        </>
    )
}

export default AdminViewParent
