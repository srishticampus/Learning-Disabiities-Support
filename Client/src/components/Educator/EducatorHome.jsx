import React, { useEffect, useState } from 'react'
import EducatorNavbar from '../Navbar/EducatorNavbar';
import "../../Styles/LandingPage.css";
import { Box, Button, Container, Divider, Fade, Grid, Modal, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import background from "../../assets/Frame 12@2x.png";
import image68 from "../../assets/image 68.png";
import image69 from "../../assets/image 69.png";
import image70 from "../../assets/image 70.png";
import image71 from "../../assets/image 71.png";
import verified from "../../assets/verified.png";
import VerifiedIcon from '@mui/icons-material/Verified';
import AVATAR1 from "../../assets/AVATAR1.png";
import AVATAR2 from "../../assets/AVATAR2.png";
import AVATAR3 from "../../assets/AVATAR3.png";
import AVATAR4 from "../../assets/AVATAR4.png";
import user from "../../assets/user.png";
import shopping from "../../assets/Shopping list.png";
import elearning from "../../assets/Elearning.png";
import Footer from '../Footer/Footer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import EducatorViewParentDetails from './Common/EducatorViewParentDetails';

const EducatorHome = () => {
    const homebg = {
        backgroundColor: "#F6F7F9"
    }


    const [educator, setEducator] = useState("");
    const fetchEducator = async () => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const educator = await axios.get(`http://localhost:4000/ldss/educator/geteducator/${decoded.id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const educatorsDetails = localStorage.setItem("educatorDetails",
            JSON.stringify(educator.data.educator));
        setEducator(educator.data.educator);
        // console.log(parent.data.parent.name);
        // console.log(parent.data.parent.profilePic);
        console.log(educator);

    }
    useEffect(() => {
        fetchEducator();
        fetchParentsRequest();
    }, []);

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/educator/profile');
    }

    const [parentRequest, setParentRequest] = useState([]);
    const fetchParentsRequest = async () => {
        const token = localStorage.getItem("token");
        const educatorId = JSON.parse(localStorage.getItem("educatorDetails"))._id;
        const request = await axios.get(`http://localhost:4000/ldss/educator/parentsrequest/${educatorId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const allrequest=request.data.request;
        const unapproved=allrequest.filter((filtered)=>filtered.status==="pending");
        setParentRequest(unapproved);

        console.log(request.data.request);


    };
    const acceptParentrequest = async (requestId) => {
        const token = localStorage.getItem("token");
        const requestaccepted = await axios.put(`http://localhost:4000/ldss/educator/acceptsrequest/${requestId}`,{}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(requestaccepted);
        handleParentClose();
        fetchParentsRequest();

    };
    const rejectParentrequest=async(requestId)=>{
        const token=localStorage.getItem("token");
        const rejectParent=await axios.delete(`http://localhost:4000/ldss/educator/rejectparent/${requestId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log(rejectParent);
        handleParentClose();
        fetchParentsRequest();

    };
    // model
    const [requestDetail, setRequestDetail] = useState({});
    const [openParent, setOpenParent] = useState(false);
    const handleParentOpen = () => setOpenParent(true);
    const handleParentClose = () => setOpenParent(false);
    const fetchParentByRequestId=async(requestId)=>{
        const token=localStorage.getItem("token");
        const parent=await axios.get(`http://localhost:4000/ldss/educator/viewrequestedparent/${requestId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log(parent);
        setRequestDetail(parent.data.viewRequest);
        handleParentOpen();
    }
    return (
        <>
            <EducatorNavbar educatorDetails={educator} homebg={homebg} navigateToProfile={navigateToProfile}/>
            <Container maxWidth="x-lg" sx={{ ...homebg, height: '100vh', position: "relative", overflow: "hidden", zIndex: 2 }}>
                <Box component="img" src={background} alt='background'
                    sx={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: 'cover', zIndex: -1 }}
                >

                </Box>
                <Stack direction="row" spacing={2} sx={{ padding: "80px 50px", zIndex: 1, }}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                        <Box sx={{
                            position: "relative",
                            width: "262px",
                            height: "55px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid transparent",
                            borderImage: "linear-gradient(to right, #1967D2, #F6F7F9) 1",
                            borderRadius: "25px",
                            overflow: "hidden",
                            backgroundSize: "cover",
                            zIndex: 1,


                        }}>

                            <Typography variant="p" component="h6" color='primary'
                                sx={{ fontSize: "14px", fontWeight: 500, margin: "10px 0px" }}
                            >
                                <StarIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: "#FFAE00" }} />
                                Welcome to learn hub
                            </Typography>


                        </Box>
                        <Box>
                            <Typography variant="h1" component="h1" color='primary'
                                sx={{ fontSize: "56px", fontWeight: 600, marginTop: 2, margin: "10px 0px" }}
                            >
                                Empowering Every
                            </Typography>
                            <Typography variant="h1" component="h1" color='secondary'
                                sx={{ fontSize: "56px", fontWeight: 600, marginTop: 2, margin: "10px 0px" }}
                            >
                                Child’s Learning
                            </Typography>
                            <Typography variant="h1" component="h1" color='primary'
                                sx={{ fontSize: "56px", fontWeight: 600, marginTop: 2, margin: "10px 0px" }}
                            >
                                Journey
                            </Typography>
                            <Typography variant="p" component="p" color='primary'
                                sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "25px", marginTop: 2, margin: "10px 0px", textAlign: "justify", marginRight: "250px" }}
                            >
                                A one-stop platform connecting parents, educators, and therapists to support children with learning disabilities through personalized learning plans, activity tracking, and seamless collaboration.
                            </Typography>

                        </Box>


                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Grid container spacing={1}
                            sx={{ width: "615px", height: "510px", position: "relative" }}
                        >
                            <Box sx={{ width: "264px", height: "62px", backgroundColor: 'white', borderRadius: "5px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "5px 3px", position: 'absolute', top: "30px", left: "-35px" }} >


                                <Typography variant='p' color="primary" sx={{ fontSize: "14px" }}>
                                    <VerifiedIcon color='secondary' />
                                    Thousands of Verified educators & therapist!
                                </Typography>

                            </Box>
                            <Box sx={{ width: "195px", height: "118px", backgroundColor: '#DBE8FA', borderRadius: "5px", padding: "5px 3px", position: 'absolute', bottom: "-85px", right: "-35px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                <Box sx={{ width: "165px", height: "88px", backgroundColor: 'white', borderRadius: "5px", padding: "5px 3px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Box component="img" src={AVATAR1} alt='avatar' sx={{ width: "41px", height: "39px" }}></Box>
                                        <Box component="img" src={AVATAR2} alt='avatar' sx={{ width: "41px", height: "39px", marginLeft: "-20px" }}></Box>
                                        <Box component="img" src={AVATAR3} alt='avatar' sx={{ width: "41px", height: "39px", marginLeft: "-20px" }}></Box>
                                        <Box component="img" src={AVATAR4} alt='avatar' sx={{ width: "41px", height: "39px", marginLeft: "-20px" }}></Box>
                                    </Box>
                                    <Typography>
                                        200k+ Learning
                                    </Typography>

                                </Box>
                            </Box>
                            <Grid size={9}>
                                <Box component="img" src={image68} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}>

                                </Box>
                            </Grid>
                            <Grid size={3}>
                                <Box component="img" src={image69} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}>

                                </Box>
                            </Grid>
                            <Grid size={5}>
                                <Box component="img" src={image70} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}>

                                </Box>
                            </Grid>
                            <Grid size={7}>
                                <Box component="img" src={image71} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                </Stack>
            </Container >
            <Container maxWidth="x-lg" display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} justifyContent={"center"} sx={{ height: "100%", background: "#F0F6FE", paddingBottom: "100px", mt: "100px" }}>

                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} justifyContent={"center"} sx={{ height: "113px", }}>
                    {parentRequest.length>0 && <Typography variant='h4' color='primary' sx={{ fontSize: "32px", fontWeight: "600", marginTop: "50px" }}>Parent's request</Typography>}

                </Box>
                <Box>
                    {/* cards */}

                    {parentRequest.length===0 ?
                (<Typography textAlign={'center'} variant='h4' color='primary' sx={{ fontSize: "32px", fontWeight: "600", marginTop: "50px" }}>No  parents request found</Typography>) 
                 :
                (
                <Grid display="flex" flexDirection="row" alignItems="center" justifyContent="center" container spacing={3} sx={{ marginTop: "100px" }}>
                {parentRequest.map((parent, index) => (
                    <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                        <Card sx={{ maxWidth: "410px", height: "197px", borderRadius: "20px", padding: "20px" }}>
                            <CardActionArea>
                                <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "157px" }}>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" sx={{ height: "150px", gap: "10px" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ height: "150px", width: '150px', borderRadius: "10px", flexShrink: 0 }}
                                            image={`http://localhost:4000/uploads/${parent.parentId.profilePic.filename}`}
                                            alt="Profile"
                                        />
                                        <CardContent
                                            sx={{
                                                height: "150px",
                                                overflow: "hidden",
                                                padding: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between"
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="h6" color='primary'>
                                                    {parent.parentId?.name}
                                                </Typography>
                                                <Typography sx={{ color: '#7F7F7F', fontSize: "13px", fontWeight: "500" }}>
                                                    {parent.parentId.address}
                                                </Typography>
                                                <Typography sx={{ color: '#7F7F7F', fontSize: "13px", fontWeight: "500" }}>
                                                    {parent.parentId.phone}
                                                </Typography>
                                                <Box onClick={()=>fetchParentByRequestId(parent._id)}>View all</Box>
                                            </Box>



                                            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                                <Button onClick={()=>rejectParentrequest(parent._id)} variant='text' color='secondary' sx={{ borderRadius: "25px", height: "35px", width: '100px', padding: '10px 35px',mt:"10px",border:"1px solid #1967D2" }}
                                                    
                                                >Reject</Button>
                                                <Button onClick={()=>acceptParentrequest(parent._id)} variant='contained' color='secondary' sx={{ borderRadius: "25px", height: "35px", width: '100px', padding: '10px 35px',mt:"10px" }}
                                                    
                                                    >Accept</Button>

                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Box>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>)  
                }

                    


                </Box>
                <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'} sx={{ marginRight: "150px", paddingTop: "30px" }}>
                    <Link to={`/educator/parentsrequest`}><Typography>view more <span><ArrowRightAltIcon /></span></Typography></Link>
                </Box>


            </Container>
            <Container maxWidth="x-lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "30px 0px", height: '100vh' }}>
                <Stack spacing={2} sx={{ width: "305px", height: "88px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    <Box>
                        <Typography color='primary' variant='h3' sx={{ fontSize: "32px", fontWeight: "600" }}>
                            How it Works
                        </Typography>
                    </Box>
                    <Box>
                        <Typography color='primary' variant='p' sx={{ fontSize: "14px", fontWeight: "500" }}>
                            Find the perfect learning in just a few steps
                        </Typography>
                    </Box>

                </Stack>

                <Stack direction="row" spacing={2} sx={{ height: "210px", display: "flex", alignItems: 'center', gap: "20px", marginTop: "90px" }}>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={user} sx={{}}>
                        </Box>
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Build Profiles
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Parents add child details; educators & <br /> therapists set expertise.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={elearning} sx={{}}>
                        </Box>
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Start Learning
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Access personalized plans, track progress,<br />
                                and collaborate.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={shopping} sx={{}}>
                        </Box>
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Monitor & Improve
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Receive insights, expert advice, and <br />
                                ongoing support.
                            </Typography>
                        </Box>
                    </Box>

                </Stack>
                <Modal
                    open={openParent}
                    onClose={handleParentClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={openParent}>
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
                            height: "700px",
                            width:"1080px",
                            overflowY:"scroll"
                        }}>
                            <EducatorViewParentDetails acceptParentrequest={acceptParentrequest} rejectParentrequest={rejectParentrequest} handleParentClose={handleParentClose} requestDetail={requestDetail}/>
                        </Box>
                    </Fade>
                </Modal>

            </Container>
            <Footer/>

        </>
    )
}

export default EducatorHome
