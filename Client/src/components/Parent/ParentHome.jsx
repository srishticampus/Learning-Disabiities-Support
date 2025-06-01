import React, { useEffect, useState } from 'react'
import ParentNavbar from '../Navbar/ParentNavbar';
import "../../Styles/LandingPage.css";
import Navbar from '../Navbar/Navbar';
import {Avatar, Box, Button, Container, Divider, Fade, Grid, Modal, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import background from "../../assets/Frame 12@2x.png";
import image68 from "../../assets/image 68.png";
import image69 from "../../assets/image 69.png";
import image70 from "../../assets/image 70.png";
import image71 from "../../assets/image 71.png";
import verified from "../../assets/verified.png";
import VerifiedIcon from '@mui/icons-material/Verified';
import AVATAR1 from "../../assets/AVATAR1.png";
import AVATAR2 from "../../assets/AVATAR2.png";
import AVATAR3 from "../../assets/AVATAR3.png";
import AVATAR4 from "../../assets/AVATAR4.png";
import user from "../../assets/user.png";
import shopping from "../../assets/Shopping list.png";
import elearning from "../../assets/Elearning.png";
import keyFeatures1 from "../../assets/image 74.png";
import keyFeatures2 from "../../assets/image 73.png";
import keyFeatures3 from "../../assets/image 75.png";
import keyFeatures4 from "../../assets/image 72.png";
import frame1 from "../../assets/Frame 48095593.png";
import frame2 from "../../assets/Frame 48095594.png";
import Footer from '../Footer/Footer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import { Link, useNavigate } from 'react-router-dom';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import { toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { baseUrl } from '../../baseUrl';

const ParentHome = () => {
    const homebg = {
        backgroundColor: "#F6F7F9"
    }
    
    // Helper function to generate random rating between 3 and 5 with 0.5 increments
    const generateRandomRating = () => {
        const ratings = [3, 3.5, 4, 4.5, 5];
        return ratings[Math.floor(Math.random() * ratings.length)];
    };

    const [parent,setParent]=useState("");
    const fetchUser=async()=>{
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const parent=await axios.get(`${baseUrl}parent/getparent/${decoded.id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const parentDatas=localStorage.setItem("parentdetails",
          JSON.stringify(parent.data.parent));
        setParent(parent.data.parent);
        console.log(parent.data.parent.name);
        console.log(parent.data.parent.profilePic);
        console.log(parent);

    }
    useEffect(()=>{
        fetchUser();
    },[]);

    const navigate = useNavigate();
    const navigateToProfile=()=>{
         navigate('/parent/profile');
    }
    // view all educators
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
     const handleEducatorrequest=async()=>{
        const token = localStorage.getItem("token");
        const parentId=JSON.parse(localStorage.getItem("parentdetails"))._id;
        const recipientId=singleEducator._id;
        const recipientRole="educator";
        const message="I am interested in your education services";
        const requestData={
            parentId,
            recipientId,
            recipientRole,
            message
        }
        const request = await axios.post(`http://localhost:4000/ldss/request/sendrequest`,requestData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(request.data);
        if(request.data.message==="Request sent successfully."){
            toast.success("Request sent successfully.");
            handleEducatorViewClose();
    }
};
//  all theraphist view 

const [allTheraphist, setAllTheraphist] = useState([]);
    const fetchAllTheraphist = async () => {
        const token = localStorage.getItem("token");
        const alltheraphist = await axios.get("http://localhost:4000/ldss/theraphist/getalltheraphist", {
            headers: {
                Authorization: `Bearer ${token}`

            }
        });
        console.log(alltheraphist.data.theraphist);
        setAllTheraphist(alltheraphist.data.theraphist);
    }
    useEffect(() => {
        fetchAllTheraphist();
    }, []);

    // theraphist view model
    const theraphistViewstyle = {
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
    const [theraphistViewOpen, setTheraphistViewOpen] = useState(false);
    const [singleTheraphist, setSingleTheraphist] = useState({});
    const handleTheraphistViewOpen = async (theraphistId) => {
        const token = localStorage.getItem("token");
        const theraphist = await axios.get(`http://localhost:4000/ldss/theraphist/gettheraphist/${theraphistId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(theraphist.data);
        setSingleTheraphist(theraphist.data.theraphist);

        setTheraphistViewOpen(true);
    }
    const handleTheraphistViewClose = () => setTheraphistViewOpen(false);

     // parent send request to theraphist
     const handleTheraphistrequest=async()=>{
        const token = localStorage.getItem("token");
        const parentId=JSON.parse(localStorage.getItem("parentdetails"))._id;
        const recipientId=singleTheraphist._id;
        const recipientRole="theraphist";
        const message="I am interested in your therapist services.";
        const requestData={
            parentId,
            recipientId,
            recipientRole,
            message
        }
        const request = await axios.post(`http://localhost:4000/ldss/request/sendrequest`,requestData,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(request.data);
        if(request.data.message==="Request sent successfully."){
            toast.success("Request sent successfully.");
            handleTheraphistViewClose();
    }
}

    return (
        <>

            <ParentNavbar homebg={homebg} navigateToProfile={navigateToProfile} parentdetails={parent}/>

            

            <Container maxWidth="x-lg" sx={{ ...homebg, height: '100vh', position: "relative", overflow: "hidden", zIndex: 2 }}>
                <Box component="img" src={background} alt='background'
                    sx={{ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", objectFit: 'cover', zIndex: -1 }}
                >

                </Box>
                <Stack direction="row" spacing={2} sx={{ padding: "80px 50px", zIndex: 1, }}>
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
                        <Box>
                            <Typography variant="h1" component="h1" color='primary'
                                sx={{ fontSize: "56px", fontWeight: 600, marginTop: 2, margin: "10px 0px" }}
                            >
                                Empowering Every
                            </Typography>
                            <Typography variant="h1" component="h1" color='secondary'
                                sx={{ fontSize: "56px", fontWeight: 600, marginTop: 2, margin: "10px 0px" }}
                            >
                                Child's Learning
                            </Typography>
                            <Typography variant="h1" component="h1" color='primary'
                                sx={{ fontSize: "56px", fontWeight: 600, marginTop: 2, margin: "10px 0px" }}
                            >
                                Journey
                            </Typography>
                            <Typography variant="p" component="p" color='primary'
                                sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "25px", marginTop: 2, margin: "10px 0px", textAlign: "justify", marginRight: "250px" }}
                            >
                                A one-stop platform connecting parents, educators, and therapists to support children with learning disabilities through personalized learning plans, activity tracking, and seamless collaboration.
                            </Typography>
                            
                        </Box>


                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Grid container spacing={1}
                            sx={{ width: "615px", height: "510px", position: "relative" }}
                        >
                            <Box sx={{ width: "264px", height: "62px", backgroundColor: 'white', borderRadius: "5px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", padding: "5px 3px", position: 'absolute', top: "30px", left: "-35px" }} >


                                <Typography variant='p' color="primary" sx={{ fontSize: "14px" }}>
                                    <VerifiedIcon color='secondary' />
                                    Thousands of Verified educators & therapist!
                                </Typography>

                            </Box>
                            <Box sx={{ width: "195px", height: "118px", backgroundColor: '#DBE8FA', borderRadius: "5px", padding: "5px 3px", position: 'absolute', bottom: "-85px", right: "-35px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                <Box sx={{ width: "165px", height: "88px", backgroundColor: 'white', borderRadius: "5px", padding: "5px 3px", display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <Box component="img" src={AVATAR1} alt='avatar' sx={{ width: "41px", height: "39px" }}></Box>
                                        <Box component="img" src={AVATAR2} alt='avatar' sx={{ width: "41px", height: "39px", marginLeft: "-20px" }}></Box>
                                        <Box component="img" src={AVATAR3} alt='avatar' sx={{ width: "41px", height: "39px", marginLeft: "-20px" }}></Box>
                                        <Box component="img" src={AVATAR4} alt='avatar' sx={{ width: "41px", height: "39px", marginLeft: "-20px" }}></Box>
                                    </Box>
                                    <Typography>
                                        200k+ Learning
                                    </Typography>

                                </Box>
                            </Box>
                            <Grid size={9}>
                                <Box component="img" src={image68} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}>

                                </Box>
                            </Grid>
                            <Grid size={3}>
                                <Box component="img" src={image69} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}>

                                </Box>
                            </Grid>
                            <Grid size={5}>
                                <Box component="img" src={image70} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}>

                                </Box>
                            </Grid>
                            <Grid size={7}>
                                <Box component="img" src={image71} alt='img'
                                    sx={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                </Stack>
            </Container >
            <Container maxWidth="x-lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", margin: "100px 0px", height: '100vh' }}>
                <Stack spacing={2} sx={{ width: "305px", height: "88px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
                    <Box>
                        <Typography color='primary' variant='h3' sx={{ fontSize: "32px", fontWeight: "600" }}>
                            How it Works
                        </Typography>
                    </Box>
                    <Box>
                        <Typography color='primary' variant='p' sx={{ fontSize: "14px", fontWeight: "500" }}>
                            Find the perfect learning in just a few steps
                        </Typography>
                    </Box>

                </Stack>

                <Stack direction="row" spacing={2} sx={{ height: "210px", display: "flex", alignItems: 'center', gap: "20px", marginTop: "90px" }}>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={user} sx={{}}>
                        </Box>
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Build Profiles
                            </Typography>
                        </Box>
                        <Box sx={{}}>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Parents add child details; educators & <br /> therapists set expertise.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={elearning} sx={{}}>
                        </Box>
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Start Learning
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Access personalized plans, track progress,<br />
                                and collaborate.
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: "400px", display: "flex", flexDirection: "column", alignItems: 'center', gap: "20px" }}>
                        <Box component="img" src={shopping} sx={{}}>
                        </Box>
                        <Box>
                            <Typography variant='h4' color='"primary' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Monitor & Improve
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: 'justify' }}>
                                Receive insights, expert advice, and <br />
                                ongoing support.
                            </Typography>
                        </Box>
                    </Box>

                </Stack>

            </Container>

            {/* educator */}

            <Container maxWidth="x-lg" display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} justifyContent={"center"} sx={{ height: "100%", background: "#F0F6FE" ,paddingBottom:"100px"}}>

                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} justifyContent={"center"} sx={{ height: "113px", }}>
                    <Typography variant='h4' color='primary' sx={{ fontSize: "32px", fontWeight: "600", marginTop: "50px" }}>Educator</Typography>
                    <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: "center" }}>Create personalized learning plans, track student progress, and collaborate with parents  and <br /> therapists to support every child's educational journey.</Typography>
                </Box>
                <Box>
                    {/* cards */}

                    <Grid display="flex" flexDirection="row" alignItems="center" justifyContent="center" container spacing={3} sx={{ marginTop: "100px" }}>
                        {alleducators.slice(0,6).map((educators, index) => {
                            const rating = generateRandomRating();
                            const reviewCount = Math.floor(Math.random() * 50) + 1;
                            
                            return (
                                <Grid item xs={12} sm={12} md={4} width={"32%"} key={index}>
                                    <Card sx={{ maxWidth: "410px", height: "197px", borderRadius: "20px", padding: "20px" }}>
                                        <CardActionArea>
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
                                                            <Typography variant="h6" color='primary'>{educators.name}</Typography>
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
                                                            <Typography onClick={() => handleEducatorViewOpen(educators._id)} color='secondary'>View all</Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Box>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>


                </Box>
                <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'} sx={{marginRight:"150px",paddingTop:"30px"}}>
                <Link to="/parent/viewalleducators"><Typography>View More <span><ArrowRightAltIcon/></span></Typography></Link>
                </Box>


            </Container>
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
                            <Box display={"flex"} alignItems={"start"}  flexDirection={"column"}>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={10} width={"100%"}>
                                    {
                                    singleEducator.profilePic?.filename ? (<Avatar src={`http://localhost:4000/uploads/${singleEducator?.profilePic?.filename}`} sx={{ width: "180px", height: "180px" }} />)
                                :
                                (<Avatar sx={{ width: "180px", height: "180px" }}>{singleEducator.name?.charAt(0)}</Avatar>)    
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
                                    <Button onClick={handleEducatorrequest} endIcon={<ArrowRightAltIcon />} variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}>Book</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>

            {/* educator view model end */}

            {/* theraphist */}

            <Container maxWidth="x-lg" display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} justifyContent={"center"} sx={{ height: "100%", background: "#F6F7F9" ,marginTop:"85px",paddingBottom:"100px"}}>

                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={"20px"} justifyContent={"center"} sx={{ height: "113px", }}>
                    <Typography variant='h4' color='primary' sx={{ fontSize: "32px", fontWeight: "600", marginTop: "50px" }}>Therapist</Typography>
                    <Typography variant='p' color='primary' sx={{ fontSize: "14px", fontWeight: "500", textAlign: "center" }}>Monitor developmental progress, assign therapy-based activities, and collaborate with parents <br /> and educators to provide holistic support.</Typography>
                </Box>
                <Box>
                    {/* cards */}

                    <Grid display="flex" flexDirection="row" alignItems="center" justifyContent="center" container spacing={3} sx={{ marginTop: "100px" }}>
                        {allTheraphist.slice(0,6).map((therapist, index) => {
                            const rating = generateRandomRating();
                            const reviewCount = Math.floor(Math.random() * 50) + 1;
                            
                            return (
                                <Grid item xs={12} sm={12} md={4} width={"32%"} key={index}>
                                    <Card sx={{ maxWidth: "410px", height: "197px", borderRadius: "20px", padding: "20px" }}>
                                        <CardActionArea>
                                            <Box display="flex" alignItems="center" justifyContent="center" sx={{ height: "157px" }}>
                                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" sx={{ height: "150px", gap: "10px" }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ height: "150px", width: '150px', borderRadius: "10px", flexShrink: 0 }}
                                                        image={`http://localhost:4000/uploads/${therapist.profilePic?.filename}`}
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
                                                                {therapist.name}
                                                            </Typography>
                                                            <Typography sx={{ color: '#7F7F7F', fontSize: "13px", fontWeight: "500" }}>
                                                                {therapist.educationalQualification}
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
                                                                {therapist.yearsOfExperience} years Experience
                                                            </Typography>
                                                            <Typography sx={{ color: '#7F7F7F', fontSize: "12px", fontWeight: "500" }}>
                                                                {therapist.availability}
                                                            </Typography>
                                                            <Typography color='secondary' onClick={()=>handleTheraphistViewOpen(therapist._id)}>View all</Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Box>
                                            </Box>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Box>
                <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'} sx={{marginRight:"150px",paddingTop:"30px"}}>
                <Link to="/parent/viewalltheraphist"><Typography>View More <span><ArrowRightAltIcon/></span></Typography></Link>
                </Box>
            </Container>

            {/* theraphist view model */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={theraphistViewOpen}
                    onClose={handleTheraphistViewClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={theraphistViewOpen}>
                        <Box sx={theraphistViewstyle} display={"flex"} flexDirection={"column"} gap={5}>
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                                <Typography color='primary' variant='h5' sx={{ fontSize: "18px", fontWeight: "600" }}>Therapist Detail</Typography>
                                <CloseIcon onClick={handleTheraphistViewClose} />
                            </Box>
                            <Box display={"flex"} alignItems={"start"}  flexDirection={"column"}>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} gap={10} width={"100%"}>
                                    {
                                        singleTheraphist.profilePic?.filename ? (
                                            <Avatar src={`http://localhost:4000/uploads/${singleTheraphist?.profilePic?.filename}`} sx={{ width: "180px", height: "180px" }} />
                                        ) : (
                                            <Avatar sx={{ width: "180px", height: "180px" }}>{singleTheraphist.name?.charAt(0)}</Avatar>
                                        )
                                    }
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"start"} gap={5} >
                                        <Typography color='primary' variant='h5' sx={{ fontSize: "32px", fontWeight: "600" }}>
                                            {singleTheraphist.name}
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
                                                <Typography> <PersonOutlinedIcon /> {singleTheraphist.name}</Typography>
                                                <Typography> <MailOutlinedIcon /> {singleTheraphist.email}</Typography>
                                            </Box>
                                            <Box display={"flex"} justifyContent={"start"} alignItems={"start"} flexDirection={"column"} sx={{ gap: "20px", borderLeft: "1px solid #CCCCCC", ml: "50px", pl: "40px" }} >
                                                <Typography> <LocationOnOutlinedIcon /> {singleTheraphist.address}</Typography>
                                                <Typography> <PhoneEnabledOutlinedIcon /> {singleTheraphist.phone}</Typography>
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
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>{singleTheraphist.educationalQualification}</Typography>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Language</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>{singleTheraphist.languages}</Typography>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Certification</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Adobe Certified Professional in Photoshop & Illustrator</Typography>
                                                </Box>
                                            </Box>
                                            <Box display={"flex"} flexDirection={"column"} alignItems={"start"} gap={3} sx={{ borderLeft: "1px solid black" }}>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"} ml={10}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Years of experience</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>{singleTheraphist.yearsOfExperience}</Typography>
                                                </Box>
                                                <Box display={"flex"} flexDirection={"column"} alignItems={"start"} ml={10}>
                                                    <Typography color='secondary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>Availablity</Typography>
                                                    <Typography color='primary' variant='p' sx={{ fontSize: "15px", fontWeight: "600" }}>{singleTheraphist.availability}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Button onClick={handleTheraphistrequest} endIcon={<ArrowRightAltIcon />} variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}>Book</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>

            {/* theraphist view model end */}

            <Container maxWidth="x-lg" sx={{position:"relative"}}>
                <Box component="img" src={frame1} alt='background frame' sx={{position:"absolute",top:-50,left:0}}>
                </Box>
                <Box component="img" src={frame2} alt='background frame' sx={{position:"absolute",bottom:-50,right:0}}>
                </Box>
                <Stack sx={{ height: "265px", display: "flex", justifyContent:"space-evenly", alignItems: 'center', marginTop:'50px' }}>
                    <Typography sx={{ fontSize: "32px", fontWeight: "600" }} variant='h3' color='primary'>
                    Personalized Learning Plan!
                    </Typography>
                    <Typography sx={{ fontSize: "18px", fontWeight: "500",textAlign:"center" }} variant='h3' color='primary'>
                    Tailored daily or weekly activities designed to support your child's unique learning needs. Created by educators and <br />therapists, these plans adapt based on your child's progress and goals.
                    </Typography>
                </Stack>
            </Container>
            <Footer/>
        </>
    )
}

export default ParentHome