import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { Box, Button, Fade, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../../../Api_service/baseUrl';
import AddMeeting from './addMeeting';

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

    const handleAddMeetingOpen = () => {
        setAddMeetingOpen(true);
    };

    const handleAddMeetingClose = () => {
        setAddMeetingOpen(false);
    };

    const fetchChildMeeting = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            const therapistId = (JSON.parse(localStorage.getItem("theraphistDetails"))?._id);

            if (!therapistId) {
                throw new Error("Therapist not found");
            }
const id = JSON.parse(localStorage.getItem("theraphistDetails"))?._id;

            const response = await axiosInstance.get(`/therapist/viewmeeting/${id}/${childId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            
            // Sort meetings by date and time
            const sortedMeetings = (response.data.meetings || []).sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.startTime}`);
                const dateB = new Date(`${b.date}T${b.startTime}`);
                return dateA - dateB;
            });
            
            setMeeting(sortedMeetings);
        } catch (err) {
            console.error("Error fetching meetings:", err);
            setError("No meetings found.");
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
        if (!meetLink) {
            alert("No meeting link provided");
            return;
        }
        
        try {
            // Validate URL
            new URL(meetLink);
            window.open(meetLink, '_blank', 'noopener,noreferrer');
        } catch (e) {
            alert("Invalid meeting link");
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
                                    <Typography color="primary">{error}</Typography>
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
                addMeetingopen={addMeetingopen}
                handleAddMeetingClose={handleAddMeetingClose}
                fetchAllMeetings={fetchChildMeeting}
                childId={childId}
            />
        </>
    );
};

export default Meeting;