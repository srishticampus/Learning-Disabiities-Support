import React, { useEffect, useState } from 'react'
import ParentNavbar from '../Navbar/ParentNavbar'
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Avatar, Box, Breadcrumbs, Button, Card, Fade, Grid, Modal, Rating, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import WcIcon from '@mui/icons-material/Wc';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import Ratings from './Common/Ratings';
import axios from 'axios';

const ParentLearningPlan = () => {
    const [parentdetails, setParentdetails] = useState({});
    useEffect(() => {
        const parentdetails = localStorage.getItem("parentdetails");
        setParentdetails(JSON.parse(parentdetails));
    }, []);
    
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/parent/profile');
    };

    // State for ratings modal
    const [ratingState, setRatingState] = useState({
        open: false,
        childId: null,
        professionalType: null, // 'educator' or 'therapist'
        currentRating: 0
    });

    const handleRatingOpen = (childId, professionalType) => {
        setRatingState({
            open: true,
            childId,
            professionalType,
            currentRating: 0
        });
    };

    const handleRatingClose = () => {
        setRatingState(prev => ({ ...prev, open: false }));
    };

    const handleRatingSubmit = (rating) => {
        console.log(`Rating submitted for ${ratingState.professionalType} of child ${ratingState.childId}:`, rating);
        handleRatingClose();
    };

    // fetch all child of parent
    const [allchild, setAllChild] = useState([]);
    const [educators, setEducators] = useState({}); // {childId: educatorDetails}
    const [therapists, setTherapists] = useState({}); // {childId: therapistDetails}
    
    const fetchAllChildOfParent = async () => {
        const token = localStorage.getItem("token");
        const parentId = (JSON.parse(localStorage.getItem("parentdetails"))?._id);
        
        try {
            // Fetch all children
            const allChild = await axios.get(`http://localhost:4000/ldss/parent/getallchildofparent/${parentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setAllChild(allChild.data.child);
            
            // Fetch educators for parent
            try {
                const educatorRes = await axios.get(`http://localhost:4000/ldss/parent/getacceptededucator/${parentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                
                // Create a mapping of educators
                const educatorsData = {};
                if (educatorRes.data && educatorRes.data.acceptedEducators && educatorRes.data.acceptedEducators.length > 0) {
                    // For simplicity, we'll associate the first educator with all children
                    // Adjust this logic if you need to map specific educators to specific children
                    allChild.data.child.forEach(child => {
                        educatorsData[child._id] = educatorRes.data.acceptedEducators[0].recipientId;
                    });
                }
                
                setEducators(educatorsData);
            } catch (error) {
                console.error(`Error fetching educator:`, error);
            }

            // Fetch therapists for parent
            try {
                const therapistRes = await axios.get(`http://localhost:4000/ldss/parent/getacceptedtherapist/${parentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                
                // Create a mapping of therapists
                const therapistsData = {};
                if (therapistRes.data && therapistRes.data.acceptedTherapists && therapistRes.data.acceptedTherapists.length > 0) {
                    // For simplicity, we'll associate the first therapist with all children
                    // Adjust this logic if you need to map specific therapists to specific children
                    allChild.data.child.forEach(child => {
                        therapistsData[child._id] = therapistRes.data.acceptedTherapists[0].recipientId;
                    });
                }
                
                setTherapists(therapistsData);
            } catch (error) {
                console.error(`Error fetching therapist:`, error);
            }

        } catch (error) {
            console.error("Error fetching children:", error);
        }
    };
    
    useEffect(() => {
        fetchAllChildOfParent();
    }, []);

    // Function to format date as dd-mm-yyyy
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <ParentNavbar parentdetails={parentdetails} navigateToProfile={navigateToProfile} />
            <Box sx={{ background: "white" }}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "46px", background: "#DBE8FA" }}>
                    <Typography color='primary' textAlign={"center"} sx={{ fontSize: "18px", fontWeight: "600" }}>Learning</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ marginTop: "20px", ml: "50px", mr: "50px" }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} underline="hover" to="/parent/home">
                            Home
                        </Link>
                        <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>Learning</Typography>
                    </Breadcrumbs>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1} style={{ padding: "8px 15px", borderRadius: "25px", border: "1px solid #CCCCCC", height: "40px" }}>
                            <Box sx={{ height: "100%" }}><SearchOutlinedIcon /></Box>
                            <input placeholder='search here' style={{ padding: "8px 15px", border: 0, outline: 0, height: "100%" }}></input>
                        </Box>
                    </Box>
                </Box>

                <Grid sx={{ pt: "10px", pl: "50px", pr: "50px", width: "100%" }} container spacing={2}>
                    {allchild.map((child, index) => {
                        const educator = educators[child._id];
                        const therapist = therapists[child._id];
                        return (
                            <Grid key={index} item xs={12} md={6} width={"49%"} sx={{ height: "470px" }}>
                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"} sx={{ p: "20px 30px", height: "90%", background: "#F6F7F9", borderRadius: "25px", gap: "20px", width: "100%" }}>
                                    <Box width={"100%"} display={"flex"} gap={5} justifyContent={"space-between"} alignItems={"center"}>
                                        <Typography sx={{ fontSize: "32px", fontWeight: "600" }} color='primary'>{child.name}</Typography>
                                        <Box display={"flex"} alignItems={"center"} sx={{ gap: "20px" }}>
                                            <Button 
                                                startIcon={<ChatIcon />} 
                                                variant='outlined' 
                                                color='secondary' 
                                                sx={{ borderRadius: "25px", marginTop: "20px", height: "45px", width: '150px', padding: '10px 35px', fontSize: "14px", fontWeight: "500" }}
                                            >
                                                Educator
                                            </Button>
                                            <Button 
                                                startIcon={<ChatIcon />} 
                                                variant='outlined' 
                                                color='secondary' 
                                                sx={{ borderRadius: "25px", marginTop: "20px", height: "45px", width: '150px', padding: '10px 15px', fontSize: "14px", fontWeight: "500", letterSpacing: "0%" }}
                                            >
                                                Therapist
                                            </Button>
                                        </Box>
                                    </Box>
                                    
                                    <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
                                        <Box sx={{ gap: "20px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                                                <Box sx={{ color: "#1967D2" }}><DateRangeIcon /></Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Date of Birth</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{formatDate(child.dateOfBirth)}</Typography>
                                                </Box>
                                            </Box>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                                                <Box sx={{ color: "#1967D2" }}><ApartmentOutlinedIcon /></Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>School Name</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{child.schoolName}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ gap: "20px", pr: "250px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px", pl: "50px" }}>
                                                <Box sx={{ color: "#1967D2" }}><WcIcon /></Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Gender</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{child.gender}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box sx={{ border: "1px solid #CCCCCC", borderRadius: "12px" }} height={"176px"} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                        {/* Educator Section */}
                                        <Box display={'flex'} flexDirection={'column'} width={"100%"} p={3}>
                                            <Box width={"100%"} display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
                                                <Typography variant='p' color='secondary' sx={{ fontSize: "18px", fontWeight: "600", mt: "10px" }}>
                                                    {educator ? `${educator.name}` : 'Educator'}
                                                </Typography>
                                                <Button 
                                                    onClick={() => handleRatingOpen(child._id, 'educator')} 
                                                    startIcon={<AddIcon />} 
                                                    variant='outlined' 
                                                    color='secondary' 
                                                    sx={{ borderRadius: "25px", marginTop: "20px", height: "25px", width: '118px', padding: '15px 25px', fontSize: "14px", fontWeight: "500" }}
                                                >
                                                    Rating
                                                </Button>
                                            </Box>
                                            <Typography variant='p' color='primary' sx={{ fontSize: "14px" }}>Complete Learning plan</Typography>
                                            <Link to={educator ? `/parent/educatorlearningplan/${educator._id}/${child._id}` : '#'}>
                                                <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "45px", width: '227px', padding: '10px 35px', fontSize: "14px", fontWeight: "500" }}>Learning plan</Button>
                                            </Link>
                                        </Box>
                                        
                                        <Divider orientation="vertical" variant="middle" flexItem />
                                        
                                        {/* Therapist Section */}
                                        <Box display={'flex'} flexDirection={'column'} width={"100%"} p={3}>
                                            <Box width={"100%"} display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
                                                <Typography variant='p' color='secondary' sx={{ fontSize: "18px", fontWeight: "600", mt: "10px" }}>
                                                    {therapist ? `${therapist.name}` : 'Therapist'}
                                                </Typography>
                                                <Button 
                                                    onClick={() => handleRatingOpen(child._id, 'therapist')} 
                                                    startIcon={<AddIcon />} 
                                                    variant='outlined' 
                                                    color='secondary' 
                                                    sx={{ borderRadius: "25px", marginTop: "20px", height: "25px", width: '118px', padding: '15px 25px', fontSize: "14px", fontWeight: "500" }}
                                                >
                                                    Rating
                                                </Button>
                                            </Box>
                                            <Typography variant='p' color='primary' sx={{ fontSize: "14px" }}>Complete Learning plan</Typography>
                                            <Link to={therapist ? `/parent/therapistlearningplan/${therapist._id}/${child._id}` : '#'}>
                                                <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "45px", width: '227px', padding: '10px 35px', fontSize: "14px", fontWeight: "500" }}>Learning plan</Button>
                                            </Link>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>

                <Ratings 
                    openRating={ratingState.open} 
                    handleRatingClose={handleRatingClose} 
                    handleRatingSubmit={handleRatingSubmit}
                    professionalType={ratingState.professionalType}
                />
            </Box>
        </>
    )
}

export default ParentLearningPlan;