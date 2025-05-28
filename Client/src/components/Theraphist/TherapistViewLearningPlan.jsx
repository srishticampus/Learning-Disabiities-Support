import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Grid, Stack, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import TheraphistNavbar from '../Navbar/TheraphistNavbar';
import { jwtDecode } from 'jwt-decode';

const TherapistViewLearningPlan = () => {
    const [therapistDetails, setTherapistDetails] = useState({});
    const [useDummyData, setUseDummyData] = useState(true);
    
    // Initialize therapist details from localStorage first
    useEffect(() => {
        const storedTherapist = localStorage.getItem("theraphistDetails");
        if (storedTherapist) {
            try {
                const parsedTherapist = JSON.parse(storedTherapist);
                if (parsedTherapist && parsedTherapist._id) {
                    setTherapistDetails(parsedTherapist);
                }
            } catch (error) {
                console.error("Error parsing stored therapist:", error);
                localStorage.removeItem("theraphistDetails");
            }
        }
    }, []);

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
                
                if (therapistData && therapistData._id) {
                    try {
                        localStorage.setItem("theraphistDetails", JSON.stringify(therapistData));
                        setTherapistDetails(therapistData);
                    } catch (storageError) {
                        console.error("Failed to store in localStorage:", storageError);
                        setTherapistDetails(therapistData);
                    }
                } else {
                    console.error("Invalid therapist data structure");
                }
            }
        } catch (error) {
            console.error("Error fetching therapist:", error);
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
    }

    useEffect(() => {
        fetchTherapist();
    }, []);

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/theraphist/profile');
    };
    const { childId } = useParams();

    const [studentPlan, setStudentsPlan] = useState(null);
    
    // Dummy data for learning plans
    const dummyLearningPlans = [
        {
            _id: 'plan1',
            goal: 'Improve reading comprehension',
            planDuration: 8,
            weeks: [
                {
                    activities: [
                        {
                            title: 'Reading Practice',
                            description: 'Read short stories and answer questions'
                        },
                        {
                            title: 'Vocabulary Building',
                            description: 'Learn 10 new words each week'
                        },
                        {
                            title: 'Comprehension Exercises',
                            description: 'Practice identifying main ideas'
                        }
                    ]
                },
                {
                    activities: [
                        {
                            title: 'Advanced Reading',
                            description: 'Read longer passages with complex themesRead longer passages with complex themesRead longer passages with complex themesRead longer passages with complex themesRead longer passages with complex themes'
                        },
                        {
                            title: 'Context Clues',
                            description: 'Practice deducing word meanings from context'
                        },
                        {
                            title: 'Summary Writing',
                            description: 'Write summaries of read passages'
                        }
                    ]
                },
                {
                    activities: [
                        {
                            title: 'Advanced Reading',
                            description: 'Read longer passages with complex themes'
                        },
                        {
                            title: 'Context Clues',
                            description: 'Practice deducing word meanings from context'
                        },
                        {
                            title: 'Summary Writing',
                            description: 'Write summaries of read passages'
                        }
                    ]
                },
            ]
        }
    ];

    const fetchLearningPlanOfStudent = async () => {
        if (useDummyData) {
            setStudentsPlan(dummyLearningPlans);
        } else {
            try {
                const token = localStorage.getItem("token");
                const therapistId = therapistDetails._id;
                const studentPlan = await axios.get(
                    `http://localhost:4000/ldss/theraphist/getstudentplan/${therapistId}/${childId}`, 
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                setStudentsPlan(studentPlan.data.childPlan);
            } catch (error) {
                console.error("Failed to fetch learning plan:", error);
            }
        }
    };

    useEffect(() => {
        if (therapistDetails._id) {
            fetchLearningPlanOfStudent();
        }
    }, [therapistDetails]);

    const deleteLearningPlan = async (planid) => {
        if (useDummyData) {
            setStudentsPlan(null);
            alert("Dummy learning plan deleted");
        } else {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(
                    `http://localhost:4000/ldss/theraphist/deleteplan/${planid}`, 
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                fetchLearningPlanOfStudent();
            } catch (error) {
                console.error("Failed to delete learning plan:", error);
            }
        }
    };

    const handleEdit = () => {
        navigate(`/therapist/editlearningplan/${childId}`);
    };

    return (
        <>
            <TheraphistNavbar theraphistdetails={therapistDetails} navigateToProfile={navigateToProfile} />

            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "46px", background: "#DBE8FA" }}>
                <Typography color='primary' textAlign="center" sx={{ fontSize: "18px", fontWeight: "600" }}>
                    Learning Plan
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="start" sx={{ mt: "30px", mx: "50px" }}>
                <Breadcrumbs aria-label="breadcrumb" separator="›">
                    <Link to="/theraphist/home" style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }}>
                        Home
                    </Link>
                    <Link to="/therapist/allstudents" style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }}>
                        All Students
                    </Link>
                    <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Learning Plan
                    </Typography>
                </Breadcrumbs>
            </Box>

            {studentPlan ? (
                <Box>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} m={"20px 50px"} sx={{ background: "#F0F6FE", height: "70px" }}>
                        <Typography variant='h4' color='primary' sx={{ fontSize: "24px", fontWeight: "600", pl: "20px" }}>
                            Goal: {studentPlan[0]?.goal} 
                        </Typography>
                        <Typography variant='h4' color='primary' sx={{ fontSize: "24px", fontWeight: "600", pr: "20px" }}>
                            {studentPlan[0]?.planDuration} Weeks Plan
                        </Typography>
                    </Box>
                    
                    {Array.isArray(studentPlan[0]?.weeks) && studentPlan[0]?.weeks.map((week, weekIndex) => (
                        <Box key={weekIndex} display={'flex'} flexDirection={'column'} m={"20px 50px"} sx={{ height: "268px", background: "#F0F6FE" }}>
                            <Typography variant='h6' color='primary' sx={{ fontSize: "24px", fontWeight: "500", p: "20px 30px" }}>
                                Week {weekIndex + 1}
                            </Typography>

                            <Box display={"flex"} alignItems={"center"} gap={1}>
                                {Array.isArray(week.activities) && week.activities.map((activity, index) => (
                                    <Box key={index} display={'flex'} flexDirection={'column'} gap={1} width={"33%"} p={"10px 30px"}>
                                        <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                            Activity {index + 1}
                                        </Typography>
                                        <Box>
                                            <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>
                                                {activity.title}
                                            </Typography>
                                            <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#7F7F7F" }}>
                                                {activity.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    ))}
                    
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3} sx={{marginBottom:"50px",}}>
                        <Button 
                            onClick={() => deleteLearningPlan(studentPlan[0]._id)} 
                            variant='outlined' 
                            color='secondary' 
                            sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                        >
                            Delete
                        </Button>
                        <Button 
                            onClick={handleEdit} 
                            variant='contained' 
                            color='secondary' 
                            sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                        >
                            Edit
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Typography color='primary' sx={{ mt: "50px", fontSize: "32px", fontWeight: "600" }} textAlign={'center'}>
                    No learning plan added yet
                </Typography>
            )}
        </>
    );
};

export default TherapistViewLearningPlan;