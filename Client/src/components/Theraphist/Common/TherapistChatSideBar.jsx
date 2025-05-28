import { Avatar, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useParams } from 'react-router-dom';

const dummyParents = [
  { id: 1, name: 'Jane Doe', profilePic: 'jane.jpg', studentName: 'Sophia Miller' },
  { id: 2, name: 'Robert Smith', profilePic: 'robert.jpg', studentName: 'Ethan Wilson' },
  { id: 5, name: 'Jane Doe', profilePic: 'jane.jpg', studentName: 'Sophia Miller' },
  { id: 6, name: 'Robert Smith', profilePic: 'robert.jpg', studentName: 'Ethan Wilson' },
  { id: 9, name: 'David Connor', profilePic: 'david.jpg', studentName: 'John Connor' },
  { id: 10, name: 'Jane Doe', profilePic: 'jane.jpg', studentName: 'Jane Doe' },
];

const dummyEducators = [
  { id: 3, name: 'Emma Wilson', profilePic: 'emma.jpg', studentName: 'Olivia Davis' },
  { id: 4, name: 'Noah Brown', profilePic: 'noah.jpg', studentName: 'Liam Johnson' },
  { id: 7, name: 'Emma Wilson', profilePic: 'emma.jpg', studentName: 'Olivia Davis' },
  { id: 8, name: 'Noah Brown', profilePic: 'noah.jpg', studentName: 'Liam Johnson' },
  { id: 11, name: 'Lisa Ray', profilePic: 'lisa.jpg', studentName: 'Mike Ray' },
  { id: 12, name: 'Mike Taylor', profilePic: 'mike.jpg', studentName: 'Emma Taylor' },
];

const TherapistChatSideBar = () => {
  const { id } = useParams();
  const [searchTermParents, setSearchTermParents] = useState('');
  const [searchTermEducators, setSearchTermEducators] = useState('');

  const filteredParents = dummyParents.filter(parent =>
    parent.name.toLowerCase().includes(searchTermParents.toLowerCase()) ||
    parent.studentName.toLowerCase().includes(searchTermParents.toLowerCase())
  );

  const filteredEducators = dummyEducators.filter(therapist =>
    therapist.name.toLowerCase().includes(searchTermEducators.toLowerCase()) ||
    therapist.studentName.toLowerCase().includes(searchTermEducators.toLowerCase())
  );

  return (
    <Box sx={{ width: "300px", height: "90%" }}>
      {/* Parents Section */}
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
          <Typography sx={{ fontSize: "18px", fontWeight: "500" }} color='primary'>Parents</Typography>
          <Box display="flex" alignItems="center" gap={1} mt={2}
            sx={{ padding: "8px 15px", borderRadius: "25px", border: "1px solid #CCCCCC", height: "40px" }}>
            <SearchOutlinedIcon />
            <input 
              placeholder="Search parents" 
              style={{ border: 0, outline: 0, height: "100%", width: "100%" }}
              value={searchTermParents}
              onChange={(e) => setSearchTermParents(e.target.value)}
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
          {filteredParents.map((parent) => (
            <Link 
              key={parent.id} 
              to={`/therapist/chat/${parent.id}`} 
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
                  backgroundColor: id === parent.id.toString() ? '#1976d2' : 'transparent',
                  color: id === parent.id.toString() ? 'white' : 'inherit',
                  '&:hover': {
                    backgroundColor: id === parent.id.toString() ? '#1976d2' : '#f5f5f5'
                  }
                }}
              >
                {parent.profilePic ? (
                  <Avatar src={`http://localhost:4000/uploads/${parent.profilePic}`} />
                ) : (
                  <Avatar sx={{ bgcolor: id === parent.id.toString() ? 'white' : '#1976d2', color: id === parent.id.toString() ? '#1976d2' : 'white' }}>
                    {parent.name.charAt(0)}
                  </Avatar>
                )}
                <Box>
                  <Typography>{parent.name}</Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>

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
              placeholder="Search Educators" 
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
          {filteredEducators.map((therapist) => (
            <Link 
              key={therapist.id} 
              to={`/therapist/chat/${therapist.id}`} 
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
                <Box>
                  <Typography>{therapist.name}</Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TherapistChatSideBar;