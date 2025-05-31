import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ParentNavbar from '../Navbar/ParentNavbar';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FemaleIcon from '@mui/icons-material/Female';
import DateRangeIcon from '@mui/icons-material/DateRange';
import axiosInstance from '../../Api_service/baseUrl';

const ParentMeeting = () => {
    const [parentdetails, setParentdetails] = useState({});
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const parentdetails = localStorage.getItem("parentdetails");
        setParentdetails(JSON.parse(parentdetails));
    }, []);

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/parent/profile');
    };

    const fetchMeetings = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const parentId = (JSON.parse(localStorage.getItem("parentdetails")))._id;
            
            const response = await axiosInstance.get(`/parent/getallmeeting/${parentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setMeetings(response.data.meetings || []);
        } catch (error) {
            console.error("Error fetching meetings:", error);
            setMeetings([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMeetings();
    }, []);

    // Function to handle joining a meeting
    const handleJoinMeeting = (meetLink) => {
        if (meetLink) {
            // Open the meeting link in a new tab
            window.open(meetLink, '_blank', 'noopener,noreferrer');
        } else {
            alert('No meeting link available for this meeting');
        }
    };

    return (
        <>
            <ParentNavbar parentdetails={parentdetails} navigateToProfile={navigateToProfile} />
            <Box sx={{ background: "white" }}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "46px", background: "#DBE8FA" }}>
                    <Typography color='primary' textAlign={"center"} sx={{ fontSize: "18px", fontWeight: "600" }}>Meeting</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ marginTop: "20px", ml: "50px", mr: "50px" }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} underline="hover" to="/parent/home">
                            Home
                        </Link>
                        <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>Meetings</Typography>
                    </Breadcrumbs>
                </Box>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "200px" }}>
                            <Typography>Loading meetings...</Typography>
                        </Box>
                    ) : meetings.length === 0 ? (
                        <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "200px" }}>
                            <Typography>No meetings scheduled yet</Typography>
                        </Box>
                    ) : (
                        meetings.map((meeting, index) => {
                            return (
                                <Box key={index} display={'flex'} alignItems={'center'} sx={{ height: "198px", background: "#F0F6FE", borderRadius: "20px", m: "20px 50px" }}>
                                    <Box sx={{ m: "20px", borderRadius: "15px", border: "1px solid #CCCCCC", height: "150px", flexBasis: "40%" }} display={"flex"} justifyContent={"space-between"}>
                                        <Box sx={{ gap: "20px", p: "20px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                                                <Box sx={{ color: "#1967D2" }}><PersonOutlinedIcon /></Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Students name</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.childId?.name}</Typography>
                                                </Box>
                                            </Box>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                                                <Box sx={{ color: "#1967D2" }}><PersonOutlinedIcon /></Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>parent name</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{parentdetails?.name}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ borderLeft: "1px solid #CCCCCC", m: "10px 0px" }}></Box>
                                        <Box sx={{ gap: "20px", p: "20px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px", pl: "50px" }}>
                                                <Box sx={{ color: "#1967D2" }}><DateRangeIcon /></Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Date of birth</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                        {new Date(meeting.childId?.dateOfBirth).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px", pl: "50px" }}>
                                                <Box sx={{ color: "#1967D2" }}><FemaleIcon /></Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>gender</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.childId?.gender}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ m: "20px", borderRadius: "15px", border: "1px solid #CCCCCC", height: "150px", flexBasis: "40%" }} display={"flex"} justifyContent={"space-between"}>
                                        <Box sx={{ gap: "20px", p: "20px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Meeting</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.meetingTitle}</Typography>
                                                </Box>
                                            </Box>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Date</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                        {new Date(meeting.date).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box sx={{ borderLeft: "1px solid #CCCCCC", m: "10px 0px" }}></Box>
                                        <Box sx={{ gap: "20px", p: "20px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px", pl: "50px" }}>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Time</Typography>
                                                    <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.startTime} - {meeting.endTime}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Button 
                                        variant='contained' 
                                        color='secondary' 
                                        sx={{ 
                                            borderRadius: "25px", 
                                            marginTop: "20px", 
                                            height: "40px", 
                                            width: '150px', 
                                            padding: '10px 35px' 
                                        }}
                                        onClick={() => handleJoinMeeting(meeting.meetLink)}
                                    >
                                        Join
                                    </Button>
                                </Box>
                            )
                        })
                    )}
                </Box>
            </Box>
        </>
    )
}

export default ParentMeeting