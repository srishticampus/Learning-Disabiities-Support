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
    useEffect(() => {
        const parentdetails = localStorage.getItem("parentdetails");
        setParentdetails(JSON.parse(parentdetails));
    }, []);
    
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/parent/profile');
    };

    // Updated dummy data with meet links
    const dummyMeetings = [
        {
            _id: "1",
            childId: {
                name: "Rahul Sharma",
                parentId: {
                    name: "Amit Sharma"
                },
                dateOfBirth: "12/05/2015",
                gender: "Male"
            },
            meetingTitle: "Parent-Therapist Conference",
            date: "15/06/2023",
            startTime: "10:00 AM",
            endTime: "10:30 AM",
            meetLink: "https://meet.google.com/abc-def-ghi" // Added meet link
        },
        {
            _id: "2",
            childId: {
                name: "Priya Patel",
                parentId: {
                    name: "Neha Patel"
                },
                dateOfBirth: "22/08/2016",
                gender: "Female"
            },
            meetingTitle: "Progress Review",
            date: "18/06/2023",
            startTime: "02:00 PM",
            endTime: "02:45 PM",
            meetLink: "https://meet.google.com/jkl-mno-pqr" // Added meet link
        },
        {
            _id: "3",
            childId: {
                name: "Arjun Singh",
                parentId: {
                    name: "Vikram Singh"
                },
                dateOfBirth: "05/03/2015",
                gender: "Male"
            },
            meetingTitle: "Behavior Discussion",
            date: "20/06/2023",
            startTime: "11:30 AM",
            endTime: "12:15 PM",
            meetLink: "https://meet.google.com/stu-vwx-yza" // Added meet link
        },
        {
            _id: "4",
            childId: {
                name: "Ananya Gupta",
                parentId: {
                    name: "Rahul Gupta"
                },
                dateOfBirth: "14/11/2016",
                gender: "Female"
            },
            meetingTitle: "Annual Review",
            date: "22/06/2023",
            startTime: "09:00 AM",
            endTime: "09:45 AM",
            meetLink: "https://meet.google.com/123-456-789" // Added meet link
        },
        {
            _id: "5",
            childId: {
                name: "Vihaan Malhotra",
                parentId: {
                    name: "Sanjay Malhotra"
                },
                dateOfBirth: "30/01/2015",
                gender: "Male"
            },
            meetingTitle: "Special Needs Discussion",
            date: "25/06/2023",
            startTime: "03:00 PM",
            endTime: "03:30 PM",
            meetLink: "https://meet.google.com/xyz-uvw-rst" // Added meet link
        }
    ];

    const [meetings, setMeetings] = useState(dummyMeetings);
    
    // Function to handle joining a meeting
    const handleJoinMeeting = (meetLink) => {
        if (meetLink) {
            // Open the meeting link in a new tab
            window.open(meetLink, '_blank', 'noopener,noreferrer');
        } else {
            alert('No meeting link available for this meeting');
        }
    };

    // Actual API call commented out and replaced with dummy data
    /* 
    const fetchMeeting = async () => {
        const token = localStorage.getItem("token");
        const parentId = (JSON.parse(localStorage.getItem("parentdetails")))._id;
        const meetings = await axiosInstance.get(`/parent/getallmeeting/${parentId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(meetings.data.meeting);
        setMeetings(meetings.data.meeting);
    }
    
    useEffect(() => {
        fetchMeeting();
    }, [])
    */

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
                    {meetings.map((meeting, index) => {
                        return (
                            <Box key={index} display={'flex'} alignItems={'center'} sx={{ height: "198px", background: "#F0F6FE", borderRadius: "20px", m: "20px 50px" }}>
                                <Box sx={{ m: "20px", borderRadius: "15px", border: "1px solid #CCCCCC", height: "150px", flexBasis: "40%" }} display={"flex"} justifyContent={"space-between"}>
                                    <Box sx={{ gap: "20px", p: "20px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                        <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                                            <Box sx={{ color: "#1967D2" }}><PersonOutlinedIcon /></Box>
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Students name</Typography>
                                                <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.childId.name}</Typography>
                                            </Box>
                                        </Box>
                                        <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                                            <Box sx={{ color: "#1967D2" }}><PersonOutlinedIcon /></Box>
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>parent name</Typography>
                                                <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.childId.parentId.name}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ borderLeft: "1px solid #CCCCCC", m: "10px 0px" }}></Box>
                                    <Box sx={{ gap: "20px", p: "20px" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                        <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px", pl: "50px" }}>
                                            <Box sx={{ color: "#1967D2" }}><DateRangeIcon /></Box>
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Date of birth</Typography>
                                                <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.childId.dateOfBirth}</Typography>
                                            </Box>
                                        </Box>
                                        <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px", pl: "50px" }}>
                                            <Box sx={{ color: "#1967D2" }}><FemaleIcon /></Box>
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>gender</Typography>
                                                <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.childId.gender}</Typography>
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
                                                <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{meeting.date}</Typography>
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
                    })}
                </Box>
            </Box>
        </>
    )
}

export default ParentMeeting