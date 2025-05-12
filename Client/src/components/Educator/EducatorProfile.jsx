import React, { useEffect, useState } from 'react'
import EducatorNavbar from '../Navbar/EducatorNavbar';
import { Avatar, Box, Breadcrumbs, Button, Container, Fade, Modal, Stack, Typography } from '@mui/material'
import { Link, Links, useNavigate } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneEnabledOutlinedIcon from '@mui/icons-material/PhoneEnabledOutlined';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import background from "../../assets/Frame 12.png";
import profileFrame from "../../assets/profileFrame.png";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { baseUrl } from '../../baseUrl';

const EducatorProfile = () => {
    const profilebg = {
        backgroundColor: "white"
    };
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }
    const styleLogout = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };
    const styleEditBox = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '840px',
        height: 'auto',
        bgcolor: 'white',
        // border: '2px solid #000',
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
    };
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        profilePic: null
    });
    const handleDataChange = (e) => {
        setError((prevError) => ({
            ...prevError,
            [name]: ""
        }));
        const { name, value } = e.target;
        setData(prev => {
            return { ...prev, [name]: value }
        })

    };
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData(prev => {
                return { ...prev, profilePic: file }
            });
            const objectURL = URL.createObjectURL(file);
            setImagePreview(objectURL);
        }

    };
    const [educatorDetails, setEducatorDetails] = useState({});

    useEffect(() => {
        const educatorDetail = localStorage.getItem("educatorDetails");
        if (educatorDetail) {
            setEducatorDetails(JSON.parse(educatorDetail));

        }

    }, []);

    // logging out and not returning to profile page

    useEffect(() => {
        if (localStorage.getItem("educatorDetails") == null) {
            navigate("/");
        }
    });

    const [error, setError] = useState({})
    const validation = () => {
        let isValid = true;
        let errorMessage = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.name.trim()) {
            errorMessage.name = "Name should not be empty"
            isValid = false;
        }
        else if (data.name.length < 3 || data.name.length > 20) {
            errorMessage.name = "Name should be 3 to 20 char length"
            isValid = false;

        }
        if (!data.email.trim()) {
            errorMessage.email = "Email should not be empty";
            isValid = false;
        }
        else if (!emailRegex.test(data.email)) {
            errorMessage.email = "Invalid email address";
            isValid = false;
        }

        if (data.address.length < 10) {
            errorMessage.address = "Address should be 10 char length"
            isValid = false;
        }
        else if (!data.address.trim()) {
            errorMessage.address = "Address should not be empty"
            isValid = false;
        }
        if (!data.phone) {
            errorMessage.phone = "Phone should not be empty"
            isValid = false;
        }
        else if (!/^\d{10}$/.test(data.phone)) {
            errorMessage.phone = "Phone number must be exactly 10 digits";
            isValid = false;
        }

        setError(errorMessage);
        return isValid;

    };
    // const [message, setMessage] = useState({
    //     success: "",
    //     error: ""
    // })
    const handleSubmit = async (e) => {
        const isValid = validation();
        if (!isValid) {
            return;
        }
        e.preventDefault();
        // console.log(data)
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('address', data.address);
        formData.append('phone', data.phone);
        formData.append('profilePic', data.profilePic);

        console.log(data);
        const token = localStorage.getItem("token");
        const updated = await axios.post(`${baseUrl}educator/updateeducator/${educatorDetails._id}`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data'
            },
        });
        console.log(updated);
        setData({
            name: "",
            address: "",
            email: "",
            phone: ""
        })
        if (updated.data.message === "educator updated successfully.") {
            // setMessage({
            //     error: "",
            //     success: "educator detail updated in database"
            // });
            toast.success("Educator updated successfully.")


            const token = localStorage.getItem("token");
            const educatorDetail = JSON.parse(localStorage.getItem("educatorDetails"));
            const res = await axios.get(`${baseUrl}educator/geteducator/${educatorDetails._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem("educatorDetails", JSON.stringify(res.data.educator));
            setEducatorDetails(res.data.educator);

            // Close the modal
            setEditOpen(false);

        }
        else {
            // setMessage({
            //     success: "",
            //     error: 'Error in updating parent profile'
            // })
            toast.error("Error in updating educator profile")
        }


    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [editOpen, setEditOpen] = React.useState(false);
    const handleEditOpen = () => {
        setData({
            name: educatorDetails.name || "",
            email: educatorDetails.email || "",
            address: educatorDetails.address || "",
            phone: educatorDetails.phone || "",
            profilePic: null, // leave this null so user can choose a new one
        });
        setImagePreview(educatorDetails?.profilePic?.filename
            ? `${baseUrl}uploads/${educatorDetails.profilePic.filename}`
            : null);
        setEditOpen(true);
    }
    const handleEditClose = () => setEditOpen(false);

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('educatorDetails');
        // window.location.reload();
        navigate('/educator/login');
        toast.success("you logged out");

    }
    // const [educatorFullDetails,setEducatorFullDetails]=useState({});
    // const getEducatorDetails=()=>{
    //     // const token = localStorage.getItem("token");
    //     const educatorDetail = JSON.parse(localStorage.getItem("educatorDetails"));
    //     setEducatorFullDetails(educatorDetail);
    // }
    // useEffect(()=>{
    //     getEducatorDetails();
    // },[]);
    // console.log(educatorFullDetails);

    return (
        <>
            <EducatorNavbar profilebg={profilebg} educatorDetails={educatorDetails} />

            {/* logout modal */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={styleLogout}>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"space-between"}>
                                <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Logout</Typography>
                                <CloseIcon onClick={handleClose} sx={{ fontSize: "18px" }} />
                            </Box>
                            <hr />
                            <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                                <Typography color='primary' sx={{ fontSize: "12px", fontWeight: '500' }} variant='p'>Are you sure you want to log out ? </Typography>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ gap: "10px" }}>
                                    <Button variant='outlined' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleLogOut}>yes</Button>
                                    <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleClose}>no</Button>
                                </Box>
                            </Box>

                        </Box>
                    </Fade>
                </Modal>
            </div>

            {/*  logout modal end */}

            {/* edit modal  */}
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={editOpen}
                    onClose={handleEditClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={editOpen}>
                        <Box sx={styleEditBox}>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"space-between"}>
                                <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Edit</Typography>
                                <CloseIcon onClick={handleEditClose} sx={{ fontSize: "18px" }} />
                            </Box>
                            <hr />
                            <Container sx={{ position: "relative" }} maxWidth="x-lg">

                                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                                        <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                                            <input
                                                type="file"
                                                id="profile-upload"
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                                style={{ display: "none" }}
                                            />
                                            <label htmlFor="profile-upload" style={{ cursor: "pointer", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "15px" }}>
                                                <Box component="img" src={imagePreview ? imagePreview : profileFrame} alt='profilepic' sx={{ width: "150px", height: "150px", borderRadius: "50%" }}></Box>
                                                {imagePreview ? <Typography></Typography> : <Typography variant='p' color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>+ Add image</Typography>}

                                            </label>
                                        </Stack>
                                    </Box>
                                    <Box sx={{ display: "flex", justifyContent: 'center', alignItems: "start", gap: "30px", height: "154px", flexDirection: "column", marginTop: '30px' }}>
                                        <Stack direction="row" sx={{ display: "flex", gap: "15px" }}>

                                            <div style={textFieldStyle}>
                                                <label>Name</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleDataChange}
                                                    name='name'
                                                    value={data.name}
                                                    type='text'

                                                />
                                                {error.name && <span style={{ color: 'red', fontSize: '12px' }}>{error.name}</span>}
                                            </div>

                                            <div style={textFieldStyle}>
                                                <label>Address</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleDataChange}
                                                    name='address'
                                                    value={data.address}

                                                />
                                                {error.address && <span style={{ color: 'red', fontSize: '12px' }}>{error.address}</span>}
                                            </div>
                                        </Stack>
                                        <Stack direction={'row'} sx={{ display: "flex", gap: "15px" }}>
                                            <div style={textFieldStyle}>
                                                <label>Email</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleDataChange}
                                                    name='email'
                                                    value={data.email}
                                                />
                                                {error.email && <span style={{ color: 'red', fontSize: '12px' }}>{error.email}</span>}
                                            </div>
                                            <div style={textFieldStyle}>
                                                <label>Phone Number</label>
                                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                                    onChange={handleDataChange}
                                                    name='phone'
                                                    value={data.phone}
                                                    type='tel'
                                                />
                                                {error.phone && <span style={{ color: 'red', fontSize: '12px' }}>{error.phone}</span>}


                                            </div>
                                        </Stack>

                                    </Box>
                                    {/*  */}
                                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={'column'} sx={{ width: '253px', height: "93px", gap: '10px' }}>
                                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                                            onClick={handleSubmit}
                                        >Confirm</Button>

                                    </Box>
                                </Box>
                                {/* <div style={{textAlign:"center"}}>
                                                {message.success && <p style={{ color: 'green', fontSize: '32px' }}>{message.success}</p>}
                                                {message.error && <p style={{ color: 'red', fontSize: '32px' }}>{message.error}</p>}
                                                </div> */}

                            </Container>

                        </Box>
                    </Fade>
                </Modal>
            </div>


            {/* edit modal ends */}
            <Box sx={{ background: "white" }}>
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "46px", background: "#DBE8FA" }}>
                    <Typography color='primary' textAlign={"center"} sx={{ fontSize: "18px", fontWeight: "600" }}>Profile</Typography>
                </Box>
                {!educatorDetails.languages && <Link to='/educator/personalinfo' >
                    <Button variant="contained" color='secondary' sx={{
                        borderRadius: "15px", mt
                            : "10px", p: "10px 20px", width: "100%"
                    }}>Add personal details</Button>
                </Link>}
                <Box display={"flex"} justifyContent={"start"} alignItems={"start"} flexDirection={"column"} sx={{ mt: "20px", ml: "50px", mr: "50px", height: '320px' }}>
                    <Breadcrumbs aria-label="breadcrumb" separator="›">
                        <Link style={{ fontSize: "12px", fontWeight: "500", color: "#7F7F7F", textDecoration: "none" }} underline="hover" to="/educator/home">
                            Home
                        </Link>
                        <Typography color='primary' sx={{ fontSize: "12px", fontWeight: "500" }}>Profile</Typography>
                    </Breadcrumbs>


                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} sx={{ height: "260px", background: '#F6F7F9', borderRadius: "20px", width: "100%", padding: "0px 60px" }}>
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ height: "180px", gap: "70px" }}>
                            {
                                educatorDetails.profilePic?.filename ? (
                                    <Avatar sx={{ height: "100%", width: "180px" }}
                                        src={`${baseUrl}uploads/${educatorDetails?.profilePic?.filename}`} alt={educatorDetails?.name}
                                    />
                                ) :
                                    (
                                        <Avatar sx={{ height: "100%", width: "180px" }}>
                                            {educatorDetails?.name?.charAt(0)}
                                        </Avatar>
                                    )
                            }
                            <Box display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"} sx={{ gap: "40px" }} >
                                {educatorDetails.name && <Typography color='primary' sx={{ fontSize: "32px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }} onClick={handleEditOpen}>{educatorDetails.name}
                                    <BorderColorOutlinedIcon />
                                </Typography>}
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{ gap: "100px" }}>
                                    <Box display={"flex"} justifyContent={"start"} alignItems={"start"} flexDirection={"column"} sx={{ gap: "20px" }}>

                                        {educatorDetails.name && <Typography> <PersonOutlinedIcon /> {educatorDetails.name}</Typography>}
                                        {educatorDetails.email && <Typography> <MailOutlinedIcon /> {educatorDetails.email}</Typography>}
                                    </Box>
                                    {/* <Box sx={{borderLeft:"1px solid red"}}>d</Box> */}
                                    <Box display={"flex"} justifyContent={"start"} alignItems={"start"} flexDirection={"column"} sx={{ gap: "20px", borderLeft: "1px solid #CCCCCC", ml: "50px", pl: "40px" }} >

                                        {educatorDetails.address && <Typography> <LocationOnOutlinedIcon /> {educatorDetails.address}</Typography>}
                                        {
                                            educatorDetails.phone && <Typography> <PhoneEnabledOutlinedIcon /> {educatorDetails.phone}</Typography>
                                        }
                                    </Box>
                                </Box>

                            </Box>

                        </Box>
                        <Box sx={{ marginBottom: "170px" }}>
                            <Button startIcon={<LogoutOutlinedIcon />} variant="text" onClick={handleOpen}>Logout</Button>
                        </Box>
                    </Box>
                    {/* personal info */}

                    {educatorDetails.certification &&
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"start"} sx={{ height: "323px", background: '#F6F7F9', borderRadius: "20px", width: "100%", padding: "20px 60px", mt: "50px", flexDirection: "column" }}>
                            <Box display={"flex"} justifyContent={"center"} alignItems={"start"} flexDirection={"column"} sx={{ gap: "30px" }} >
                                <Box>
                                    <Typography color='primary' sx={{ fontSize: "24px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                                        Personal Info
                                        <BorderColorOutlinedIcon />
                                    </Typography>
                                </Box>
                                <Box sx={{ gap: "400px" }} width={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"start"}>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"start"} gap={3}>
                                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Typography color='secondary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>Educational Qualifications</Typography>
                                            <Typography color='primary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>{educatorDetails.educationalQualification
                                            }</Typography>
                                        </Box>
                                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Typography color='secondary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>Language</Typography>
                                            <Typography color='primary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>{educatorDetails.languages}</Typography>
                                        </Box>
                                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
                                            <Typography color='secondary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>Certification</Typography>
                                            <Typography color='primary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>Adobe Certified Professional in Photoshop & Illustrator</Typography>
                                        </Box>
                                    </Box>
                                    <Box display={"flex"} flexDirection={"column"} alignItems={"start"} gap={3} sx={{ borderLeft: "1px solid black" }}>
                                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"} ml={5}>
                                            <Typography color='secondary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>Years of Experience</Typography>
                                            <Typography color='primary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>{educatorDetails.yearsOfExperience
                                            }</Typography>
                                        </Box>
                                        <Box display={"flex"} flexDirection={"column"} alignItems={"start"} ml={5}>
                                            <Typography color='secondary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>Availablity</Typography>
                                            <Typography color='primary' variant='p' sx={{ fontSize: "12px", fontWeight: "600" }}>{educatorDetails.availability
                                            }</Typography>
                                        </Box>

                                    </Box>
                                </Box>
                            </Box>




                        </Box>
                    }
                </Box>


            </Box>
        </>
    )
}

export default EducatorProfile
