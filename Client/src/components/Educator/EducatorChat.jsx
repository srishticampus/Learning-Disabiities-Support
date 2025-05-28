import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import EducatorChatSideBar from './Common/EducatorChatSideBar';
import {
  Box, Typography, Avatar, TextField, IconButton, InputAdornment,
  Divider
} from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EducatorNavbar from '../Navbar/EducatorNavbar';
import EmailIcon from '@mui/icons-material/Email';

// Date formatting utility function
const formatMessageDate = (dateString) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const messageDate = new Date(dateString);
  messageDate.setHours(0, 0, 0, 0);
  
  const diffTime = today - messageDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const day = messageDate.getDate();
  const month = monthNames[messageDate.getMonth()];
  
  if (diffDays === 0) {
    return `Today, ${month} ${day}`;
  } else if (diffDays === 1) {
    return `Yesterday, ${month} ${day}`;
  } else {
    return `${month} ${day}`;
  }
};

const dummyUsers = [
  { id: 1, name: 'Jane Doe', avatar: 'J', role: 'parent', studentName: 'Sophia Miller', savatar: "S", email: 'jane.doe@example.com', profilePic: 'jane.jpg' },
  { id: 2, name: 'Robert Smith', avatar: 'R', role: 'parent', studentName: 'Ethan Wilson', savatar: "E", email: 'robert.smith@example.com', profilePic: '' },
  { id: 5, name: 'Jane Doe', avatar: 'J', role: 'parent', studentName: 'Sophia Miller', savatar: "S", email: 'jane.doe@example.com', profilePic: 'jane.jpg' },
  { id: 6, name: 'Robert Smith', avatar: 'R', role: 'parent', studentName: 'Ethan Wilson', savatar: "E", email: 'robert.smith@example.com', profilePic: '' },
  { id: 9, name: 'David Connor', avatar: 'D', role: 'parent', studentName: 'John Connor', savatar: "J", email: 'david.connor@example.com', profilePic: 'david.jpg' },
  { id: 10, name: 'Jane Doe', avatar: 'J', role: 'parent', studentName: 'Jane Doe', savatar: "J", email: 'jane.doe@example.com', profilePic: '' },
  { id: 3, name: 'Emma Wilson', avatar: 'E', role: 'therapist', studentName: 'Olivia Davis', savatar: "O", email: 'emma.wilson@therapy.org', profilePic: 'emma.jpg' },
  { id: 4, name: 'Noah Brown', avatar: 'N', role: 'therapist', studentName: 'Liam Johnson', savatar: "L", email: 'noah.brown@therapy.org', profilePic: '' },
  { id: 7, name: 'Emma Wilson', avatar: 'E', role: 'therapist', studentName: 'Olivia Davis', savatar: "O", email: 'emma.wilson@therapy.org', profilePic: 'emma.jpg' },
  { id: 8, name: 'Noah Brown', avatar: 'N', role: 'therapist', studentName: 'Liam Johnson', savatar: "L", email: 'noah.brown@therapy.org', profilePic: '' },
  { id: 11, name: 'Lisa Ray', avatar: 'L', role: 'therapist', studentName: 'Mike Ray', savatar: "M", email: 'lisa.ray@therapy.org', profilePic: 'lisa.jpg' },
  { id: 12, name: 'Mike Taylor', avatar: 'M', role: 'therapist', studentName: 'Emma Taylor', savatar: "E", email: 'mike.taylor@therapy.org', profilePic: '' }
];

const dummyChats = {
  1: [
    { 
      sender: 'me', 
      text: 'Hello Mrs. Doe, I wanted to discuss Sophia\'s progress in math class.', 
      name: 'You', 
      time: '10:00 AM', 
      date: new Date(Date.now() - 1209600000).toISOString().split('T')[0] 
    },
    { 
      sender: 'them', 
      text: 'Thank you for reaching out. How is Sophia doing?', 
      name: 'Jane Doe', 
      time: '10:30 AM', 
      date: new Date(Date.now() - 1209600000).toISOString().split('T')[0] 
    }
  ],
  2: [
    { 
      sender: 'them', 
      text: 'Hello! I\'m Ethan\'s parent Robert Smith. How can I help?', 
      name: 'Robert Smith', 
      time: '10:15 AM', 
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0] 
    }
  ],
  3: [
    { 
      sender: 'them', 
      text: 'Hello, this is therapist Emma. I wanted to update you about Olivia\'s therapy progress.', 
      name: 'Emma Wilson', 
      time: '2:45 PM', 
      date: new Date(Date.now() - 604800000).toISOString().split('T')[0] 
    }
  ],
  5: [
    { 
      sender: 'them', 
      text: 'Hello, this is Sophia\'s parent Jane.', 
      name: 'Jane Doe', 
      time: '11:00 AM', 
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0] 
    }
  ],
  6: [
    { 
      sender: 'them', 
      text: 'Hi there, this is Ethan\'s parent Robert.', 
      name: 'Robert Smith', 
      time: '9:30 AM', 
      date: new Date(Date.now() - 259200000).toISOString().split('T')[0] 
    }
  ],
  9: [
    { 
      sender: 'them', 
      text: 'Hello, this is John\'s parent David.', 
      name: 'David Connor', 
      time: '3:15 PM', 
      date: new Date(Date.now() - 604800000).toISOString().split('T')[0] 
    }
  ],
  10: [
    { 
      sender: 'them', 
      text: 'Good morning, this is Jane\'s parent.', 
      name: 'Jane Doe', 
      time: '8:45 AM', 
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0] 
    }
  ],
  4: [
    { 
      sender: 'them', 
      text: 'Hello, this is therapist Noah. I wanted to discuss Liam\'s progress.', 
      name: 'Noah Brown', 
      time: '4:30 PM', 
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0] 
    }
  ],
  7: [
    { 
      sender: 'them', 
      text: 'Hi there, this is Emma Wilson following up about Olivia\'s therapy.', 
      name: 'Emma Wilson', 
      time: '1:15 PM', 
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0] 
    }
  ],
  8: [
    { 
      sender: 'them', 
      text: 'Hello, this is Noah Brown checking in about Liam\'s therapy plan.', 
      name: 'Noah Brown', 
      time: '10:00 AM', 
      date: new Date(Date.now() - 259200000).toISOString().split('T')[0] 
    }
  ],
  11: [
    { 
      sender: 'them', 
      text: 'Good afternoon, this is Lisa Ray from the counseling center.', 
      name: 'Lisa Ray', 
      time: '2:00 PM', 
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0] 
    }
  ],
  12: [
    { 
      sender: 'them', 
      text: 'Hello, this is Mike Taylor from the occupational therapy department.', 
      name: 'Mike Taylor', 
      time: '11:30 AM', 
      date: new Date(Date.now() - 604800000).toISOString().split('T')[0] 
    }
  ]
};

const EducatorChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const [educator, setEducator] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [educatorDetails, setEducatorDetails] = useState({});

  const fetchEducator = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const response = await axios.get(`http://localhost:4000/ldss/educator/geteducator/${decoded.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const educatorData = response.data.educator;
      localStorage.setItem("educatorDetails", JSON.stringify(educatorData));
      setEducator(educatorData);
      setEducatorDetails(educatorData);
    } catch (error) {
      console.error("Error fetching educator:", error);
    }
  };

  useEffect(() => {
    const storedEducator = localStorage.getItem("educatorDetails");
    if (storedEducator) {
      setEducatorDetails(JSON.parse(storedEducator));
    }
    fetchEducator();

    const chatId = parseInt(id);
    if (chatId && dummyChats[chatId]) {
      setMessages(dummyChats[chatId]);
    } else {
      setMessages([]);
    }
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectedUser = dummyUsers.find(user => user.id === parseInt(id));

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg = {
      sender: 'me',
      text: newMessage,
      name: 'You',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0]
    };
    setMessages(prev => [...prev, newMsg]);
    setNewMessage("");
  };

  return (
    <>
      <EducatorNavbar educatorDetails={educatorDetails} navigateToProfile={() => navigate('/educator/profile')} />
      <Box sx={{ 
        background: '#F6F7F9', 
        width: "100%", 
        height: "90.5vh", 
        overflow: 'hidden',
        display: 'flex'
      }}>
        {/* Sidebar */}
        <Box flexBasis="20%" sx={{ height: "100%" }}>
          <EducatorChatSideBar />
        </Box>

        {/* Main Chat Area */}
        <Box flexBasis="80%" sx={{ 
          height: "100%",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {id && selectedUser ? (
            <Box sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "100%",
              height: "90%",
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}>
              {/* Header with Back Button and Dual Info */}
              <Box sx={{ 
                p: 2,
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: ''
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => navigate('/educator/chat')}>
                    <ArrowBackIcon />
                  </IconButton>
                  <Avatar sx={{
                    width: 32,
                    height: 32,
                    fontSize: '0.875rem',
                    bgcolor: '#384371'
                  }}>
                    {selectedUser.avatar}
                  </Avatar>
                  <Typography variant="h6" sx={{ 
                    color: '#384371',
                    ml: 1
                  }}>
                    {selectedUser.name}
                  </Typography>
                </Box>
                <Box sx={{flexGrow: 1}} />
                <Typography variant="h6" sx={{ 
                  color: '#384371',
                  fontWeight: 500
                }}>
                  {selectedUser.studentName}'s {selectedUser.role === 'therapist' ? 'Therapist' : 'Parent'}
                </Typography>
                <Avatar sx={{
                  width: 32,
                  height: 32,
                  fontSize: '0.875rem',
                  bgcolor: '#384371',
                  ml: 0.5,
                }}>
                  {selectedUser.savatar}
                </Avatar>
              </Box>

              {/* Scrollable Content Area */}
              <Box sx={{
                flex: 1,
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  display: 'none'
                }
              }}>
                {/* Profile Section */}
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  p: 3,
                  pt: 4,
                }}>
                  <Avatar sx={{ 
                    width: 80, 
                    height: 80, 
                    fontSize: '2rem',
                    bgcolor: '#384371',
                    mb: 2
                  }}>
                    {selectedUser.avatar}
                  </Avatar>
                  <Typography variant="h5" sx={{ 
                    color: '#384371', 
                    fontWeight: 500,
                    textAlign: 'center'
                  }}>
                    {selectedUser.name}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    mt: 1 
                  }}>
                    <EmailIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                    <Typography variant="body1" color="text.secondary">
                      {selectedUser.email}
                    </Typography>
                  </Box>
                </Box>

                {/* Messages with Date Separators */}
                <Box sx={{ p: 2 }}>
                  {messages.map((msg, idx) => {
                    const showDate = idx === 0 ||
                      messages[idx - 1].date !== msg.date ||
                      (idx > 0 && new Date(messages[idx - 1].date).getDate() !== new Date(msg.date).getDate());

                    return (
                      <React.Fragment key={idx}>
                        {showDate && (
                          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                            <Typography variant="h5" sx={{
                              color: '#384371',
                              px: 2,
                              py: 0.5,
                              fontSize: '0.8em'
                            }}>
                              {formatMessageDate(msg.date)}
                            </Typography>
                          </Box>
                        )}

                        <Box sx={{
                          display: 'flex',
                          mb: 2,
                          flexDirection: msg.sender === 'me' ? 'row-reverse' : 'row',
                          alignItems: 'flex-end',
                          gap: 1
                        }}>
                          {/* Avatar - only shown for 'them' messages */}
                          {msg.sender === 'them' && (
                            <Avatar sx={{
                              width: 32,
                              height: 32,
                              fontSize: '0.875rem',
                              bgcolor: '#384371'
                            }}>
                              {selectedUser.avatar}
                            </Avatar>
                          )}

                          {/* Message with timestamp */}
                          <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start'
                          }}>
                            <Typography variant="caption" sx={{
                              color: '#384371',
                              mb: 0.5,
                              alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start'
                            }}>
                              {msg.time}
                            </Typography>
                            <Box sx={{
                              backgroundColor: '#F0F6FE',
                              color: 'black',
                              px: 2,
                              py: 1,
                              borderRadius: '45px',
                            }}>
                              {msg.text}
                            </Box>
                          </Box>
                        </Box>
                      </React.Fragment>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </Box>
              </Box>
              <Divider sx={{backgroundColor: '#f0f0f0'}} />
              {/* Message Input */}
              <Box sx={{ p: 2, display: 'flex'  }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Text..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '35px',
                      backgroundColor: '#FFFFFF',
                      width: '80%',
                      height: '80%',
                      ml:"10%"
                    },
                  }}
                />
                <IconButton onClick={handleSendMessage} sx={{ right: "6%" ,position: 'absolute',}}>
                  <SendOutlinedIcon color="primary" />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: "white",
                padding: "10px",
                margin: "15px",
                borderRadius: "12px",
                width: "100%",
                height: "90%",
              }}
              display="flex"
              alignItems="center"
              flexDirection="column"
              justifyContent="center"
              gap={5}
            >
              <Typography sx={{ 
                color: 'black', 
                fontSize: '18px', 
                fontWeight: "500",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                Welcome <WavingHandIcon sx={{ color: "gold" }} /> {educatorDetails.name || 'Educator'} <AutoAwesomeIcon sx={{ color: "gold" }} />
              </Typography>
              <Typography sx={{ 
                color: 'black', 
                fontSize: '18px', 
                fontWeight: "500" 
              }}>
                Select a chat to start messaging
              </Typography>
              <ChatIcon sx={{ fontSize: 60 }} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default EducatorChat;