import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Button, Grid, Stack, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { toast } from 'react-toastify';
import TheraphistNavbar from '../Navbar/TheraphistNavbar';
import { jwtDecode } from 'jwt-decode';

const TherapistEditLearningPlan = () => {
    const activityContainerStyle = { 
        width: '360px',
        p: 2,
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        height: '210px',
        display: 'flex',
        flexDirection: 'column'
    };
    const textFieldStyle = { height: "65px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" };
    const inputStyle = { height: "40px", borderRadius: "8px", border: "1px solid #CCCCCC", padding: '8px', width: '100%' };

    const { childId } = useParams();
    const navigate = useNavigate();

    const [therapistDetails, setTherapistDetails] = useState({});
    const [learningPlan, setLearningPlan] = useState({
        goal: 'Improve reading comprehension and math skills',
        planDuration: 3,
        weeks: [
            {
                activities: [
                    { 
                        title: 'Reading Practice', 
                        description: 'Read short stories and answer comprehension questions' 
                    },
                    { 
                        title: 'Vocabulary Building', 
                        description: 'Learn 10 new words with definitions and usage' 
                    },
                    { 
                        title: 'Basic Math Drills', 
                        description: 'Practice addition and subtraction problems' 
                    }
                ]
            },
            {
                activities: [
                    { 
                        title: 'Advanced Reading', 
                        description: 'Read longer passages and identify main ideas' 
                    },
                    { 
                        title: 'Grammar Exercises', 
                        description: 'Practice proper sentence structure and punctuation' 
                    },
                    { 
                        title: 'Multiplication Practice', 
                        description: 'Solve multiplication problems up to 12x12' 
                    }
                ]
            },
            {
                activities: [
                    { 
                        title: 'Creative Writing', 
                        description: 'Write a short story using vocabulary words' 
                    },
                    { 
                        title: 'Reading Comprehension Test', 
                        description: 'Complete a reading passage with questions' 
                    },
                    { 
                        title: 'Division Problems', 
                        description: 'Solve division problems with remainders' 
                    }
                ]
            }
        ]
    });

    const fetchTherapistDetails = async () => {
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
                setTherapistDetails(therapistData);
                localStorage.setItem("theraphistDetails", JSON.stringify(therapistData));
            }
        } catch (error) {
            console.error("Error fetching therapist:", error);
            // Fallback to localStorage if API fails
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

    const fetchLearningPlanOfStudent = async () => {
        try {
            const token = localStorage.getItem("token");
            const therapistId = therapistDetails._id || (JSON.parse(localStorage.getItem("theraphistDetails"))?._id);
            if (!therapistId) return;

            const studentPlan = await axios.get(`http://localhost:4000/ldss/theraphist/getstudentplan/${therapistId}/${childId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLearningPlan(studentPlan.data.childPlan);
        } catch (error) {
            console.error("Error fetching learning plan:", error);
            toast.error("Failed to load learning plan");
        }
    };

    useEffect(() => {
        fetchTherapistDetails();
        // Uncomment if using real API
        // fetchLearningPlanOfStudent();
    }, []);

    const navigateToProfile = () => {
        navigate('/therapist/profile');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLearningPlan(prev => ({ ...prev, [name]: value }));
    };

    const handleActivityChange = (weekIndex, activityIndex, e) => {
        const { name, value } = e.target;
        const updatedWeeks = [...learningPlan.weeks];
        updatedWeeks[weekIndex].activities[activityIndex][name] = value;
        setLearningPlan(prev => ({ ...prev, weeks: updatedWeeks }));
    };

    const handleAddActivity = (weekIndex) => {
        const updatedWeeks = [...learningPlan.weeks];
        updatedWeeks[weekIndex].activities.push({ title: '', description: '' });
        setLearningPlan(prev => ({ ...prev, weeks: updatedWeeks }));
    };

    const handleAddWeek = () => {
        setLearningPlan(prev => ({
            ...prev,
            weeks: [...prev.weeks, { activities: [{ title: '', description: '' }] }],
            planDuration: prev.planDuration + 1
        }));
    };

    const handleSubmit = async () => {
        console.log("Submitted Learning Plan:", learningPlan);
        const token = localStorage.getItem('token');
        const therapistId = therapistDetails._id || (JSON.parse(localStorage.getItem("theraphistDetails")))?._id;
    
        if (!therapistId) {
            toast.error("Therapist ID not found");
            return;
        }

        try {
            const plan = await axios.put(
                `http://localhost:4000/ldss/therapist/updateplan/${therapistId}/${childId}`, 
                learningPlan,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            if (plan.data.message === "Learning plan updated successfully") {
                toast.success("Learning plan updated successfully");
                navigate(`/therapist/viewlearningplan/${childId}`);
            }
        } catch (error) {
            console.error("Error updating learning plan:", error);
            toast.error("Failed to update learning plan");
        }
    };

    const handleCancel = () => {
        navigate(`/therapist/viewlearningplan/${childId}`);
    };

    return (
        <>
            <TheraphistNavbar theraphistdetails={therapistDetails} navigateToProfile={navigateToProfile} />

            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "46px", background: "#DBE8FA" }}>
                <Typography color='primary' textAlign="center" sx={{ fontSize: "18px", fontWeight: "600" }}>
                    Edit Learning Plan
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="start" sx={{ mt: "30px", mx: "50px" }}>
                <Breadcrumbs aria-label="breadcrumb" separator="›">
                    <Link to="/therapist/home" style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }}>
                        Home
                    </Link>
                    <Link to="/therapist/allstudents" style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }}>
                        All Students
                    </Link>
                    <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Edit Learning Plan
                    </Typography>
                </Breadcrumbs>
            </Box>

            <Box display="flex" flexDirection="column" gap={3} alignItems="center" sx={{ width: "774px", mx: "auto", mt: 5 }}>
                <Typography color='primary' sx={{ fontSize: "24px", fontWeight: "500" }}>Edit Learning Plan</Typography>

                {/* Goal & Plan Duration */}
                <Stack direction="row" spacing={3}>
                    <div style={textFieldStyle}>
                        <label>Goal</label>
                        <input
                            style={inputStyle}
                            name='goal'
                            value={learningPlan.goal}
                            onChange={handleInputChange}
                            type='text'
                        />
                    </div>
                    <div style={textFieldStyle}>
                        <label>Plan Duration (Weeks)</label>
                        <input
                            style={inputStyle}
                            name='planDuration'
                            value={learningPlan.planDuration}
                            onChange={handleInputChange}
                            type='number'
                        />
                    </div>
                </Stack>

                <Box sx={{ borderBottom: "1px solid #CCCCCC", width: "100%" }}></Box>

                {/* Weeks and Activities */}
                {learningPlan.weeks.map((week, weekIndex) => (
                    <Box key={weekIndex} display="flex" flexDirection="column" gap={2} alignItems="center" sx={{ width: '100%' }}>
                        <Typography color='primary' sx={{ fontSize: "18px", fontWeight: "600" }}>{`Week ${weekIndex + 1}`}</Typography>

                        <Box sx={{ 
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            gap: '20px'
                        }}>
                            {/* Activities */}
                            {week.activities.map((activity, activityIndex) => (
                                <Box key={activityIndex} sx={activityContainerStyle}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        Activity {activityIndex + 1}
                                    </Typography>
                                    <div style={textFieldStyle}>
                                        <label>Title</label>
                                        <input
                                            style={inputStyle}
                                            name='title'
                                            value={activity.title}
                                            onChange={(e) => handleActivityChange(weekIndex, activityIndex, e)}
                                        />
                                    </div>
                                    <div style={{height: "85px", width: "100%", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative"}}>
                                        <label>Description</label>
                                        <input
                                            style={{height: "60px", borderRadius: "8px", border: "1px solid #CCCCCC", padding: '8px', width: '100%'}}
                                            name='description'
                                            value={activity.description}
                                            onChange={(e) => handleActivityChange(weekIndex, activityIndex, e)}
                                        />
                                    </div>
                                </Box>
                            ))}

                            {/* Add Activity Button Container */}
                            <Box sx={{
                                ...activityContainerStyle,
                                border: '1px dashed #CCCCCC',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Button
                                    variant='outlined'
                                    color='secondary'
                                    sx={{ borderRadius: "25px", width: '200px' }}
                                    startIcon={<AddIcon />}
                                    onClick={() => handleAddActivity(weekIndex)}
                                >
                                    Add activity
                                </Button>
                            </Box>
                        </Box>

                        <Box sx={{ borderBottom: "1px solid #CCCCCC", width: "100%" }}></Box>
                    </Box>
                ))}

                {/* Add Week Button */}
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "100px", width: "744px", border: "1px dashed #CCCCCC" }}>
                    <Button
                        variant='outlined'
                        color='secondary'
                        sx={{ borderRadius: "25px", height: "40px", width: '200px' }}
                        startIcon={<AddIcon />}
                        onClick={handleAddWeek}
                    >
                        Add week
                    </Button>
                </Box>

                {/* Action Buttons */}
                <Box display='flex' gap={2} sx={{ mb: 4 }}>
                    <Button
                        variant='outlined'
                        color='secondary'
                        sx={{ borderRadius: "25px", height: "40px", width: '200px' }}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        sx={{ borderRadius: "25px", height: "40px", width: '200px' }}
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default TherapistEditLearningPlan;