import React, { useEffect, useState } from 'react';
import TherapistNavbar from '../Navbar/TheraphistNavbar';
import { 
  Box, 
  Breadcrumbs, 
  Button, 
  Grid, 
  Typography, 
  LinearProgress 
} from '@mui/material';
import { 
  SearchOutlined, 
  PersonOutlined, 
  ApartmentOutlined,
  Female,
  DateRange,
  Chat,
  Add,
  Assignment 
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Meeting from './Common/Meeting';
import ViewStudentActivity from './Common/ViewStudentActivity';

const TherapistAllStudents = () => {
    const [therapistDetails, setTherapistDetails] = useState({});
    const [allChildren, setAllChildren] = useState([]);
    const [useDummyData, setUseDummyData] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Initialize therapist details
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

    useEffect(() => {
        const storedTherapist = localStorage.getItem("theraphistDetails");
        if (storedTherapist) {
            setTherapistDetails(JSON.parse(storedTherapist));
        }
        fetchTherapist();
        fetchAllChildren();
    }, []);

    const navigateToProfile = () => {
        navigate('/therapist/profile');
    };

    const fetchAllChildren = async () => {
        setLoading(true);
        try {
            if (useDummyData) {
                // Dummy data
                const dummyChildren = [
                    {
                        _id: 'child1',
                        name: 'John Doe',
                        parentId: { 
                            _id: '1', 
                            name: 'Jane Doe',
                            email: 'jane.doe@example.com'
                        },
                        schoolName: 'Springfield Elementary',
                        dateOfBirth: '2012-04-23',
                        gender: 'Male',
                        description: 'John is a curious student who needs speech therapy.',
                        progress: 35,
                        weeks: 8,
                        hasLearningPlan: true
                    },
                    {
                        _id: 'child2',
                        name: 'Emily Smith',
                        parentId: { 
                            _id: '2', 
                            name: 'Robert Smith',
                            email: 'robert.smith@example.com'
                        },
                        schoolName: 'Riverdale High',
                        dateOfBirth: '2013-06-15',
                        gender: 'Female',
                        description: 'Emily is working on occupational therapy goals.',
                        progress: 75,
                        weeks: 15,
                        hasLearningPlan: false
                    }
                ];
                setAllChildren(dummyChildren);
            } else {
                const token = localStorage.getItem("token");
                const therapistId = therapistDetails._id;
                const response = await axios.get(
                    `http://localhost:4000/ldss/therapist/getchildrenofallapprovedparents/${therapistId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setAllChildren(response.data.children);
            }
        } catch (error) {
            console.error("Failed to fetch children:", error);
        } finally {
            setLoading(false);
        }
    };

    // Meeting modal state
    const [openMeeting, setOpenMeeting] = useState(false);
    const [selectedChildId, setSelectedChildId] = useState(null);

    // Activities modal state
    const [openActivity, setOpenActivity] = useState(false);
    const [selectedChildIdForActivity, setSelectedChildIdForActivity] = useState(null);

    const handleMeetingOpen = (childId) => {
        setOpenMeeting(true);
        setSelectedChildId(childId);
    };

    const handleMeetingClose = () => {
        setOpenMeeting(false);
        setSelectedChildId(null);
    };

    const handleActivityOpen = (childId) => {
        setOpenActivity(true);
        setSelectedChildIdForActivity(childId);
    };

    const handleActivityClose = () => {
        setOpenActivity(false);
        setSelectedChildIdForActivity(null);
    };

    const handleChatClick = (parentId) => {
        navigate(`/therapist/chat/${parentId}`);
    };

    const handleLearningPlanClick = (childId, hasLearningPlan) => {
        if (hasLearningPlan) {
            navigate(`/therapist/viewlearningplan/${childId}`);
        } else {
            navigate(`/therapist/addlearningplan/${childId}`);
        }
    };

    return (
        <>
            <TherapistNavbar theraphistdetails={therapistDetails} navigateToProfile={navigateToProfile}/>
            
            <Box sx={{ background: "white" }}>
                {/* Header Section */}
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ 
                    height: "46px", 
                    background: "#DBE8FA" 
                }}>
                    <Typography color='primary' textAlign="center" sx={{ 
                        fontSize: "18px", 
                        fontWeight: "600" 
                    }}>
                        All Students
                    </Typography>
                </Box>

                {/* Breadcrumbs and Search */}
                <Box display="flex" justifyContent="space-between" alignItems="start" sx={{ 
                    mt: "30px", 
                    ml: "50px", 
                    mr: "50px" 
                }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ 
                            fontSize: "12px", 
                            fontWeight: "500", 
                            color: "#7F7F7F", 
                            textDecoration: "none" 
                        }} to="/theraphist/home">
                            Home
                        </Link>
                        <Typography color='primary' sx={{ 
                            fontSize: "12px", 
                            fontWeight: "500" 
                        }}>
                            All Students
                        </Typography>
                    </Breadcrumbs>
                    
                    <Box display="flex" alignItems="center" gap={1} sx={{ 
                        padding: "8px 15px", 
                        borderRadius: "25px", 
                        border: "1px solid #CCCCCC", 
                        height: "40px" 
                    }}>
                        <SearchOutlined />
                        <input 
                            placeholder='Search here' 
                            style={{ 
                                border: 0, 
                                outline: 0, 
                                height: "100%",
                                width: "200px"
                            }} 
                        />
                    </Box>
                </Box>

                {/* Students Grid */}
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "300px" }}>
                        <Typography>Loading students...</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={2} sx={{ 
                        pt: "30px", 
                        pl: "50px", 
                        pr: "50px", 
                        width: "100%",
                        pb: "50px",
                        justifyContent: "center",
                    }}>
                        {allChildren.length > 0 ? (
                            allChildren.map((child, index) => (
                                <Grid item xs={12} md={6} key={index} sx={{ height: "480px" }}>
                                    {/* Student Card */}
                                    <Box display="flex" flexDirection="column" alignItems="start" sx={{ 
                                        p: "30px", 
                                        background: "#F6F7F9", 
                                        borderRadius: "25px", 
                                        gap: "20px", 
                                        width: "100%", 
                                        height: "100%" 
                                    }}>
                                        {/* Student Name and Buttons */}
                                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" gap={2}>
                                            <Link to={`/theraphist/viewlearningplan/${child._id}`} style={{ textDecoration: "none" }}>
                                                <Typography sx={{ 
                                                    fontSize: "24px", 
                                                    fontWeight: "600" 
                                                }} color='primary'>
                                                    {child.name}
                                                </Typography>
                                            </Link>
                                            
                                            <Box display="flex" alignItems="center" gap="10px">
                                                <Button 
                                                    startIcon={<Chat />} 
                                                    variant='outlined' 
                                                    color='secondary' 
                                                    sx={{ 
                                                        borderRadius: "25px", 
                                                        height: "45px", 
                                                        minWidth: '120px', 
                                                        fontSize: "14px", 
                                                        fontWeight: "500" 
                                                    }}
                                                    onClick={() => handleChatClick(child.parentId._id)}
                                                >
                                                    Chat
                                                </Button>
                                                
                                                <Button 
                                                    startIcon={child.hasLearningPlan ? <Assignment /> : <Add />} 
                                                    variant='outlined' 
                                                    color='secondary' 
                                                    sx={{ 
                                                        borderRadius: "25px", 
                                                        height: "45px", 
                                                        minWidth: '350px', 
                                                        fontSize: "14px", 
                                                        fontWeight: "500" 
                                                    }}
                                                    onClick={() => handleLearningPlanClick(child._id, child.hasLearningPlan)}
                                                >
                                                    {child.hasLearningPlan ? "Learning Plan" : "Add Learning Plan"}
                                                </Button>
                                            </Box>
                                        </Box>

                                        {/* Student Details */}
                                        <Box display="flex" justifyContent="space-between" width="100%">
                                            {/* Left Column */}
                                            <Box display="flex" flexDirection="column" gap="20px">
                                                <Box display="flex" alignItems="center" gap="15px">
                                                    <PersonOutlined sx={{ color: "#1967D2" }} />
                                                    <Box>
                                                        <Typography sx={{ 
                                                            fontSize: "12px", 
                                                            fontWeight: "500" 
                                                        }} color='secondary'>
                                                            Parent Name
                                                        </Typography>
                                                        <Typography sx={{ 
                                                            fontSize: "14px", 
                                                            fontWeight: "500" 
                                                        }} color='primary'>
                                                            {child.parentId.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                
                                                <Box display="flex" alignItems="center" gap="15px">
                                                    <ApartmentOutlined sx={{ color: "#1967D2" }} />
                                                    <Box>
                                                        <Typography sx={{ 
                                                            fontSize: "12px", 
                                                            fontWeight: "500" 
                                                        }} color='secondary'>
                                                            School Name
                                                        </Typography>
                                                        <Typography sx={{ 
                                                            fontSize: "14px", 
                                                            fontWeight: "500" 
                                                        }} color='primary'>
                                                            {child.schoolName}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>

                                            {/* Right Column */}
                                            <Box display="flex" flexDirection="column" gap="20px" sx={{ 
                                                pl: "50px", 
                                                borderLeft: "1px solid #CCCCCC" 
                                            }}>
                                                <Box display="flex" alignItems="center" gap="15px">
                                                    <DateRange sx={{ color: "#1967D2" }} />
                                                    <Box>
                                                        <Typography sx={{ 
                                                            fontSize: "12px", 
                                                            fontWeight: "500" 
                                                        }} color='secondary'>
                                                            Date of Birth
                                                        </Typography>
                                                        <Typography sx={{ 
                                                            fontSize: "14px", 
                                                            fontWeight: "500" 
                                                        }} color='primary'>
                                                            {child.dateOfBirth}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                
                                                <Box display="flex" alignItems="center" gap="15px">
                                                    <Female sx={{ color: "#1967D2" }} />
                                                    <Box>
                                                        <Typography sx={{ 
                                                            fontSize: "12px", 
                                                            fontWeight: "500" 
                                                        }} color='secondary'>
                                                            Gender
                                                        </Typography>
                                                        <Typography sx={{ 
                                                            fontSize: "14px", 
                                                            fontWeight: "500" 
                                                        }} color='primary'>
                                                            {child.gender}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>

                                        {/* Description */}
                                        <Box>
                                            <Typography sx={{ 
                                                fontSize: "16px", 
                                                fontWeight: "500" 
                                            }} color='secondary'>
                                                Description
                                            </Typography>
                                            <Typography sx={{ 
                                                fontSize: "14px", 
                                                fontWeight: "500",
                                                lineHeight: "1.5"
                                            }} color='primary'>
                                                {child.description}
                                            </Typography>
                                        </Box>

                                        {/* Progress Bar */}
                                        <Box width="100%">
                                            <Box display="flex" justifyContent="space-between" width="100%" mb={1}>
                                                <Typography sx={{ 
                                                    fontSize: "16px", 
                                                    fontWeight: "600" 
                                                }} color='secondary'>
                                                    Progress
                                                </Typography>
                                                <Typography sx={{ 
                                                    fontSize: "14px", 
                                                    fontWeight: "500" 
                                                }} color='secondary'>
                                                    {child.weeks} Weeks
                                                </Typography>
                                            </Box>
                                            
                                            <Box sx={{ 
                                                background: "#DBE8FA", 
                                                display: "flex", 
                                                alignItems: "center", 
                                                width: "100%", 
                                                borderRadius: "25px",
                                                height: "15px"
                                            }}>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={child.progress}
                                                    sx={{
                                                        height: "100%",
                                                        borderRadius: "25px",
                                                        backgroundColor: "transparent",
                                                        '& .MuiLinearProgress-bar': {
                                                            backgroundColor: '#1967D2',
                                                            borderRadius: "25px"
                                                        },
                                                        width: `${child.progress}%`,
                                                    }}
                                                />
                                            </Box>
                                        </Box>

                                        {/* Action Buttons */}
                                        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={2}>
                                            <Button 
                                                onClick={() => handleMeetingOpen(child._id)} 
                                                variant='contained' 
                                                color='secondary' 
                                                sx={{ 
                                                    borderRadius: "25px", 
                                                    height: "45px", 
                                                    width: '48%', 
                                                    fontSize: "14px", 
                                                    fontWeight: "500" 
                                                }}
                                            >
                                                Meeting
                                            </Button>
                                            
                                            <Button 
                                                onClick={() => handleActivityOpen(child._id)} 
                                                variant='contained' 
                                                color='secondary' 
                                                sx={{ 
                                                    borderRadius: "25px", 
                                                    height: "45px", 
                                                    width: '48%', 
                                                    fontSize: "14px", 
                                                    fontWeight: "500" 
                                                }}
                                            >
                                                Activities
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12} sx={{ 
                                display: "flex", 
                                justifyContent: "center", 
                                alignItems: "center", 
                                height: "200px" 
                            }}>
                                <Typography variant="h6" color="textSecondary">
                                    No students found
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                )}
            </Box>

            {/* Meeting Modal */}
            <Meeting
                childId={selectedChildId}
                openMeeting={openMeeting}
                handleMeetingClose={handleMeetingClose}
            />

            {/* Activities Modal */}
            <ViewStudentActivity
                childId={selectedChildIdForActivity}
                openActivity={openActivity}
                handleActivityClose={handleActivityClose}
            />
        </>
    );
};

export default TherapistAllStudents;