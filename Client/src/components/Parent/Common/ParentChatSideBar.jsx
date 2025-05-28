import { Avatar, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useParams } from 'react-router-dom';

const dummyEducators = [
  { id: 1, name: 'Alice Johnson', profilePic: 'alice.jpg' },
  { id: 2, name: 'David Smith', profilePic: 'david.jpg' },
  { id: 5, name: 'Alice Johnson', profilePic: 'alice.jpg' },
  { id: 6, name: 'David Smith', profilePic: 'david.jpg' },
  { id: 9, name: 'Sarah Connor', profilePic: 'sarah.jpg' },
  { id: 10, name: 'John Doe', profilePic: 'john.jpg' },
];

const dummyTherapists = [
  { id: 3, name: 'Emma Wilson', profilePic: 'emma.jpg' },
  { id: 4, name: 'Noah Brown', profilePic: 'noah.jpg' },
  { id: 7, name: 'Emma Wilson', profilePic: 'emma.jpg' },
  { id: 8, name: 'Noah Brown', profilePic: 'noah.jpg' },
  { id: 11, name: 'Lisa Ray', profilePic: 'lisa.jpg' },
  { id: 12, name: 'Mike Taylor', profilePic: 'mike.jpg' },
];

const ParentChatSideBar = () => {
  const { id } = useParams();
  const [searchTermEducators, setSearchTermEducators] = useState('');
  const [searchTermTherapists, setSearchTermTherapists] = useState('');

  const filteredEducators = dummyEducators.filter(educator =>
    educator.name.toLowerCase().includes(searchTermEducators.toLowerCase())
  );

  const filteredTherapists = dummyTherapists.filter(therapist =>
    therapist.name.toLowerCase().includes(searchTermTherapists.toLowerCase())
  );

  return (
    <Box sx={{ width: "300px", height: "90%" }}>
      {/* Educators Section */}
      <Box sx={{
        background: "white",
        m: "15px",
        height: "50%",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Fixed Header */}
        <Box sx={{ p: "10px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "500" }} color='primary'>Educators</Typography>
          <Box display="flex" alignItems="center" gap={1} mt={2}
            sx={{ padding: "8px 15px", borderRadius: "25px", border: "1px solid #CCCCCC", height: "40px" }}>
            <SearchOutlinedIcon />
            <input 
              placeholder="Search educators" 
              style={{ border: 0, outline: 0, height: "100%", width: "100%" }}
              value={searchTermEducators}
              onChange={(e) => setSearchTermEducators(e.target.value)}
            />
          </Box>
        </Box>

        {/* Scrollable List */}
        <Box sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          '&::-webkit-scrollbar': { display: 'none' },
          flex: 1,
          px: "10px"
        }}>
          {filteredEducators.map((educator) => (
            <Link 
              key={educator.id} 
              to={`/parent/chat/${educator.id}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box 
                display="flex" 
                alignItems="center" 
                gap={1} 
                p={1}
                sx={{ 
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: id === educator.id.toString() ? '#1976d2' : 'transparent',
                  color: id === educator.id.toString() ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: id === educator.id.toString() ? '#1976d2' : '#f5f5f5'
                  }
                }}
              >
                {educator.profilePic ? (
                  <Avatar src={`http://localhost:4000/uploads/${educator.profilePic}`} />
                ) : (
                  <Avatar sx={{ bgcolor: id === educator.id.toString() ? 'white' : '#1976d2', color: id === educator.id.toString() ? '#1976d2' : 'white' }}>
                    {educator.name.charAt(0)}
                  </Avatar>
                )}
                <Typography>{educator.name}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>

      {/* Therapists Section */}
      <Box sx={{
        background: "white",
        m: "15px",
        height: "50%",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column"
      }}>
        {/* Fixed Header */}
        <Box sx={{ p: "10px" }}>
          <Typography sx={{ fontSize: "18px", fontWeight: "500" }} color='primary'>Therapists</Typography>
          <Box display="flex" alignItems="center" gap={1} mt={2}
            sx={{ padding: "8px 15px", borderRadius: "25px", border: "1px solid #CCCCCC", height: "40px" }}>
            <SearchOutlinedIcon />
            <input 
              placeholder="Search therapists" 
              style={{ border: 0, outline: 0, height: "100%", width: "100%" }}
              value={searchTermTherapists}
              onChange={(e) => setSearchTermTherapists(e.target.value)}
            />
          </Box>
        </Box>

        {/* Scrollable List */}
        <Box sx={{
          overflowY: "auto",
          scrollbarWidth: "none",
          '&::-webkit-scrollbar': { display: 'none' },
          flex: 1,
          px: "10px"
        }}>
          {filteredTherapists.map((therapist) => (
            <Link 
              key={therapist.id} 
              to={`/parent/chat/${therapist.id}`} 
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Box 
                display="flex" 
                alignItems="center" 
                gap={1} 
                p={1}
                sx={{ 
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: id === therapist.id.toString() ? '#1976d2' : 'transparent',
                  color: id === therapist.id.toString() ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: id === therapist.id.toString() ? '#1976d2' : '#f5f5f5'
                  }
                }}
              >
                {therapist.profilePic ? (
                  <Avatar src={`http://localhost:4000/uploads/${therapist.profilePic}`} />
                ) : (
                  <Avatar sx={{ bgcolor: id === therapist.id.toString() ? 'white' : '#1976d2', color: id === therapist.id.toString() ? '#1976d2' : 'white' }}>
                    {therapist.name.charAt(0)}
                  </Avatar>
                )}
                <Typography>{therapist.name}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ParentChatSideBar;