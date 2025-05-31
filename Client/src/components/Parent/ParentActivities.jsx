import React, { useEffect, useState } from 'react';
import ParentNavbar from '../Navbar/ParentNavbar';
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Breadcrumbs, Button, Card, CardMedia, CardContent, Grid, Typography, Container, CircularProgress } from '@mui/material';
import LirbraryCardImage from '../../assets/librarycard.png';
import axios from 'axios';
import { toast } from 'react-toastify';

const ParentActivities = () => {
    const [parentDetails, setParentDetails] = useState({});
    const [allActivities, setAllActivities] = useState([]);
    const [myActivities, setMyActivities] = useState([]);
    const [displayedActivities, setDisplayedActivities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('myActivities');
    const [loading, setLoading] = useState({
        all: false,
        my: false
    });

    useEffect(() => {
        const parentData = localStorage.getItem("parentDetails");
        if (parentData) {
            setParentDetails(JSON.parse(parentData));
            fetchAllActivities();
            fetchMyActivities(JSON.parse(parentData)._id);
        }
    }, []);

    const fetchAllActivities = async () => {
        try {
            setLoading(prev => ({ ...prev, all: true }));
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:4000/activity/getallactivities', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAllActivities(response.data.data || []);
            console.log("All Activities:", response.data.data);
            
        } catch (error) {
            console.error("Error fetching all activities:", error);
            toast.error(error.response?.data?.message || "Failed to fetch activities");
        } finally {
            setLoading(prev => ({ ...prev, all: false }));
        }
    };

    const fetchMyActivities = async (parentId) => {
        try {
            setLoading(prev => ({ ...prev, my: true }));
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:4000/activity/parent/${parentId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMyActivities(response.data.data || []);
            setDisplayedActivities(response.data.data || []);
        } catch (error) {
            console.error("Error fetching my activities:", error);
            toast.error(error.response?.data?.message || "Failed to fetch your activities");
        } finally {
            setLoading(prev => ({ ...prev, my: false }));
        }
    };

    useEffect(() => {
        const filtered = activeTab === 'myActivities' 
            ? myActivities.filter(activity =>
                activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                activity.category.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : allActivities.filter(activity =>
                activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                activity.category.toLowerCase().includes(searchTerm.toLowerCase())
              );
        setDisplayedActivities(filtered);
    }, [searchTerm, activeTab, myActivities, allActivities]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchTerm('');
    };

    const handleEnrollActivity = async (activityId) => {
        try {
            const token = localStorage.getItem("token");
            const parentId = parentDetails._id;
            
            await axios.post('http://localhost:4000/activity/enroll', {
                activityId,
                parentId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            toast.success("Activity enrolled successfully!");
            fetchMyActivities(parentId); // Refresh my activities
        } catch (error) {
            console.error("Error enrolling in activity:", error);
            toast.error(error.response?.data?.message || "Failed to enroll in activity");
        }
    };

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/parent/profile');
    };

    return (
        <>
            <ParentNavbar parentDetails={parentDetails} navigateToProfile={navigateToProfile} />
            <Box sx={{ background: "white" }}>
                <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "46px", background: "#DBE8FA" }}>
                    <Typography color='primary' textAlign="center" sx={{ fontSize: "18px", fontWeight: "600" }}>Activities</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2, ml: "50px", mr: "50px" }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} to="/parent/home">
                            Home
                        </Link>
                        <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>Activities</Typography>
                    </Breadcrumbs>
                    <Box display="flex" alignItems="center" gap={3}>
                        <Box display="flex" alignItems="center" gap={1} style={{ padding: "8px 15px", borderRadius: "25px", border: "1px solid #CCCCCC", height: "40px" }}>
                            <SearchOutlinedIcon />
                            <input 
                                placeholder='Search here...' 
                                style={{ padding: "8px 15px", border: 0, outline: 0, height: "100%" }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Tab buttons */}
                <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                    <Box
                        sx={{
                            backgroundColor: '#F6F7F9',
                            borderRadius: '30px',
                            padding: '5px',
                            display: 'inline-flex',
                            transition: 'all 0.3s ease-in-out'
                        }}
                    >
                        <Button
                            onClick={() => handleTabChange('myActivities')}
                            sx={{
                                padding: '8px 20px',
                                backgroundColor: activeTab === 'myActivities' ? '#1967D2' : 'transparent',
                                color: activeTab === 'myActivities' ? '#fff' : '#000',
                                borderRadius: '25px',
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: activeTab === 'myActivities' ? '#1152b4' : 'rgba(0,0,0,0.04)'
                                }
                            }}
                        >
                            My Activities
                        </Button>
                        <Button
                            onClick={() => handleTabChange('allActivities')}
                            sx={{
                                padding: '8px 20px',
                                backgroundColor: activeTab === 'allActivities' ? '#1967D2' : 'transparent',
                                color: activeTab === 'allActivities' ? '#fff' : '#000',
                                borderRadius: '25px',
                                textTransform: 'none',
                                fontWeight: 500,
                                fontSize: '14px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    backgroundColor: activeTab === 'allActivities' ? '#1152b4' : 'rgba(0,0,0,0.04)'
                                }
                            }}
                        >
                            Explore Activities
                        </Button>
                    </Box>
                </Box>

                <Container maxWidth="lg" sx={{ py: 4 }}>
                    {(loading.all && activeTab === 'allActivities') || (loading.my && activeTab === 'myActivities') ? (
                        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Grid container spacing={4} justifyContent="center">
                            {displayedActivities.length > 0 ? (
                                displayedActivities.map((activity) => (
                                    <Grid item xs={12} sm={6} md={4} key={activity._id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Card sx={{ 
                                            width: '100%',
                                            maxWidth: 345,
                                            bgcolor: 'transparent',
                                            boxShadow: 'none',
                                            p: 2,
                                            '&:hover': {
                                                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
                                            }
                                        }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={activity.image || LirbraryCardImage}
                                                alt={activity.title}
                                                sx={{
                                                    borderRadius: '12px',
                                                    objectFit: 'cover',
                                                    backgroundColor: 'transparent',
                                                    mb: 2
                                                }}
                                            />

                                            <CardContent sx={{ 
                                                p: 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: 1
                                            }}>
                                                <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 500, color: "#384371" }}>
                                                    {activity.title}
                                                </Typography>
                                                
                                                <Typography variant="h6" sx={{ fontSize: "14px", color: "#384371" }}>
                                                    {activity.description}
                                                </Typography>
                                                
                                                <Typography variant="caption" sx={{ 
                                                    color: 'secondary.main',
                                                    fontWeight: 500,
                                                    display: 'block'
                                                }}>
                                                    Activity Category
                                                </Typography>
                                                
                                                <Typography variant="h6" sx={{ color: "#384371", mb: 1, fontSize: "13px" }}>
                                                    {activity.category}
                                                </Typography>

                                                {activeTab === 'allActivities' && (
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        sx={{ alignSelf: 'flex-start', mt: 1, borderRadius: '20px', textTransform: 'none', width: "102%" }}
                                                        onClick={() => handleEnrollActivity(activity._id)}
                                                    >
                                                        Have a try
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Typography sx={{ mt: 4, color: 'text.secondary' }}>
                                    No activities found. {searchTerm && "Try a different search term."}
                                </Typography>
                            )}
                        </Grid>
                    )}
                </Container>
            </Box>
        </>
    );
}   

export default ParentActivities;
// 