import { Avatar, Box, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import SpaIcon from '@mui/icons-material/Spa';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation} from 'react-router-dom';
import { toast } from 'react-toastify';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import AdminSideBar from './Common/AdminSideBar';
import AdminLogout from './Common/AdminLogout';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';


const AdminDashboard = () => {
    // logout
    const [openLogout, setOpenLogout] = useState(false);
    const handleOpenLogout = () => setOpenLogout(true);
    const handleCloseLogout = () => setOpenLogout(false);

    // fetching parents
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

    // fetching all childs
    const [child, setChild] = useState([]);
    const fetchAllChildren = async () => {
        const token = localStorage.getItem("token");
        const allchildren = await axios.get("http://localhost:4000/ldss/parent/getallchild", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(allchildren.data.child);
        setChild(allchildren.data.child)
        

    };


    // fetching all educators
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
    
        const unapproved = educators.filter(e => e.isAdminApproved === false);
        setEducatorDetails(unapproved);

    }; 
    // fetching all educators count
    const [educator, setEducator] = useState([]);
    const fetchAllEducatorsCount = async () => {
        const token = localStorage.getItem("token");
        const alleducators = await axios.get("http://localhost:4000/ldss/educator/getalleducators", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(alleducators.data.educators);
        
        const educators = alleducators.data.educators;
    
        const unapproved = educators.filter(e => e.isAdminApproved === true);
        setEducator(unapproved);

    }; 
    

    // fetching all theraphistCount
   
    const [theraphist, setTheraphist] = useState([]);
    const fetchAllTheraphistCount = async () => {
        const token = localStorage.getItem("token");
        const allTheraphist = await axios.get("http://localhost:4000/ldss/theraphist/getalltheraphist", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(allTheraphist.data.theraphist);
        const theraphist = allTheraphist.data.theraphist;
        
        const unapproved = theraphist.filter(e => e.isAdminApproved === true);
        setTheraphist(unapproved);;

    };
    
    // fetching all theraphist
   
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
        
        const unapproved = theraphist.filter(e => e.isAdminApproved === false);
        setTheraphistDetails(unapproved);;

    };
    
    useEffect(() => {
        fetchAllEducators();
        fetchAllTheraphist();
        fetchAllParents();
        fetchAllChildren();
        fetchAllEducatorsCount();
        fetchAllTheraphistCount();

    }, []);
    
    
    
    const location=useLocation();
    return (
        <>
            <Box display={"flex"} sx={{ background: "#F6F7F9", p: "30px", height: "100%",width:"100%" }}>
                {/* <Box sx={{ background: "white", width: "250px", height: "100%", borderRadius: "15px" ,pl:"20px"}}>
                    <Link to={`admin/dashboard`}>
                    <Box sx={{ width: "122px", height: "30px", marginTop: "30px" }} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'}>
                        <Box component="img" src={adminlogo} sx></Box>
                        <Typography sx={{ fontSize: "18px", fontWeight: "600" }}>LearnHub</Typography>
                    </Box></Link>

                    <Box sx={{ height: "100%", marginTop: "20px" }}>
                    <Link to={`/admin/dashboard`} style={{textDecoration:"none"}}> 
                        <Box sx={{ height: "40px", marginBottom: "10px" }} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={2}>
                            <DashboardIcon color='primary' sx={{ width: "24px" }} />
                            <Typography color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>Dashboard</Typography>
                        </Box>
                        </Link>
                        <Box sx={{ height: "40px", marginBottom: "10px" }} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={2}>
                            <SupervisedUserCircleIcon color='primary' sx={{ width: "24px" }} />
                            <Typography color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>Parent</Typography>
                        </Box>
                        <Link to={`/admin/viewEducator`} style={{textDecoration:"none"}}> 
                          <Box sx={{ height: "40px", marginBottom: "10px" }} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={2}>
                           <SchoolIcon color='primary' sx={{ width: "24px" }} />
                            <Typography color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>Educator</Typography>
                        </Box>
                        </Link>
                        <Link to={`/admin/viewtheraphist`} style={{textDecoration:"none"}}> 
                        <Box sx={{ height: "40px", marginBottom: "10px" }} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={2}>
                            <SpaIcon color='primary' sx={{ width: "24px" }} />
                            <Typography color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>Therapist</Typography>
                        </Box>
                        </Link>
                        <Box sx={{ height: "40px", marginBottom: "10px" }} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={2}>
                            <ListAltIcon color='primary' sx={{ width: "24px" }} />
                            <Typography color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>Activity Library</Typography>
                        </Box>
                        <Box sx={{ height: "40px", marginBottom: "10px" }} display={'flex'} justifyContent={'start'} alignItems={'center'} gap={2}>
                            <NotificationsIcon color='primary' sx={{ width: "24px" }} />
                            <Typography color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>Noitification</Typography>
                        </Box>

                    </Box>
                </Box> */}
                <AdminSideBar/>

                {/* Content (right part) */}
                <Box sx={{ height: "100%",width:"100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "start", padding: "0px 15px", borderRadius: "8px", flexGrow: 1 }}>
                    <Box sx={{ height: "70px", background: "white", borderRadius: "8px", width: "100%" }} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography variant='h3' sx={{ fontSize: "24px", fontWeight: "500", ml: "30px" }} color='primary'>Dashboard</Typography>
                        <Button onClick={handleOpenLogout} variant="text" color='primary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }} startIcon={<LogoutIcon />}>logout</Button>
                    </Box>

                    <Grid container spacing={2} sx={{ mt: "30px" ,width:"100%"}}>
                        <Grid item xs={6} md={3} width={"24%"}>
                            <Box display={'flex'} justifyContent={'start'} alignItems={'start'} flexDirection={'column'} sx={{ width: "100%", height: "138px", background: "#FFFFFF",p:"20px",gap:"15px" }}>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={"100%"} sx={{}}>
                                    <PeopleOutlineIcon sx={{color:"#1967D2"}} />
                                    <Box display={'flex'} justifyContent={'start'} alignItems={'center'} gap={1}>
                                        <TrendingUpIcon sx={{color: "#4CAF50"}}/>
                                        <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#4CAF50" }}>12 %</Typography>

                                    </Box>

                                </Box>
                                <Typography color='primary' variant='h6' sx={{ fontSize: "16px", fontWeight: "500" }}>Total Students</Typography>
                                <Typography color='primary' variant='h5' sx={{ fontSize: "24px", fontWeight: "500" }}>{child.length}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3} width={"24%"}>
                            <Box display={'flex'} justifyContent={'start'} alignItems={'start'} flexDirection={'column'} sx={{ width: "100%", height: "138px", background: "#FFFFFF",p:"20px",gap:"15px" }}>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={"100%"} sx={{}}>
                                    <SchoolIcon sx={{color:"#1967D2"}} />
                                    <Box display={'flex'} justifyContent={'start'} alignItems={'center'} gap={1}>
                                    <TrendingUpIcon sx={{color: "#4CAF50"}}/>
                                        <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#4CAF50" }}>12 %</Typography>

                                    </Box>

                                </Box>
                                <Typography color='primary' variant='h6' sx={{ fontSize: "16px", fontWeight: "500" }}>Total Educators</Typography>
                                <Typography color='primary' variant='h5' sx={{ fontSize: "24px", fontWeight: "500" }}>{educator.length}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3} width={"24%"}>
                            <Box display={'flex'} justifyContent={'start'} alignItems={'start'} flexDirection={'column'} sx={{ width: "100%", height: "138px", background: "#FFFFFF",p:"20px",gap:"15px" }}>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={"100%"} sx={{}}>
                                    <SpaIcon sx={{color:"#1967D2"}}/>
                                    <Box display={'flex'} justifyContent={'start'} alignItems={'center'} gap={1}>
                                    <TrendingUpIcon sx={{color: "#4CAF50"}}/>
                                        <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#4CAF50" }}>12 %</Typography>

                                    </Box>

                                </Box>
                                <Typography color='primary' variant='h6' sx={{ fontSize: "16px", fontWeight: "500" }}>Total Theraphist</Typography>
                                <Typography color='primary' variant='h5' sx={{ fontSize: "24px", fontWeight: "500" }}>{theraphist.length}</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={3} width={"24%"}>
                            <Box display={'flex'} justifyContent={'start'} alignItems={'start'} flexDirection={'column'} sx={{ width: "100%", height: "138px", background: "#FFFFFF",p:"20px",gap:"15px" }}>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={"100%"} sx={{}}>
                                    <PersonIcon sx={{color:"#1967D2"}}/>
                                    <Box display={'flex'} justifyContent={'start'} alignItems={'center'} gap={1}>
                                    <TrendingUpIcon sx={{color: "#4CAF50"}}/>
                                        <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#4CAF50" }}>12 %</Typography>

                                    </Box>

                                </Box>
                                <Typography color='primary' variant='h6' sx={{ fontSize: "16px", fontWeight: "500" }}>Total Parents</Typography>
                                <Typography color='primary' variant='h5' sx={{ fontSize: "24px", fontWeight: "500" }}>{parentDetails.length}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    {/* theraphist table starts */}
<Box sx={{width:"100%",height:"450px",background:"white",borderRadius:"15px",mt:"15px"}}>
    <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        {!theraphistDetails.length ? (
            <Typography sx={{fontSize:"18px",fontWeight:"600",pl:"20px",pt:"20px"}} color='primary' variant='h4'>
                No Theraphist Request
            </Typography>
        ) : (
            <Typography sx={{fontSize:"18px",fontWeight:"600",pl:"20px",pt:"20px"}} color='primary' variant='h4'>
                Theraphist Request
            </Typography>
        )}
        <Link sx={{ ml: "auto", pr: 5, pt: 2 }} to={'/admin/viewtheraphist'}> {/* Added padding and margin-left auto */}
            <Typography variant='h6' sx={{fontSize:"14px",mr:2}}>View All</Typography>
        </Link>
    </div>                    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
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
                                            {theraphistDetails.map((theraphist,index) => (
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
                                                        {index+ 1}
                                                    </TableCell>
                                                    <TableCell align="left">{
                                                        theraphist.profilePic.filename ? (<Avatar src={`http://localhost:4000/uploads/${theraphist.profilePic.filename}`}></Avatar>)
                                                            :
                                                            (<Avatar src={educator.name.charAt(0)}></Avatar>)
                                                    }</TableCell>
                                                    <TableCell align="left">{theraphist.name}</TableCell>
                                                    <TableCell align="left">{theraphist.phone}</TableCell>
                                                    <TableCell align="left">{theraphist.email}</TableCell>
                                                    <TableCell align="left">{theraphist.address}</TableCell>
                                                    <TableCell align="left">{<VisibilityIcon color='secondary'/>}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                    </Box>
                    {/* theraphist table ends */}

                    {/* educator table starts */}
<Box sx={{ width: "100%", height: "450px", background: "white", borderRadius: "15px", mt: "15px" }}>
  <Box sx={{ display: "flex", alignItems: "center", px: "20px", pt: "20px" }}>
    {!educatorDetails.length ? (
      <Typography sx={{ fontSize: "18px", fontWeight: "600" }} color='primary' variant='h4'>
        No Educator Request
      </Typography>
    ) : (
      <Typography sx={{ fontSize: "18px", fontWeight: "600" }} color='primary' variant='h4'>
        Educator Request
      </Typography>
    )}
    <Box sx={{ flexGrow: 1 }} /> {/* This pushes the Link to the right */}
    <Link sx={{ textDecoration: "none", cursor: "pointer" }} to={'/admin/viewEducator'}>
            <Typography variant='h6' sx={{fontSize:"14px",mr:2}}>View All</Typography>
    </Link>
  </Box>

  <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
    <Table sx={{ minWidth: 650, border: "none" }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell sx={{ color: "#1967D2" }}>S.NO</TableCell>
          <TableCell align="left" sx={{ color: "#1967D2" }}>Profile</TableCell>
          <TableCell align="left" sx={{ color: "#1967D2" }}>Name</TableCell>
          <TableCell align="left" sx={{ color: "#1967D2" }}>Phone Number</TableCell>
          <TableCell align="left" sx={{ color: "#1967D2" }}>Email Id</TableCell>
          <TableCell align="left" sx={{ color: "#1967D2" }}>Address</TableCell>
          <TableCell align="left" sx={{ color: "#1967D2" }}>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {educatorDetails.map((educator, index) => (
          <TableRow
            key={index}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              '& td, & th': { border: 'none' }
            }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="left">
              {educator.profilePic.filename ? (
                <Avatar src={`http://localhost:4000/uploads/${educator.profilePic.filename}`} />
              ) : (
                <Avatar>{educator.name.charAt(0)}</Avatar>
              )}
            </TableCell>
            <TableCell align="left">{educator.name}</TableCell>
            <TableCell align="left">{educator.phone}</TableCell>
            <TableCell align="left">{educator.email}</TableCell>
            <TableCell align="left">{educator.Address}</TableCell>
            <TableCell align="left">
              <VisibilityIcon color='secondary' />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Box>
                    {/* educator table ends */}
                </Box>
                {/* logout modal */}
               <AdminLogout handleCloseLogout={handleCloseLogout} openLogout={openLogout}/>
            </Box>
        </>
    )
}

export default AdminDashboard