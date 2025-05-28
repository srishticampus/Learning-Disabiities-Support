import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Fade, Grid, Modal, Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import image68 from "../../assets/image 68.png";
import Backdrop from '@mui/material/Backdrop';
import TheraphistNavbar from '../Navbar/TheraphistNavbar';
import TherapistViewParentDetails from './Common/TherapistViewParentDetails';

const TherapistAcceptedParents = () => {
    const [useDummyData, setUseDummyData] = useState(true);
    const [therapistDetails, setTherapistDetails] = useState({});
    const navigate = useNavigate();

    // Dummy data for parent requests
    const dummyParentRequests = [
        {
            _id: "request1",
            status: "accepted",
            parentId: {
                _id: "parent1",
                name: "Sarah Johnson",
                email: "sarah.johnson@example.com",
                address: "123 Main St, Springfield, IL 62704",
                phone: "+1 (555) 123-4567",
                profilePic: {
                    filename: "profile1.jpg"
                }
            }
        },
        {
            _id: "request2",
            status: "accepted",
            parentId: {
                _id: "parent2",
                name: "Michael Brown",
                email: "michael.brown@example.com",
                address: "456 Oak Ave, Springfield, IL 62704",
                phone: "+1 (555) 987-6543",
                profilePic: {
                    filename: "profile2.jpg"
                }
            }
        }
    ];

    const fetchTherapist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found");
                return;
            }
            
            const decoded = jwtDecode(token);
            
            const response = await axios.get(`http://localhost:4000/ldss/theraphist/gettheraphist/${decoded.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (response.data && response.data.theraphist) {
                const therapistData = response.data.theraphist;
                
                // Validate before storing
                if (therapistData && therapistData._id) {
                    try {
                        localStorage.setItem("theraphistDetails", JSON.stringify(therapistData));
                        setTherapistDetails(therapistData);
                    } catch (storageError) {
                        console.error("Failed to store in localStorage:", storageError);
                        // Fallback to state only
                        setTherapistDetails(therapistData);
                    }
                } else {
                    console.error("Invalid therapist data structure");
                }
            }
        } catch (error) {
            console.error("Error fetching therapist:", error);
            // If API fails, check if we have cached data
            const cachedData = localStorage.getItem("theraphistDetails");
            if (cachedData) {
                try {
                    const parsed = JSON.parse(cachedData);
                    if (parsed && parsed._id) {
                        setTherapistDetails(parsed);
                    }
                } catch (parseError) {
                    console.error("Error parsing cached data:", parseError);
                }
            }
        }
    };

    const [parentRequest, setParentRequest] = useState([]);
    const fetchParentsRequest = async () => {
        if (useDummyData) {
            setParentRequest(dummyParentRequests);
        } else {
            try {
                const token = localStorage.getItem("token");
                const therapistId = therapistDetails._id;
                const response = await axios.get(
                    `http://localhost:4000/ldss/theraphist/parentsrequest/${therapistId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setParentRequest(response.data.request);
            } catch (error) {
                console.error("Failed to fetch parent requests:", error);
            }
        }
    };

    useEffect(() => {
        // Load therapist details from localStorage if available
        const storedTherapist = localStorage.getItem("theraphistDetails");
        if (storedTherapist) {
            setTherapistDetails(JSON.parse(storedTherapist));
        }
        fetchTherapist();
        fetchParentsRequest();
    }, []);

    const navigateToProfile = () => {
        navigate('/theraphist/profile');
    };

    // Modal state
    const [requestDetail, setRequestDetail] = useState({});
    const [openParent, setOpenParent] = useState(false);
    const handleParentOpen = () => setOpenParent(true);
    const handleParentClose = () => setOpenParent(false);

    const fetchParentByRequestId = async (requestId) => {
        if (useDummyData) {
            const foundRequest = dummyParentRequests.find(req => req._id === requestId);
            if (foundRequest) {
                setRequestDetail(foundRequest);
                handleParentOpen();
            }
        } else {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `http://localhost:4000/ldss/theraphist/viewrequestedparent/${requestId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setRequestDetail(response.data.viewRequest);
                handleParentOpen();
            } catch (error) {
                console.error("Failed to fetch parent details:", error);
            }
        }
    };

    return (
        <>
            {/* Corrected prop name to match navbar component */}
            <TheraphistNavbar theraphistdetails={therapistDetails} navigateToProfile={navigateToProfile} />
            
            <Box sx={{ background: "white", width: "100vw" }}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "46px", background: "#DBE8FA" }}>
                    <Typography color="primary" textAlign="center" sx={{ fontSize: "18px", fontWeight: "600" }}>
                        Parents
                    </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="start" sx={{ mt: "30px", ml: "50px", mr: "50px" }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} to="/educator/home">
                            Home
                        </Link>
                        <Typography color="primary" sx={{ fontSize: "12px", fontWeight: "500" }}>
                            Parents
                        </Typography>
                    </Breadcrumbs>
                    
                    <Box display="flex" alignItems="center" gap={1} sx={{ 
                        padding: "8px 15px", 
                        borderRadius: "25px", 
                        border: "1px solid #CCCCCC", 
                        height: "40px" 
                    }}>
                        <SearchOutlinedIcon />
                        <input placeholder="search here" style={{ border: 0, outline: 0, height: "100%" }} />
                    </Box>
                </Box>
                
                {/* Parents Grid */}
                <Box sx={{ 
                    width: "100%", 
                    backgroundColor: "#F6F7F9",
                    py: 4,
                    minHeight: "calc(100vh - 200px)",
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
                        {parentRequest.filter(request => request.status === "accepted").length === 0 ? 
                            (
                                <Typography sx={{ 
                                    fontSize: "32px", 
                                    gridColumn: "1 / -1",
                                    textAlign: "center"
                                }} color="primary">
                                    No parents accepted yet
                                </Typography>
                            ) : (
                            parentRequest.filter(request => request.status === "accepted")
                                .map((request, index) => (   
                                    <Card key={index} sx={{ 
                                        height: "197px", 
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
                                                gap: "10px",
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
                                                    image={useDummyData ? image68 : `http://localhost:4000/uploads/${request.parentId.profilePic.filename}`}
                                                    alt="Profile"
                                                />
                                                <Box sx={{
                                                    height: "100%",
                                                    overflow: "hidden",
                                                    p: "10px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    flexGrow: 1
                                                }}>
                                                    <Box display="flex" flexDirection="column" gap={2}>
                                                        <Typography variant="h6" color="primary">
                                                            {request.parentId.name}
                                                        </Typography>
                                                        <Typography sx={{ 
                                                            color: '#7F7F7F', 
                                                            fontSize: "13px", 
                                                            fontWeight: "500" 
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
                                                    </Box>
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
                                            </Box>
                                        </Box>
                                    </Card>
                                )))
                            }
                    </Box>
                </Box>
                
                {/* Parent Details Modal */}
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
                            <TherapistViewParentDetails 
                                handleParentClose={handleParentClose} 
                                requestDetail={requestDetail}
                            />
                        </Box>
                    </Fade>
                </Modal>
            </Box>
        </>
    );
};

export default TherapistAcceptedParents;