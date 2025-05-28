import React, { useEffect, useState } from 'react'
import ParentNavbar from '../Navbar/ParentNavbar'
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Avatar, Box, Breadcrumbs, Button, Card, Fade, Grid, Modal, Typography } from '@mui/material';

const ParentEducatorLearning = () => {
    const [parentdetails, setParentdetails] = useState({});
    const [activities, setActivities] = useState({
        week1: [
            { id: 1, title: "Picture Story Sequencing", description: "Arrange a set of 4–5 pictures in logical order to form a story. Helps with sequencing and storytelling.", status: "completed", date: "12/05/2025" },
            { id: 2, title: "Story Retelling", description: "Listen to a short story and retell it in own words. Improves comprehension and recall.", status: "completed", date: "14/05/2025" },
            { id: 3, title: "Picture Description", description: "Describe a picture in detail. Enhances vocabulary and descriptive skills.", status: "completed", date: "16/05/2025" }
        ],
        week2: [
            { id: 1, title: "Sequencing Daily Activities", description: "Arrange pictures of daily routines in correct order. Improves understanding of time concepts.", status: "in-progress" },
            { id: 2, title: "Story Prediction", description: "Predict what happens next in a story. Develops critical thinking skills.", status: "pending" },
            { id: 3, title: "Role Play Storytelling", description: "Act out a story with props. Enhances imagination and verbal expression.", status: "pending" }
        ],
        week3: [
            { id: 1, title: "Create Your Own Story", description: "Use picture cards to create an original story. Boosts creativity and narrative skills.", status: "pending" },
            { id: 2, title: "Story Mapping", description: "Identify key story elements (characters, setting, problem, solution). Improves story analysis.", status: "pending" },
            { id: 3, title: "Sequencing Complex Stories", description: "Arrange 6-8 pictures to form a more complex narrative. Challenges advanced sequencing.", status: "pending" }
        ]
    });

    useEffect(() => {
        const parentdetails = localStorage.getItem("parentdetails");
        setParentdetails(JSON.parse(parentdetails));
    }, []);

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/parent/profile');
    }

    const formatDate = () => {
        const today = new Date();
        return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    };

    const markAsCompleted = (week, activityId) => {
        setActivities(prev => {
            const updatedActivities = {...prev};
            const weekActivities = [...updatedActivities[week]];
            const activityIndex = weekActivities.findIndex(a => a.id === activityId);
            
            if (activityIndex !== -1) {
                // Mark current activity as completed
                weekActivities[activityIndex] = {
                    ...weekActivities[activityIndex],
                    status: "completed",
                    date: formatDate()
                };
                
                // Find next pending activity in current week
                const nextActivityIndex = weekActivities.findIndex(a => a.status === "pending");
                if (nextActivityIndex !== -1) {
                    weekActivities[nextActivityIndex] = {
                        ...weekActivities[nextActivityIndex],
                        status: "in-progress"
                    };
                } 
                // If no more activities in current week, check next week
                else if (week === "week1") {
                    const week2Activities = [...updatedActivities.week2];
                    const firstPendingWeek2 = week2Activities.findIndex(a => a.status === "pending");
                    if (firstPendingWeek2 !== -1) {
                        week2Activities[firstPendingWeek2] = {
                            ...week2Activities[firstPendingWeek2],
                            status: "in-progress"
                        };
                        updatedActivities.week2 = week2Activities;
                    }
                } else if (week === "week2") {
                    const week3Activities = [...updatedActivities.week3];
                    const firstPendingWeek3 = week3Activities.findIndex(a => a.status === "pending");
                    if (firstPendingWeek3 !== -1) {
                        week3Activities[firstPendingWeek3] = {
                            ...week3Activities[firstPendingWeek3],
                            status: "in-progress"
                        };
                        updatedActivities.week3 = week3Activities;
                    }
                }
                
                updatedActivities[week] = weekActivities;
            }
            
            return updatedActivities;
        });
    };

    const renderActivityStatus = (activity, week) => {
        switch (activity.status) {
            case "in-progress":
                return (
                    <Box display="flex" alignItems="center" gap={2} mt={1}>
                        <Typography variant='h6' sx={{ fontSize: "18px", fontWeight: "500", color: "#1967D2" }}>
                            In Progress
                        </Typography>
                        <Button 
                            variant='outlined' 
                            color='secondary' 
                            sx={{ 
                                borderRadius: "25px", 
                                height: "36px", 
                                width: '100px', 
                                fontSize: "14px", 
                                fontWeight: "500" 
                            }}
                            onClick={() => markAsCompleted(week, activity.id)}
                        >
                            Complete
                        </Button>
                    </Box>
                );
            case "completed":
                return (
                    <Typography variant='h6' sx={{ fontSize: "18px", fontWeight: "500", color: "#149319" }}>
                        Completed on {activity.date}
                    </Typography>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <ParentNavbar parentdetails={parentdetails} navigateToProfile={navigateToProfile} />
            <Box sx={{ background: "white" }}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "46px", background: "#DBE8FA" }}>
                    <Typography color='primary' textAlign={"center"} sx={{ fontSize: "18px", fontWeight: "600" }}>Learning Plan</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ marginTop: "20px", ml: "50px", mr: "50px" }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} underline="hover" to="/parent/home">
                            Home
                        </Link>
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} underline="hover" to="/parent/learningplan">
                            Learning
                        </Link>
                        <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>Educator's Learning Plan</Typography>
                    </Breadcrumbs>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1} style={{ padding: "8px 15px", borderRadius: "25px", border: "1px solid #CCCCCC", height: "40px" }}>
                            <Box sx={{ height: "100%" }}><SearchOutlinedIcon /></Box>
                            <input placeholder='search here' style={{ padding: "8px 15px", border: 0, outline: 0, height: "100%" }}></input>
                        </Box>
                    </Box>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} m={"20px 50px"} sx={{ background: "#F0F6FE", height: "76px" }}>
                    <Typography variant='h4' color='primary' sx={{ fontSize: "24px", fontWeight: "600", pl: "20px" }}>Goal : Improve storytelling and sequencing ability</Typography>
                    <Typography variant='h4' color='primary' sx={{ fontSize: "24px", fontWeight: "600", pr: "20px" }}>3 Weeks Plan</Typography>
                </Box>
                
                {/* Week 1 */}
                <Box display={'flex'} flexDirection={'column'} m={"20px 50px"} sx={{ background: "#F0F6FE", borderRadius: "12px" }}>
                    <Typography variant='h6' color='primary' sx={{ fontSize: "24px", fontWeight: "500", p: "20px 30px" }}>Week 1</Typography>
                    <Box display={"flex"} alignItems={"flex-start"} gap={1} pb={3}>
                        {activities.week1.map((activity, index) => (
                            <Box key={index} display={'flex'} flexDirection={'column'} gap={1} width={"33%"} p={"10px 30px"}>
                                <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "600" }}>Activity {activity.id}</Typography>
                                <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>{activity.title}</Typography>
                                <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#7F7F7F" }}>{activity.description}</Typography>
                                {renderActivityStatus(activity, "week1")}
                            </Box>
                        ))}
                    </Box>
                </Box>
                
                {/* Week 2 */}
                <Box display={'flex'} flexDirection={'column'} m={"20px 50px"} sx={{ background: "#F0F6FE", borderRadius: "12px" }}>
                    <Typography variant='h6' color='primary' sx={{ fontSize: "24px", fontWeight: "500", p: "20px 30px" }}>Week 2</Typography>
                    <Box display={"flex"} alignItems={"flex-start"} gap={1} pb={3}>
                        {activities.week2.map((activity, index) => (
                            <Box key={index} display={'flex'} flexDirection={'column'} gap={1} width={"33%"} p={"10px 30px"}>
                                <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "600" }}>Activity {activity.id}</Typography>
                                <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>{activity.title}</Typography>
                                <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#7F7F7F" }}>{activity.description}</Typography>
                                {renderActivityStatus(activity, "week2")}
                            </Box>
                        ))}
                    </Box>
                </Box>
                
                {/* Week 3 */}
                <Box display={'flex'} flexDirection={'column'} m={"20px 50px"} sx={{ background: "#F0F6FE", borderRadius: "12px" }}>
                    <Typography variant='h6' color='primary' sx={{ fontSize: "24px", fontWeight: "500", p: "20px 30px" }}>Week 3</Typography>
                    <Box display={"flex"} alignItems={"flex-start"} gap={1} pb={3}>
                        {activities.week3.map((activity, index) => (
                            <Box key={index} display={'flex'} flexDirection={'column'} gap={1} width={"33%"} p={"10px 30px"}>
                                <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "600" }}>Activity {activity.id}</Typography>
                                <Typography variant='h6' color='primary' sx={{ fontSize: "18px", fontWeight: "500" }}>{activity.title}</Typography>
                                <Typography variant='h6' sx={{ fontSize: "14px", fontWeight: "500", color: "#7F7F7F" }}>{activity.description}</Typography>
                                {renderActivityStatus(activity, "week3")}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ParentEducatorLearning
