import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, Breadcrumbs } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ParentNavbar from '../Navbar/ParentNavbar';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const ParentTheraphistLearning = () => {
    const { therapistId, childId } = useParams();
    const navigate = useNavigate();

    
    const [learningPlan, setLearningPlan] = useState({
        goal: '',
        planDuration: 1,
        weeks: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [parentDetails, setParentDetails] = useState({});

    const formatDate = () => {
        const today = new Date();
        return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    };

const markAsCompleted = async (weekIndex, activityIndex) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No authentication token found");
        }

        // Optimistic UI update
        setLearningPlan(prev => {
            const updatedPlan = { ...prev };
            const updatedWeeks = [...updatedPlan.weeks];
            const updatedWeek = { ...updatedWeeks[weekIndex] };
            const updatedActivities = [...updatedWeek.activities];
            
            updatedActivities[activityIndex] = {
                ...updatedActivities[activityIndex],
                completed: true,
                completedDate: formatDate(),
                // completedBy will be set by the backend response
            };
            
            updatedWeek.activities = updatedActivities;
            updatedWeeks[weekIndex] = updatedWeek;
            updatedPlan.weeks = updatedWeeks;
            
            return updatedPlan;
        });

        // API call
        const response = await axios.put(
            `http://localhost:4000/ldss/parent/completeactivity/${childId}/${weekIndex}/${activityIndex}`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        // Update with the actual data from backend
        if (response.data.success) {
            setLearningPlan(prev => {
                const updatedPlan = { ...prev };
                const updatedWeeks = [...updatedPlan.weeks];
                const updatedWeek = { ...updatedWeeks[weekIndex] };
                const updatedActivities = [...updatedWeek.activities];
                
                updatedActivities[activityIndex] = {
                    ...updatedActivities[activityIndex],
                    completed: true,
                    completedDate: response.data.data.completedDate,
                    completedBy: response.data.data.completedBy
                };
                
                updatedWeek.activities = updatedActivities;
                updatedWeeks[weekIndex] = updatedWeek;
                updatedPlan.weeks = updatedWeeks;
                
                return updatedPlan;
            });

            toast.success("Activity marked as completed successfully!");
        }

    } catch (error) {
        console.error("Error marking activity as completed:", error);
        
        // Revert optimistic update
        setLearningPlan(prev => ({ ...prev }));
        
        toast.error(error.response?.data?.message || "Failed to mark activity as completed");
    }
};

    const fetchLearningPlan = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!childId) throw new Error("Missing child ID");

            const url = therapistId
                ? `http://localhost:4000/ldss/parent/getstudentplantherapist/${therapistId}/${childId}`
                : `http://localhost:4000/ldss/parent/getstudentplan/${childId}`;

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!response.data?.data || !Array.isArray(response.data.data)) {
                throw new Error("Invalid data structure from API");
            }

            const plan = response.data.data[0] || {};

            const formattedPlan = {
                _id: plan._id || null,
                goal: plan.goal || '',
                planDuration: plan.planDuration || (Array.isArray(plan.weeks) ? plan.weeks.length : 1),
                weeks: Array.isArray(plan.weeks)
                    ? plan.weeks.map(week => ({
                        _id: week._id || null,
                        activities: Array.isArray(week.activities)
                            ? week.activities.map(activity => ({
                                _id: activity._id || null,
                                title: activity.title || '',
                                description: activity.description || '',
                                completed: activity.completed || false,
                                completedDate: activity.completedDate || null
                            }))
                            : []
                    }))
                    : []
            };

            setLearningPlan(formattedPlan);
        } catch (error) {
            console.error("Error fetching learning plan:", error);
            setError(error.message || "Failed to load learning plan");
            toast.error(error.message || "Failed to load learning plan");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedParentDetails = localStorage.getItem("parentDetails");
        if (storedParentDetails) {
            setParentDetails(JSON.parse(storedParentDetails));
        }
        fetchLearningPlan();
    }, [childId, therapistId]);

    const navigateToProfile = () => {
        navigate('/parent/profile');
    };

    const renderActivityStatus = (activity, weekIndex, activityIndex) => {
        if (activity.completed) {
            return (
                <Typography variant='h6' sx={{ fontSize: "18px", fontWeight: "500", color: "#149319" }}>
                    Completed on {activity.completedDate || "a previous date"}
                </Typography>
            );
        } else {
            const weekActivities = learningPlan.weeks[weekIndex]?.activities || [];
            const isFirstIncomplete = weekActivities.findIndex(a => !a.completed) === activityIndex;

            if (isFirstIncomplete) {
                return (
                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <Typography variant='h6' sx={{ fontSize: "18px", fontWeight: "500", color: "#1967D2" }}>
                            In Progress
                        </Typography>
                        <Button
                            variant='outlined'
                            color='secondary'
                            sx={{ borderRadius: "25px", height: "36px", width: '100px', fontSize: "14px", fontWeight: "500" }}
                            onClick={async () => await markAsCompleted(weekIndex, activityIndex)}
                        >
                            Complete
                        </Button>
                    </Box>
                );
            } else {
                return null;
            }
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <>
            <ParentNavbar parentDetails={parentDetails} navigateToProfile={navigateToProfile} />
            <Box sx={{ background: "white" }}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "46px", background: "#DBE8FA" }}>
                    <Typography color='primary' textAlign="center" sx={{ fontSize: "18px", fontWeight: "600" }}>Learning Plan</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ marginTop: "20px", ml: "50px", mr: "50px" }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} underline="hover" to="/parent/home">
                            Home
                        </Link>
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} underline="hover" to="/parent/learningplan">
                            Learning
                        </Link>
                        <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>Therapist's Learning Plan</Typography>
                    </Breadcrumbs>
                    <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
                        <Box display="flex" justifyContent="center" alignItems="center" gap={1} style={{ padding: "8px 15px", borderRadius: "25px", border: "1px solid #CCCCCC", height: "40px" }}>
                            <Box sx={{ height: "100%" }}><SearchOutlinedIcon /></Box>
                            <input placeholder='search here' style={{ padding: "8px 15px", border: 0, outline: 0, height: "100%" }}></input>
                        </Box>
                    </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" m="20px 50px" sx={{ background: "#F0F6FE", height: "76px" }}>
                    <Typography variant='h4' color='primary' sx={{ fontSize: "24px", fontWeight: "600", pl: "20px" }}>Goal : {learningPlan.goal || 'No goal specified'}</Typography>
                    <Typography variant='h4' color='primary' sx={{ fontSize: "24px", fontWeight: "600", pr: "20px" }}>{learningPlan.planDuration || learningPlan.weeks?.length || 1} Weeks Plan</Typography>
                </Box>
                {learningPlan.weeks.map((week, weekIndex) => (
                    <Box key={week._id || weekIndex} display='flex' flexDirection='column' m="20px 50px" sx={{ background: "#F0F6FE", borderRadius: "12px" }}>
                        <Typography variant='h6' color='primary' sx={{ fontSize: "24px", fontWeight: "500", p: "20px 30px" }}>Week {weekIndex + 1}</Typography>
                        <Box display="flex" alignItems="flex-start" gap={1} pb={3}>
                            {week.activities.map((activity, activityIndex) => (
                                <Box key={activity._id || activityIndex} display='flex' flexDirection='column' gap={1} width="33%" p="10px 30px">
                                    <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "600" }}>Activity {activityIndex + 1}</Typography>
                                    <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>{activity.title || 'No title specified'}</Typography>
                                    <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#7F7F7F" }}>{activity.description || 'No description provided'}</Typography>
                                    {renderActivityStatus(activity, weekIndex, activityIndex)}
                                </Box>
                            ))}
                        </Box>
                    </Box>
                ))}
                <Box display='flex' justifyContent='center' gap={2} sx={{ mb: 4, mt: 2 }}>
                    <Button
                        variant='outlined'
                        color='secondary'
                        sx={{ borderRadius: "25px", height: "40px", width: '200px' }}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default ParentTheraphistLearning;
