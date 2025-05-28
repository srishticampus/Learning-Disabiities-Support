import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Fade, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddMeeting from './addMeeting';
import axiosInstance from '../../../Api_service/baseUrl';

const Meeting = ({ openMeeting, handleMeetingClose, childId }) => {
    const styleMeeting = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 736,
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    // add meeting 
    const [addMeetingopen, setAddMeetingOpen] = React.useState(false);
    const [meeting, setMeeting] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [useDummyData, setUseDummyData] = useState(true); // Added dummy data flag

    // Dummy meetings data
    const dummyMeetings = [
        {
            _id: "1",
            meetingTitle: "Therapy Progress Review",
            date: "2023-06-15",
            startTime: "10:00 AM",
            endTime: "11:00 AM",
            meetLink: "https://meet.google.com/abc-defg-hij",
            creatorType: "therapist"
        },
        {
            _id: "2",
            meetingTitle: "Treatment Plan Discussion",
            date: "2023-06-20",
            startTime: "02:00 PM",
            endTime: "03:00 PM",
            meetLink: "https://meet.google.com/klm-nopq-rst",
            creatorType: "therapist"
        }
    ];

    const handleAddMeetingOpen = () => {
        setAddMeetingOpen(true);
    };

    const handleAddMeetingClose = () => {
        setAddMeetingOpen(false);
    };

    const fetchChildMeeting = async () => {
        try {
            setLoading(true);
            
            if (useDummyData) {
                // Use dummy data
                setMeeting(dummyMeetings);
                return;
            }

            const token = localStorage.getItem("token");
            const therapistId = (JSON.parse(localStorage.getItem("therapistDetails")))._id;
            const response = await axiosInstance.get(`/therapist/viewmeeting/${therapistId}/${childId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMeeting(response.data.meeting || []);
        } catch (err) {
            console.error("Error fetching meetings:", err);
            setError("Failed to load meetings");
            setMeeting([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (openMeeting && childId) {
            fetchChildMeeting();
        }
    }, [openMeeting, childId]);

    const handleJoinMeeting = (meetLink) => {
        if (meetLink) {
            window.open(meetLink, '_blank');
        } else {
            alert("No meeting link provided");
        }
    };

    return (
        <>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openMeeting}
                    onClose={handleMeetingClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={openMeeting}>
                        <Box sx={styleMeeting}>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Meeting</Typography>
                                <Box display={"flex"} alignItems={"center"} gap={2}>
                                    <Button 
                                        onClick={handleAddMeetingOpen} 
                                        startIcon={<AddIcon />} 
                                        variant='outlined' 
                                        color='secondary' 
                                        sx={{ borderRadius: "25px", height: "45px", width: '250px', padding: '20px 35px' }}
                                    >
                                        Add meeting
                                    </Button>
                                    <CloseIcon onClick={handleMeetingClose} sx={{ fontSize: "28px", cursor: "pointer" }} />
                                </Box>
                            </Box>
                            <hr />
                            
                            {loading ? (
                                <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                                    <Typography>Loading meetings...</Typography>
                                </Box>
                            ) : error ? (
                                <Box display="flex" justifyContent="center" alignItems="center" height={200}>
                                    <Typography color="error">{error}</Typography>
                                </Box>
                            ) : meeting && meeting.length === 0 ? (
                                <Box>
                                    <Typography textAlign={'center'} variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                        No meetings scheduled yet
                                    </Typography>
                                </Box>
                            ) : (
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={4}>
                                    {meeting.map((meet, index) => (
                                        <Box key={index} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"space-around"}>
                                            <Box display={"flex"} alignItems={"start"} justifyContent={"center"} flexDirection={"column"}>
                                                <Typography color='secondary' variant='h6' sx={{ fontSize: "12px", fontWeight: "500" }}>Meeting</Typography>
                                                <Typography color='primary' variant='h6' sx={{ fontSize: "14px", fontWeight: "500" }}>{meet.meetingTitle}</Typography>
                                            </Box>
                                            <Box display={"flex"} alignItems={"start"} justifyContent={"center"} flexDirection={"column"}>
                                                <Typography color='secondary' variant='h6' sx={{ fontSize: "12px", fontWeight: "500" }}>Date</Typography>
                                                <Typography color='primary' variant='h6' sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meet.date ? new Date(meet.date).toISOString().split('T')[0] : 'N/A'}
                                                </Typography>
                                            </Box>
                                            <Box display={"flex"} alignItems={"start"} justifyContent={"center"} flexDirection={"column"}>
                                                <Typography color='secondary' variant='h6' sx={{ fontSize: "12px", fontWeight: "500" }}>Time</Typography>
                                                <Typography color='primary' variant='h6' sx={{ fontSize: "14px", fontWeight: "500" }}>
                                                    {meet.startTime || 'N/A'} - {meet.endTime || 'N/A'}
                                                </Typography>
                                            </Box>
                                            <Button 
                                                variant='contained' 
                                                color='secondary' 
                                                sx={{ 
                                                    borderRadius: "25px", 
                                                    height: "45px", 
                                                    width: '150px', 
                                                    padding: '10px 35px', 
                                                    fontSize: "14px", 
                                                    fontWeight: "500" 
                                                }}
                                                onClick={() => handleJoinMeeting(meet.meetLink)}
                                            >
                                                Join
                                            </Button>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <AddMeeting 
                handleAddMeetingOpen={handleAddMeetingOpen} 
                addMeetingopen={addMeetingopen} 
                handleAddMeetingClose={handleAddMeetingClose} 
                childId={childId} 
                fetchChildMeeting={fetchChildMeeting} 
            />
        </>
    );
};

export default Meeting;