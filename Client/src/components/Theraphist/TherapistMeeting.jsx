import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TheraphistNavbar from '../Navbar/TheraphistNavbar';
import { Box, Breadcrumbs, Button, Typography, Avatar, Chip } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import AddMeeting from './Common/addMeeting';

const TherapistMeeting = () => {
    const [therapistDetails, setTherapistDetails] = useState({});
    const [meetings, setMeetings] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    
    const homebg = {
        backgroundColor: "#F6F7F9"
    };

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // First try to load from localStorage
        const storedTherapist = localStorage.getItem("theraphistDetails");
        if (storedTherapist) {
            try {
                const parsed = JSON.parse(storedTherapist);
                if (parsed && parsed._id) {
                    setTherapistDetails(parsed);
                }
            } catch (error) {
                console.error("Error parsing stored therapist:", error);
            }
        }
        
        // Then fetch fresh data
        fetchTherapist();
        fetchAllMeetings();
    }, []);

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/theraphist/profile');
    };

    const [addMeetingopen, setAddMeetingOpen] = React.useState(false);
    const handleAddMeetingOpen = () => setAddMeetingOpen(true);
    const handleAddMeetingClose = () => setAddMeetingOpen(false);
    const fetchAllMeetings = async () => {
        // Dummy data with more details
        const dummyMeetings = [
            {
                _id: "1",
                meetingTitle: "Initial Consultation",
                date: "2023-06-15",
                startTime: "10:00 AM",
                endTime: "11:00 AM",
                meetLink: "https://meet.google.com/abc-def-ghi",
                status: "upcoming",
                childId: {
                    name: "Alice Johnson",
                    dateOfBirth: "2018-05-10",
                    gender: "Female",
                    parentId: {
                        name: "Robert Johnson",
                        email: "robert.j@example.com",
                        phone: "+1 555-123-4567"
                    }
                }
            },
            {
                _id: "2",
                meetingTitle: "Progress Review Session",
                date: "2023-06-20",
                startTime: "02:00 PM",
                endTime: "03:30 PM",
                meetLink: "https://meet.google.com/jkl-mno-pqr",
                status: "upcoming",
                childId: {
                    name: "Michael Brown",
                    dateOfBirth: "2017-11-22",
                    gender: "Male",
                    parentId: {
                        name: "Sarah Brown",
                        email: "sarah.b@example.com",
                        phone: "+1 555-987-6543"
                    }
                }
            },
            {
                _id: "3",
                meetingTitle: "Behavioral Strategy Discussion",
                date: "2023-06-25",
                startTime: "09:30 AM",
                endTime: "10:15 AM",
                meetLink: "https://meet.google.com/stu-vwx-yza",
                status: "completed",
                childId: {
                    name: "Emma Wilson",
                    dateOfBirth: "2019-03-15",
                    gender: "Female",
                    parentId: {
                        name: "David Wilson",
                        email: "david.w@example.com",
                        phone: "+1 555-456-7890"
                    }
                }
            },
            {
                _id: "4",
                meetingTitle: "Follow-up Session",
                date: "2023-07-02",
                startTime: "11:00 AM",
                endTime: "12:00 PM",
                meetLink: "",
                status: "cancelled",
                childId: {
                    name: "James Miller",
                    dateOfBirth: "2016-08-30",
                    gender: "Male",
                    parentId: {
                        name: "Jennifer Miller",
                        email: "jennifer.m@example.com",
                        phone: "+1 555-789-0123"
                    }
                }
            }
        ];
        setMeetings(dummyMeetings);
    };

    const handleJoinMeeting = (meetLink) => {
        if (meetLink) {
            window.open(meetLink, '_blank', 'noopener,noreferrer');
        } else {
            alert('No meeting link available for this meeting');
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'upcoming': return 'primary';
            case 'completed': return 'success';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <>
            <TheraphistNavbar 
                theraphistdetails={therapistDetails} 
                navigateToProfile={navigateToProfile} 
            />
            
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "46px", background: "#DBE8FA" }}>
                <Typography color='primary' textAlign="center" sx={{ fontSize: "18px", fontWeight: "600" }}>
                    Meetings
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: "30px", mx: "50px" }}>
                <Breadcrumbs aria-label="breadcrumb" separator="›">
                    <Link to="/theraphist/home" style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }}>
                        Home
                    </Link>
                    <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>
                        Meetings
                    </Typography>
                </Breadcrumbs>
            </Box>
            
            <Box sx={{ background: "white" }}>
                <Box display={'flex'} flexDirection={'column'} gap={2}>
                    {meetings.map((meeting, index) => {
                        return (
                            <Box 
                                key={index} 
                                display="flex" 
                                alignItems="center" 
                                sx={{ 
                                    height: "198px", 
                                    background: "#F0F6FE", 
                                    borderRadius: "20px", 
                                    m: "20px 50px" 
                                }}
                            >
                                {/* First Section (Student Info) */}
                                <Box 
                                    sx={{ 
                                        m: "20px", 
                                        borderRadius: "15px", 
                                        border: "1px solid #CCCCCC", 
                                        height: "150px", 
                                        flexBasis: "40%",
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Box sx={{ gap: "20px", p: "20px" }} display="flex" flexDirection="column" alignItems="start">
                                        <Box display="flex" alignItems="center" sx={{ gap: "15px" }}>
                                            <Box sx={{ color: "#1967D2" }}><PersonOutlinedIcon /></Box>
                                            <Box display="flex" flexDirection="column" alignItems="start">
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", fontWeight: "500" }}>
                                                    Student's name
                                                </Typography>
                                                <Typography variant="h6" color="text.primary" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meeting.childId.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{ gap: "15px" }}>
                                            <Box sx={{ color: "#1967D2" }}><PersonOutlinedIcon /></Box>
                                            <Box display="flex" flexDirection="column" alignItems="start">
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", fontWeight: "500" }}>
                                                    Parent name
                                                </Typography>
                                                <Typography variant="h6" color="text.primary" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meeting.childId.parentId?.name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    
                                    <Box sx={{ borderLeft: "1px solid #CCCCCC", m: "10px 0" }} />
                                    
                                    <Box sx={{ gap: "20px", p: "20px" }} display="flex" flexDirection="column" alignItems="start">
                                        <Box display="flex" alignItems="center" sx={{ gap: "15px", pl: "50px" }}>
                                            <Box sx={{ color: "#1967D2" }}><DateRangeIcon /></Box>
                                            <Box display="flex" flexDirection="column" alignItems="start">
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", fontWeight: "500" }}>
                                                    Date of birth
                                                </Typography>
                                                <Typography variant="h6" color="text.primary" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meeting.childId.dateOfBirth}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{ gap: "15px", pl: "50px" }}>
                                            <Box sx={{ color: "#1967D2" }}><FemaleIcon /></Box>
                                            <Box display="flex" flexDirection="column" alignItems="start">
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", fontWeight: "500" }}>
                                                    Gender
                                                </Typography>
                                                <Typography variant="h6" color="text.primary" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meeting.childId.gender}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                
                                {/* Second Section (Meeting Info) */}
                                <Box 
                                    sx={{ 
                                        m: "20px", 
                                        borderRadius: "15px", 
                                        border: "1px solid #CCCCCC", 
                                        height: "150px", 
                                        flexBasis: "40%",
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Box sx={{ gap: "20px", p: "20px" }} display="flex" flexDirection="column" alignItems="start">
                                        <Box display="flex" alignItems="center" sx={{ gap: "15px" }}>
                                            <Box display="flex" flexDirection="column" alignItems="start">
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", fontWeight: "500" }}>
                                                    Meeting
                                                </Typography>
                                                <Typography variant="h6" color="text.primary" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meeting.meetingTitle}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{ gap: "15px" }}>
                                            <Box display="flex" flexDirection="column" alignItems="start">
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", fontWeight: "500" }}>
                                                    Date
                                                </Typography>
                                                <Typography variant="h6" color="text.primary" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meeting.date}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    
                                    <Box sx={{ borderLeft: "1px solid #CCCCCC", m: "10px 0" }} />
                                    
                                    <Box sx={{ gap: "20px", p: "20px" }} display="flex" flexDirection="column" alignItems="start">
                                        <Box display="flex" alignItems="center" sx={{ gap: "15px", pl: "50px" }}>
                                            <Box display="flex" flexDirection="column" alignItems="start">
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "12px", fontWeight: "500" }}>
                                                    Time
                                                </Typography>
                                                <Typography variant="h6" color="text.primary" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meeting.startTime} - {meeting.endTime}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>

                                {/* Join Button */}
                                <Button 
                                    variant="contained" 
                                    color="secondary" 
                                    sx={{ 
                                        borderRadius: "25px", 
                                        marginTop: "20px", 
                                        height: "40px", 
                                        width: "150px", 
                                        padding: "10px 35px",
                                        mr: "20px"
                                    }}
                                    onClick={() => handleJoinMeeting(meeting.meetLink)}
                                    
                                >
                                    Join
                                </Button>
                            </Box>
                        )
                    })}
                </Box>
                
                {/* Empty state */}
                {meetings.length === 0 && (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "200px" }}>
                        <Typography variant="h6" color="textSecondary">
                            No meetings scheduled yet
                        </Typography>
                    </Box>
                )}
            </Box>

            <AddMeeting 
                handleAddMeetingOpen={handleAddMeetingOpen} 
                addMeetingopen={addMeetingopen} 
                handleAddMeetingClose={handleAddMeetingClose} 
                fetchAllMeetings={fetchAllMeetings}
            />
        </>
    )
}

export default TherapistMeeting;