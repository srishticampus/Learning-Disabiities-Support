import React, { useEffect, useState } from 'react'
import ParentNavbar from '../Navbar/ParentNavbar'
import { Link, useNavigate } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Grid, Typography, Container, Stack } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import FemaleIcon from '@mui/icons-material/Female';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Backdrop from '@mui/material/Backdrop';
import TherapistViewParentDetails from './Common/TherapistViewParentDetails';

const TheraphistHome = () => {
    const homebg = {
        backgroundColor: "#F6F7F9"
    };

    const [therapistDetails, setTherapistDetails] = useState({});
    const [parentRequest, setParentRequest] = useState([]);
    const [requestDetail, setRequestDetail] = useState(null);
    const [openParent, setOpenParent] = useState(false);
    const navigate = useNavigate();

    const fetchTherapist = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const decoded = jwtDecode(token);
            const response = await axios.get(`http://localhost:4000/ldss/theraphist/gettheraphist/${decoded.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data?.theraphist) {
                const data = response.data.theraphist;
                localStorage.setItem("theraphistDetails", JSON.stringify(data));
                setTherapistDetails(data);
            }
        } catch (error) {
            console.error("Error fetching therapist:", error);
        }
    };

    const fetchParentsRequest = async () => {
        try {
            const token = localStorage.getItem("token");
            const therapistId = therapistDetails._id;
            if (!therapistId) return;
            const response = await axios.get(
                `http://localhost:4000/ldss/theraphist/parentsrequest/${therapistId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data?.request) {
                setParentRequest(response.data.request);
            }
        } catch (error) {
            console.error("Failed to fetch parent requests:", error);
        }
    };

    const fetchParentByRequestId = async (requestId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `http://localhost:4000/ldss/theraphist/viewrequestedparent/${requestId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.data?.viewRequest) {
                setRequestDetail(response.data.viewRequest);
                setOpenParent(true);
            }
        } catch (error) {
            console.error("Failed to fetch parent details:", error);
        }
    };

    const acceptParentRequest = async (requestId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:4000/ldss/theraphist/acceptrequest/${requestId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchParentsRequest();
            setOpenParent(false);
        } catch (error) {
            console.error("Failed to accept request:", error);
        }
    };

    const rejectParentRequest = async (requestId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:4000/ldss/theraphist/rejectrequest/${requestId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchParentsRequest();
            setOpenParent(false);
        } catch (error) {
            console.error("Failed to reject request:", error);
        }
    };

    const handleParentClose = () => {
        setOpenParent(false);
        setRequestDetail(null);
    };

    useEffect(() => {
        fetchTherapist();
    }, []);

    useEffect(() => {
        if (therapistDetails._id) {
            fetchParentsRequest();
        }
    }, [therapistDetails]);

    const navigateToProfile = () => {
        navigate('/therapist/profile');
    };

    return (
        <>
            <TheraphistNavbar
                theraphistdetails={therapistDetails}
                navigateToProfile={navigateToProfile}
            />
            <Container maxWidth="x-lg" sx={{ ...homebg, height: '100vh', position: "relative", overflow: "hidden", zIndex: 2 }}>                <Box component="img" src={background} alt='background'
                    sx={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: 'cover', zIndex: -1 }}
                />
                <Stack direction="row" spacing={2} sx={{ padding: "80px 50px", zIndex: 1 }}>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                        <Box sx={{
                            position: "relative",
                            width: "262px",
                            height: "55px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            border: "1px solid transparent",
                            borderImage: "linear-gradient(to right, #1967D2, #F6F7F9) 1",
                            borderRadius: "25px",
                            overflow: "hidden",
                            backgroundSize: "cover",
                            zIndex: 1,
                        }}>
                            <Typography variant="p" component="h6" color='primary'
                                sx={{ fontSize: "14px", fontWeight: 500, margin: "10px 0px" }}
                            >
                                <StarIcon sx={{ verticalAlign: 'middle', marginRight: 1, color: "#FFAE00" }} />
                                Welcome to learn hub
                            </Typography>
                        </Box>
                      </Box>
                      <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px" }}>
                        <Box sx={{ color: "#1967D2" }}><ApartmentOutlinedIcon /></Box>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                          <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>School name</Typography>
                          <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{child.schoolName}</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ gap: "20px", pr: "250px", borderLeft: "1px solid #CCCCCC" }} display={"flex"} flexDirection={"column"} alignItems={"start"}>
                      <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px", pl: "50px" }}>
                        <Box sx={{ color: "#1967D2" }}><DateRangeIcon /></Box>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                          <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Date of birth</Typography>
                          <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{child.dateOfBirth}</Typography>
                        </Box>
                      </Box>
                      <Box display={"flex"} alignItems={"center"} sx={{ gap: "15px", pl: "50px" }}>
                        <Box sx={{ color: "#1967D2" }}><FemaleIcon /></Box>
                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                          <Typography variant='p' color='secondary' sx={{ fontSize: "12px", fontWeight: "500" }}>Gender</Typography>
                          <Typography variant='h5' color='primary' sx={{ fontSize: "14px", fontWeight: "500" }}>{child.gender}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                    <Typography variant='h5' sx={{ fontSize: "18px", fontWeight: "500" }} color='secondary'>Description</Typography>
                    <Typography variant='p' sx={{ fontSize: "14px", fontWeight: "500" }} color='primary'>{child.description}</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ 
                    width: "100%", 
                    py: 4,
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                        gap: 3,
                        width: "100%",
                        maxWidth: "1200px",
                        px: 3
                    }}>
                        {parentRequest.filter(request => request.status === "pending").length === 0 ? 
                            (<Typography sx={{ 
                                fontSize: "32px", 
                                gridColumn: "1 / -1",
                                textAlign: "center"
                            }} color='primary'>No request found</Typography>)
                            :
                            (parentRequest.filter(request => request.status === "pending")
                            .map((request, index) => (   
                                <Card key={index} sx={{ 
                                    height: "205px", 
                                    borderRadius: "20px", 
                                    p: "20px",
                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                    '&:hover': {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                                    }
                                }}>
                                    <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                                        <Box display="flex" sx={{ 
                                            height: "100%", 
                                            gap: "1px",
                                            width: "100%"
                                        }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ 
                                                    height: "150px", 
                                                    width: "150px", 
                                                    borderRadius: "10px", 
                                                    flexShrink: 0 
                                                }}
                                                image={`http://localhost:4000/uploads/${request.parentId.profilePic.filename}`}
                                                alt="Profile"
                                            />
                                            <Box sx={{
                                                height: "100%",
                                                overflow: "hidden",
                                                pl: "10px",
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                flexGrow: 1
                                            }}>
                                                <Box display="flex" flexDirection="column" gap={1}>
                                                    <Typography variant="h6" color="primary">
                                                        {request.parentId.name}
                                                    </Typography>
                                                    <Typography sx={{ 
                                                        color: '#7F7F7F', 
                                                        fontSize: "13px", 
                                                        fontWeight: "500",
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        maxWidth: "100%" 
                                                    }}>
                                                        {request.parentId.address}
                                                    </Typography>

                                                    <Typography sx={{ 
                                                        color: '#7F7F7F', 
                                                        fontSize: "13px", 
                                                        fontWeight: "500" 
                                                    }}>
                                                        {request.parentId.phone}
                                                    </Typography>
                                                    <Button 
                                                        onClick={() => fetchParentByRequestId(request._id)}
                                                        sx={{ 
                                                            alignSelf: "flex-start",
                                                            textTransform: "none",
                                                            color: '#1976d2',
                                                            p: 0,
                                                            '&:hover': {
                                                                backgroundColor: "transparent",
                                                                textDecoration: "underline"
                                                            }
                                                        }}
                                                    >
                                                        View Child
                                                    </Button>
                                                </Box>
                                                <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                                                    <Button 
                                                        onClick={() => rejectParentRequest(request._id)} 
                                                        variant='outlined' 
                                                        color='secondary' 
                                                        sx={{ 
                                                            borderRadius: "25px", 
                                                            height: "35px", 
                                                            width: '100px', 
                                                            padding: '10px 35px', 
                                                            mt: "10px",
                                                            border: "1px solid #1967D2"
                                                        }}
                                                    >
                                                        Reject
                                                    </Button>
                                                    <Button 
                                                        onClick={() => acceptParentRequest(request._id)} 
                                                        variant='contained' 
                                                        color='secondary' 
                                                        sx={{ 
                                                            borderRadius: "25px", 
                                                            height: "35px", 
                                                            width: '100px', 
                                                            padding: '10px 35px', 
                                                            mt: "10px" 
                                                        }}
                                                    >
                                                        Accept
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            ))) 
                        }
                    </Box>
                  </Box>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ width: '253px', height: "93px", gap: '10px', mt: "70px" }}>
                    <Button 
                      variant='contained' 
                      color='secondary' 
                      sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                      onClick={handleSubmit}
                      disabled={!childData.name || !childData.schoolName || !childData.dateOfBirth || !childData.gender}
                    >Confirm</Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Fade>
        </Modal>
      </div>
      {/* add child modal ends */}

      {/* edit child modal start */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={editChildOpen}
          onClose={handleEditChildClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={editChildOpen}>
            <Box sx={editChildStyle}>
              <Box display={"flex"} justifyContent={"space-between"} alignItems={"space-between"}>
                <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Edit Child</Typography>
                <CloseIcon onClick={handleEditChildClose} sx={{ fontSize: "18px", cursor: "pointer" }} />
              </Box>
              <hr />
              <Container sx={{ position: "relative", mt: "50px" }} maxWidth="x-lg">
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                  <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "start", gap: "30px", height: "154px", flexDirection: "column", marginTop: '30px' }}>
                    <Stack direction="row" sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
                      <div style={textFieldStyle}>
                        <label>Name</label>
                        <input 
                          style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                          name='name'
                          type='text'
                          value={editchild.name}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '20px', textFieldStyle }}>
                        <label style={{}}>Gender:</label>
                        <label>
                          <input type="radio" name="gender" value="male" onChange={handleEditChange} checked={editchild.gender === "male"} /> Male
                        </label>
                        <label>
                          <input type="radio" name="gender" value="female" onChange={handleEditChange} checked={editchild.gender === "female"} /> Female
                        </label>
                        <label>
                          <input type="radio" name="gender" value="others" onChange={handleEditChange} checked={editchild.gender === "others"} /> Others
                        </label>
                      </div>
                    </Stack>
                    <Stack direction={'row'} sx={{ display: "flex", gap: "15px" }}>
                      <div style={textFieldStyle}>
                        <label>School Name</label>
                        <input 
                          style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                          name='schoolName'
                          onChange={handleEditChange}
                          value={editchild.schoolName}
                          required
                        />
                      </div>
                      <div style={textFieldStyle}>
                        <label>Date Of Birth</label>
                        <input 
                          style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                          name='dateOfBirth'
                          type='date'
                          onChange={handleEditChange}
                          value={editchild.dateOfBirth}
                          required
                        />
                      </div>
                    </Stack>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
                      <label>Description</label>
                      <textarea 
                        style={{ height: "70px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                        name='description'
                        onChange={handleEditChange}
                        value={editchild.description}
                      />
                    </Box>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={elearning} />
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Start Learning
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Access personalized plans, track progress, and collaborate.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={shopping} />
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Monitor & Improve
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Receive insights, expert advice, and ongoing support.
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Container>
            
                        <Modal
                open={openParent}
                onClose={handleParentClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={openParent}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        height: "720px",
                        width: "65%",
                        borderRadius: "20px",
                        overflow: "hidden"
                    }}>
                        {requestDetail && (
                            <TherapistViewParentDetails 
                                acceptParentrequest={acceptParentRequest} 
                                rejectParentrequest={rejectParentRequest} 
                                handleParentClose={handleParentClose} 
                                requestDetail={requestDetail}
                            />
                        )}
                    </Box>
                </Fade>
            </Modal>

            <Footer />
        </>
    );
};

export default TheraphistHome;