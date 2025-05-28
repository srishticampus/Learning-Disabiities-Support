import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axiosInstance from '../../../Api_service/baseUrl';
import { toast } from 'react-toastify';

const AddMeeting = ({ handleAddMeetingClose, addMeetingopen, fetchAllMeetings }) => {
    
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" };
    const styleAddMeeting = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 550,
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    const [data, setData] = useState({
        meetingTitle: "",
        date: "",
        startTime: "",
        endTime: "",
        meetLink: "",
        creatorType: "educator",
    });

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData(prev => {
            return { ...prev, [name]: value }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!data.meetingTitle || !data.date || !data.startTime || !data.endTime || !data.meetLink) {
            toast.error("Please fill all fields");
            return;
        }

        // In a real app, you would use the actual API call:
        /*
        const token = localStorage.getItem("token");
        const educatorId = JSON.parse(localStorage.getItem("educatorDetails"))?._id;
        
        try {
            const newMeeting = await axiosInstance.post(`/educator/addmeeting/${educatorId}`, data, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            
            if (newMeeting.data.message === "meeting added successfully") {
                toast.success("Meeting created");
                setData({
                    meetingTitle: "",
                    date: "",
                    startTime: "",
                    endTime: "",
                    meetLink: "",
                    creatorType: "educator"
                });
                handleAddMeetingClose();
                fetchAllMeetings();
            }
        } catch (error) {
            toast.error("Error creating meeting");
            console.error(error);
        }
        */
       
       // For demo purposes
       toast.success("Meeting created (demo)");
       setData({
           meetingTitle: "",
           date: "",
           startTime: "",
           endTime: "",
           meetLink: "",
           creatorType: "educator"
       });
       handleAddMeetingClose();
       fetchAllMeetings();
    }

    return (
        <Modal
            open={addMeetingopen}
            onClose={handleAddMeetingClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={styleAddMeeting} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                <Box display={"flex"} width={"100%"} justifyContent={"space-between"} alignItems={"center"}>
                    <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Add New Meeting</Typography>
                    <Box display={"flex"} alignItems={"center"} gap={2}>
                        <CloseIcon onClick={handleAddMeetingClose} sx={{ fontSize: "28px", cursor: "pointer" }} />
                    </Box>
                </Box>
                <hr />
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={3}>
                    <Box>
                        <div style={textFieldStyle}>
                            <label>Meeting title</label>
                            <input 
                                style={{ height: "40px", borderRadius: "8px", border: "1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleOnchange}
                                name='meetingTitle'
                                value={data.meetingTitle}
                                type='text'
                                required
                            />
                        </div>
                    </Box>
                    <Box>
                        <div style={textFieldStyle}>
                            <label>Date</label>
                            <input 
                                style={{ height: "40px", borderRadius: "8px", border: "1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleOnchange}
                                name='date'
                                value={data.date}
                                type='date'
                                required
                            />
                        </div>
                    </Box>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} gap={3}>
                        <div style={{ height: "65px", width: "170px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }}>
                            <label>Start time</label>
                            <input 
                                style={{ height: "40px", borderRadius: "8px", border: "1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleOnchange}
                                name='startTime'
                                value={data.startTime}
                                type='time'
                                required
                            />
                            
                        </div>
                        <div style={{ height: "65px", width: "170px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }}>
                            <label>End time</label>
                            <input 
                                style={{ height: "40px", borderRadius: "8px", border: "1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleOnchange}
                                name='endTime'
                                value={data.endTime}
                                type='time'
                                required
                            />
                            
                        </div>
                    </Box>
                    <Box>
                        <div style={textFieldStyle}>
                            <label>Google Meet Link</label>
                            <input 
                                style={{ height: "40px", borderRadius: "8px", border: "1px solid #CCCCCC", padding: '8px' }}
                                onChange={handleOnchange}
                                name='meetLink'
                                value={data.meetLink}
                                type='url'
                                placeholder="https://meet.google.com/..."
                                required
                            />
                        </div>
                    </Box>
                </Box>
                <hr />
                <Button 
                    onClick={handleSubmit} 
                    variant='contained' 
                    color='secondary' 
                    sx={{ 
                        borderRadius: "25px", 
                        height: "45px", 
                        width: '150px', 
                        padding: '20px 35px',
                        mt: 2
                    }}
                >
                    Submit
                </Button>
            </Box>
        </Modal>
    )
}

export default AddMeeting;