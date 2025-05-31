import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import EducatorNavbar from '../Navbar/EducatorNavbar';
import { Box, Breadcrumbs, Button, Typography } from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FemaleIcon from '@mui/icons-material/Female';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { Modal, Fade } from '@mui/material';
import AddMeeting from './Common/AddMeeting';
import axiosInstance from '../../Api_service/baseUrl';
import { jwtDecode } from 'jwt-decode';

const EducatorMeeting = () => {

    const [educatorDetails, setEducatorDetails] = useState({});
        
        const fetchEducator = async () => {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const educatorDetails= JSON.parse(localStorage.getItem("educatorDetails"));
            // const response = await axios.get(`http://localhost:4000/ldss/educator/geteducator/${decoded.id}`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // });
            setEducatorDetails(educatorDetails);
        }
    
    
    useEffect(() => {
        const storedEducator = localStorage.getItem("educatorDetails");
        if (storedEducator) {
            setEducatorDetails(JSON.parse(storedEducator));
        }
        fetchEducator();
    }, []);

    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/educator/profile');
    };

    // Modal states
    const [addMeetingopen, setAddMeetingOpen] = React.useState(false);
    const handleAddMeetingOpen = () => setAddMeetingOpen(true);
    const handleAddMeetingClose = () => setAddMeetingOpen(false);

    // Fetch meetings
    const [meetings, setMeetings] = useState([]);
    const fetchAllMeetings = async () => {
        // In a real app, you would use the actual API call:
        
        const token = localStorage.getItem("token");
        const educatorId = JSON.parse(localStorage.getItem("educatorDetails"))?._id;
        try {
            const response = await axiosInstance.get(`/educator/viewmeeting/${educatorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMeetings(response.data.meetings);
            
        } catch (error) {
            console.error("Error fetching meetings:", error);
        }
        };
    
    useEffect(() => {
        fetchAllMeetings();
    }, []);

    const handleJoinMeeting = (meetLink) => {
        if (meetLink) {
            window.open(meetLink, '_blank', 'noopener,noreferrer');
        } else {
            alert('No meeting link available for this meeting');
        }
    };
   
    const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

    return (
        <>
            <EducatorNavbar educatorDetails={educatorDetails} navigateToProfile={navigateToProfile} />
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "46px", background: "#DBE8FA" }}>
                <Typography color='primary' textAlign="center" sx={{ fontSize: "18px", fontWeight: "600" }}>
                    Meetings
                </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="start" sx={{ mt: "30px", mx: "50px" }}>
                <Breadcrumbs aria-label="breadcrumb" separator="›">
                    <Link to="/educator/home" style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }}>
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
            {meeting.parentId.name}
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
  {formatDate(meeting.childId.dateOfBirth)}
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
            {formatDate(meeting.date)}
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
      {/* Add more meeting details here if needed */}
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

            {/* Add Meeting Modal */}
            <AddMeeting 
                handleAddMeetingOpen={handleAddMeetingOpen} 
                addMeetingopen={addMeetingopen} 
                handleAddMeetingClose={handleAddMeetingClose} 
                fetchAllMeetings={fetchAllMeetings}
            />
        </>
    )
}

export default EducatorMeeting;