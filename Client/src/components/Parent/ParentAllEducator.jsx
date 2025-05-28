import React, { useEffect, useState } from 'react'
import ParentNavbar from '../Navbar/ParentNavbar'
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Breadcrumbs, Button, Card, Fade, Grid, Modal, Typography } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import axios from 'axios';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { toast } from 'react-toastify';

const ParentAllEducator = () => {
    const [parentdetails, setParentdetails] = useState({});
    useEffect(() => {
        const parentdetails = localStorage.getItem("parentdetails");
        setParentdetails(JSON.parse(parentdetails));
    }, []);
    const navigate = useNavigate();
    const navigateToProfile = () => {
        navigate('/parent/profile');
    }

    const [alleducators, setAlleducators] = useState([]);
    const fetchAllEducators = async () => {
        const token = localStorage.getItem("token");
        const alleducators = await axios.get("http://localhost:4000/ldss/educator/getalleducators", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(alleducators.data.educators);
        setAlleducators(alleducators.data.educators);
    }
    useEffect(() => {
        fetchAllEducators();
    }, []);

    // Helper function to generate random rating between 3 and 5 with 0.5 increments
    const generateRandomRating = () => {
        const ratings = [3, 3.5, 4, 4.5, 5];
        return ratings[Math.floor(Math.random() * ratings.length)];
    };

    // educator view model
    const educatorViewstyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #000',
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
        height: "667px",
        width: "1080px",
        background: "white"
    };
    
    const [educatorViewOpen, setEducatorViewOpen] = useState(false);
    const [singleEducator, setSingleEducator] = useState({});
    const handleEducatorViewOpen = async (educatorId) => {
        const token = localStorage.getItem("token");
        const educator = await axios.get(`http://localhost:4000/ldss/educator/geteducator/${educatorId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(educator.data);
        setSingleEducator(educator.data.educator);
        setEducatorViewOpen(true);
    }
    const handleEducatorViewClose = () => setEducatorViewOpen(false);

    // parent send request to educator
    const handleEducatorrequest = async () => {
        const token = localStorage.getItem("token");
        const parentId = JSON.parse(localStorage.getItem("parentdetails"))._id;
        const recipientId = singleEducator._id;
        const recipientRole = "educator";
        const message = "I am interested in your education services";
        const requestData = {
            parentId,
            recipientId,
            recipientRole,
            message
        }
        const request = await axios.post(`http://localhost:4000/ldss/request/sendrequest`, requestData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(request.data);
        if (request.data.message === "Request sent successfully.") {
            toast.success("Request sent successfully.");
            handleEducatorViewClose();
        }
        if (request.data.message === "Request already sent") {
            toast.error("Request already sent");
        }
    }
    
    return (
        <>
            <ParentNavbar parentdetails={parentdetails} navigateToProfile={navigateToProfile} />
            <Box sx={{ background: "white" }}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "46px", background: "#DBE8FA" }}>
                    <Typography color='primary' textAlign={"center"} sx={{ fontSize: "18px", fontWeight: "600" }}>Educator</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ marginTop: "20px", ml: "50px", mr: "50px" }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} underline="hover" to="/parent/home">
                            Home
                        </Link>
                        <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>Child</Typography>
                    </Breadcrumbs>
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={3}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={1} style={{ padding: "8px 15px", borderRadius: "25px", border: "1px solid #CCCCCC", height: "40px" }}>
                            <Box sx={{ height: "100%" }}><SearchOutlinedIcon /></Box>
                            <input placeholder='search here' style={{ padding: "8px 15px", border: 0, outline: 0, height: "100%" }}></input>
                        </Box>
                    </Box>
                </Box>

                {/* all educators - updated grid layout */}
                <Grid container spacing={3} sx={{ p: "20px 50px", justifyContent: "center" }}>
                    {alleducators.map((educators, index) => {
                        const rating = generateRandomRating();
                        const reviewCount = Math.floor(Math.random() * 50) + 1;
                        
                        return (
                            <Grid 
                                key={index} 
                                item 
                                xs={12} 
                                sm={6} 
                                md={4} 
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    maxWidth: "400px",
                                    flexGrow: 1
                                }}
                            >
                                <Card sx={{ 
                                    width: "100%", 
                                    height: "197px", 
                                    borderRadius: "20px", 
                                    padding: "20px",
                                    backgroundColor:"#F6F7F9"
                                }}>
                                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "157px" }}>
                                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" sx={{ height: "150px", gap: "10px" }}>
                                            <CardMedia
                                                component="img"
                                                sx={{ height: "150px", width: '150px', borderRadius: "10px", flexShrink: 0 }}
                                                image={`http://localhost:4000/uploads/${educators?.profilePic?.filename}`}
                                                alt="Profile"
                                            />
                                            <CardContent
                                                sx={{
                                                    height: "150px",
                                                    overflow: "hidden",
                                                    padding: "10px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between"
                                                }}
                                            >
                                                <Box>
                                                    <Typography variant="h6" color='primary'>
                                                        {educators.name}
                                                    </Typography>
                                                    <Typography sx={{ color: '#7F7F7F', fontSize: "13px", fontWeight: "500" }}>
                                                        {educators.educationalQualification}
                                                    </Typography>
                                                    <Box display="flex" alignItems="center">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <StarIcon
                                                                key={star}
                                                                fontSize="small"
                                                                sx={{
                                                                    color: star <= Math.floor(rating) 
                                                                        ? '#FFD700' 
                                                                        : star - 0.5 <= rating 
                                                                            ? 'rgba(255, 215, 0, 0.5)' 
                                                                            : '#CCCCCC'
                                                                }}
                                                            />
                                                        ))}
                                                        <Typography sx={{ ml: 1, fontSize: "12px" }}>
                                                            ({reviewCount})
                                                        </Typography>
                                                    </Box>
                                                </Box>

                                                <Box sx={{ borderBottom: "1px solid black" }} />

                                                <Box>
                                                    <Typography sx={{ color: '#7F7F7F', fontSize: "12px", fontWeight: "500" }}>
                                                        {educators.yearsOfExperience} years Experience
                                                    </Typography>
                                                    <Typography sx={{ color: '#7F7F7F', fontSize: "12px", fontWeight: "500" }}>
                                                        {educators.availability}
                                                    </Typography>
                                                    <Typography 
                                                        color='secondary' 
                                                        sx={{ cursor: 'pointer' }}
                                                        onClick={() => handleEducatorViewOpen(educators._id)}
                                                    >
                                                        View all
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Box>

            {/* educator view model */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={educatorViewOpen}
                    onClose={handleEducatorViewClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={educatorViewOpen}>
                        <Box sx={educatorViewstyle} display={"flex"} flexDirection={"column"} gap={5}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                <Typography color='primary' variant='h5' sx={{ fontSize: "18px", fontWeight: "600" }}>Educator Detail</Typography>
                                <CloseIcon onClick={handleEducatorViewClose} />
                            </Box>
                            <Box display={"flex"} alignItems={"start"} flexDirection={"column"}>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={10} width={"100%"}>
                                    {
                                        singleEducator.profilePic?.filename ? (
                                            <Avatar src={`http://localhost:4000/uploads/${singleEducator?.profilePic?.filename}`} sx={{ width: "180px", height: "180px" }} />
                                        ) : (
                                            <Avatar sx={{ width: "180px", height: "180px" }}>{singleEducator.name?.charAt(0)}</Avatar>
                                        )
                                    }
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"start"} gap={5} >
                                        <Typography color='primary' variant='h5' sx={{ fontSize: "32px", fontWeight: "600" }}>
                                            {singleEducator.name} 
                                            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', ml: 1 }}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <StarIcon
                                                        key={star}
                                                        fontSize="small"
                                                        sx={{
                                                            color: star <= Math.floor(generateRandomRating()) 
                                                                ? '#FFD700' 
                                                                : star - 0.5 <= generateRandomRating() 
                                                                    ? 'rgba(255, 215, 0, 0.5)' 
                                                                    : '#CCCCCC'
                                                        }}
                                                    />
                                                ))}
                                                <Typography component="span" sx={{ fontSize: "18px", ml: 1 }}>
                                                    ({Math.floor(Math.random() * 50) + 1})
                                                </Typography>
                                            </Box>
                                        </Typography>
                                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: "100px" }}>
                                            <Box display={"flex"} justifyContent={"start"} alignItems={"start"} flexDirection={"column"} sx={{ gap: "20px" }}>
                                                <Typography> <PersonOutlinedIcon /> {singleEducator.name}</Typography>
                                                <Typography> <MailOutlinedIcon /> {singleEducator.email}</Typography>
                                            </Box>
                                            <Box display={"flex"} justifyContent={"start"} alignItems={"start"} flexDirection={"column"} sx={{ gap: "20px", borderLeft: "1px solid #CCCCCC", ml: "50px", pl: "40px" }} >
                                                <Typography> <LocationOnOutlinedIcon /> {singleEducator.address}</Typography>
                                                <Typography> <PhoneEnabledOutlinedIcon /> {singleEducator.phone}</Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ height: "323px", borderRadius: "20px", width: "100%", padding: "20px", mt: "50px", flexDirection: "column" }}>
                                    <Box display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"} sx={{ gap: "30px" }} >
                                        <Box>
                                            <Typography color='primary' sx={{ fontSize: "24px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                                                Personal Info
                                                <BorderColorOutlinedIcon />
                                            </Typography>
                                        </Box>
                                        <Box sx={{ gap: "200px" }} width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"start"}>
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"start"} gap={3}>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Educational Qualifications</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>{singleEducator.educationalQualification}</Typography>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Language</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>{singleEducator.languages}</Typography>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Certification</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Adobe Certified Professional in Photoshop & Illustrator</Typography>
                                                </Box>
                                            </Box>
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"start"} gap={3} sx={{ borderLeft: "1px solid black" }}>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"} ml={10}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Years of experience</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>{singleEducator.yearsOfExperience}</Typography>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"} ml={10}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Availablity</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>{singleEducator.availability}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Button 
                                        onClick={handleEducatorrequest} 
                                        endIcon={<ArrowRightAltIcon />} 
                                        variant='contained' 
                                        color='secondary' 
                                        sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                                    >
                                        Book
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </>
    )
}

export default ParentAllEducator