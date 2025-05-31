import React, { useEffect, useState } from 'react';
import TheraphistNavbar from '../Navbar/TheraphistNavbar';
import "../../Styles/LandingPage.css";
import { Box, Button, Container, Divider, Fade, Grid, Modal, Stack, Typography, Card, CardContent, CardMedia, Breadcrumbs } from '@mui/material';
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
import keyFeatures1 from "../../assets/image 74.png";
import keyFeatures2 from "../../assets/image 73.png";
import keyFeatures3 from "../../assets/image 75.png";
import keyFeatures4 from "../../assets/image 72.png";
import frame1 from "../../assets/Frame 48095593.png";
import frame2 from "../../assets/Frame 48095594.png";
import Footer from '../Footer/Footer';
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Backdrop from '@mui/material/Backdrop';
import TherapistViewParentDetails from './Common/TherapistViewParentDetails';

const TheraphistHome = () => {
    const homebg = {
        backgroundColor: "#F6F7F9"
    };

    const [therapistDetails, setTherapistDetails] = useState({});
    const [parentRequest, setParentRequest] = useState([]);
    const [requestDetail, setRequestDetail] = useState(null);
    const [openParent, setOpenParent] = useState(false);
    const navigate = useNavigate();

    const fetchTherapist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const decoded = jwtDecode(token);
            const response = await axios.get(`http://localhost:4000/ldss/theraphist/gettheraphist/${decoded.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data?.theraphist) {
                const data = response.data.theraphist;
                localStorage.setItem("theraphistDetails", JSON.stringify(data));
                setTherapistDetails(data);
            }
        } catch (error) {
            console.error("Error fetching therapist:", error);
        }
    };

    const fetchParentsRequest = async () => {
        try {
            const token = localStorage.getItem("token");
            const therapistId = therapistDetails._id;
            if (!therapistId) return;
            const response = await axios.get(
                `http://localhost:4000/ldss/theraphist/parentsrequest/${therapistId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data?.request) {
                setParentRequest(response.data.request);
            }
        } catch (error) {
            console.error("Failed to fetch parent requests:", error);
        }
    };

    const fetchParentByRequestId = async (requestId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:4000/ldss/theraphist/viewrequestedparent/${requestId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data?.viewRequest) {
                setRequestDetail(response.data.viewRequest);
                setOpenParent(true);
            }
        } catch (error) {
            console.error("Failed to fetch parent details:", error);
        }
    };

    const acceptParentRequest = async (requestId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:4000/ldss/theraphist/acceptrequest/${requestId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchParentsRequest();
            setOpenParent(false);
        } catch (error) {
            console.error("Failed to accept request:", error);
        }
    };

    const rejectParentRequest = async (requestId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:4000/ldss/theraphist/rejectrequest/${requestId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchParentsRequest();
            setOpenParent(false);
        } catch (error) {
            console.error("Failed to reject request:", error);
        }
    };

    const handleParentClose = () => {
        setOpenParent(false);
        setRequestDetail(null);
    };

    useEffect(() => {
        fetchTherapist();
    }, []);

    useEffect(() => {
        if (therapistDetails._id) {
            fetchParentsRequest();
        }
    }, [therapistDetails]);

    const navigateToProfile = () => {
        navigate('/therapist/profile');
    };

    return (
        <>
            <TheraphistNavbar
                theraphistdetails={therapistDetails}
                navigateToProfile={navigateToProfile}
            />
            <Container maxWidth="x-lg" sx={{ ...homebg, height: '100vh', position: "relative", overflow: "hidden", zIndex: 2 }}>                <Box component="img" src={background} alt='background'
                    sx={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: 'cover', zIndex: -1 }}
                />
                <Stack direction="row" spacing={2} sx={{ padding: "80px 50px", zIndex: 1 }}>
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
                                Child's Learning
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
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                            </Grid>
                            <Grid size={3}>
                                <Box component="img" src={image69} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                            </Grid>
                            <Grid size={5}>
                                <Box component="img" src={image70} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                            </Grid>
                            <Grid size={7}>
                                <Box component="img" src={image71} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }} />
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </Container>

            {/* Parent Requests Section */}
            <Container maxWidth="x-lg" sx={{ background: "#F0F6FE", py: 6 }}>
                <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant='h4' color='primary' sx={{ fontSize: "32px", fontWeight: "600" }}>
                        Parent's Requests
                    </Typography>
                </Box>
                
                <Box sx={{ 
                    width: "100%", 
                    py: 4,
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 3,
                        width: "100%",
                        maxWidth: "1200px",
                        px: 3
                    }}>
                        {parentRequest.filter(request => request.status === "pending").length === 0 ? 
                            (<Typography sx={{ 
                                fontSize: "32px", 
                                gridColumn: "1 / -1",
                                textAlign: "center"
                            }} color='primary'>No request found</Typography>)
                            :
                            (parentRequest.filter(request => request.status === "pending")
                            .map((request, index) => (   
                                <Card key={index} sx={{ 
                                    height: "205px", 
                                    borderRadius: "20px", 
                                    p: "20px",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    '&:hover': {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                                    }
                                }}>
                                    <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                                        <Box display="flex" sx={{ 
                                            height: "100%", 
                                            gap: "1px",
                                            width: "100%"
                                        }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ 
                                                    height: "150px", 
                                                    width: "150px", 
                                                    borderRadius: "10px", 
                                                    flexShrink: 0 
                                                }}
                                                image={`http://localhost:4000/uploads/${request.parentId.profilePic.filename}`}
                                                alt="Profile"
                                            />
                                            <Box sx={{
                                                height: "100%",
                                                overflow: "hidden",
                                                pl: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                flexGrow: 1
                                            }}>
                                                <Box display="flex" flexDirection="column" gap={1}>
                                                    <Typography variant="h6" color="primary">
                                                        {request.parentId.name}
                                                    </Typography>
                                                    <Typography sx={{ 
                                                        color: '#7F7F7F', 
                                                        fontSize: "13px", 
                                                        fontWeight: "500",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        maxWidth: "100%" 
                                                    }}>
                                                        {request.parentId.address}
                                                    </Typography>

                                                    <Typography sx={{ 
                                                        color: '#7F7F7F', 
                                                        fontSize: "13px", 
                                                        fontWeight: "500" 
                                                    }}>
                                                        {request.parentId.phone}
                                                    </Typography>
                                                    <Button 
                                                        onClick={() => fetchParentByRequestId(request._id)}
                                                        sx={{ 
                                                            alignSelf: "flex-start",
                                                            textTransform: "none",
                                                            color: '#1976d2',
                                                            p: 0,
                                                            '&:hover': {
                                                                backgroundColor: "transparent",
                                                                textDecoration: "underline"
                                                            }
                                                        }}
                                                    >
                                                        View Child
                                                    </Button>
                                                </Box>
                                                <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                                    <Button 
                                                        onClick={() => rejectParentRequest(request._id)} 
                                                        variant='outlined' 
                                                        color='secondary' 
                                                        sx={{ 
                                                            borderRadius: "25px", 
                                                            height: "35px", 
                                                            width: '100px', 
                                                            padding: '10px 35px', 
                                                            mt: "10px",
                                                            border: "1px solid #1967D2"
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                    <Button 
                                                        onClick={() => acceptParentRequest(request._id)} 
                                                        variant='contained' 
                                                        color='secondary' 
                                                        sx={{ 
                                                            borderRadius: "25px", 
                                                            height: "35px", 
                                                            width: '100px', 
                                                            padding: '10px 35px', 
                                                            mt: "10px" 
                                                        }}
                                                    >
                                                        Accept
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            ))) 
                        }
                    </Box>
                    <Box 
                        display="flex" 
                        justifyContent="flex-end" 
                        sx={{ 
                            mr: { xs: 2, md: "150px" },
                            pt: 3.75
                        }}
                    >
                        <Link 
                            to="/therapist/parentsrequest" 
                            style={{
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                color: "inherit"
                            }}
                        >
                            <Typography sx={{ fontWeight: 500 }}>
                                View More
                            </Typography>
                            <ArrowRightAltIcon sx={{ ml: 0.5 }} />
                        </Link>
                    </Box>
                </Box>
            </Container>

            {/* How It Works Section */}
            <Container maxWidth="x-lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", my: 8 }}>
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

                <Stack direction="row" spacing={2} sx={{ height: "210px", display: "flex", alignItems: 'center', gap: "20px", mt: 8 }}>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={user} />
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Build Profiles
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Parents add child details; educators & therapists set expertise.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={elearning} />
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Start Learning
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Access personalized plans, track progress, and collaborate.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={shopping} />
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Monitor & Improve
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Receive insights, expert advice, and ongoing support.
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Container>
            
                        <Modal
                open={openParent}
                onClose={handleParentClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openParent}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        height: "720px",
                        width: "65%",
                        borderRadius: "20px",
                        overflow: "hidden"
                    }}>
                        {requestDetail && (
                            <TherapistViewParentDetails 
                                acceptParentrequest={acceptParentRequest} 
                                rejectParentrequest={rejectParentRequest} 
                                handleParentClose={handleParentClose} 
                                requestDetail={requestDetail}
                            />
                        )}
                    </Box>
                </Fade>
            </Modal>

            <Footer />
        </>
    );
};

export default TheraphistHome;