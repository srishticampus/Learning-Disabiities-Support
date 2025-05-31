import React, { useState } from 'react'
import ParentNavbarSiginIn from '../Parent/ParentNavbarSiginIn'
import { Box, Button, Container, InputAdornment, Stack, TextField, Typography, styled } from '@mui/material';
import background from "../../assets/Frame 12.png"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Footer from '../Footer/Footer';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const AdminLogin = () => {
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }
    const siginupStyle = { background: "white", boxShadow: "none" };

    const [data, setData] = useState({
        userId: "Admin123",
        password: "admin@123"
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        
        const response = await axios.post(`${baseUrl}admin/login`, data);

        const jwtToken = response.data.token;
        const message = response.data.message;


        if (jwtToken && message === "Admin logged in successfully") {
            localStorage.setItem("token", jwtToken);
            toast.success("logged in successfully!")
            navigate("/admin/dashboard");
        }
        if(message==="Invalid password."){
            toast.error("Invalid password.");
        }
        if(message==="Admin not found."){
            toast.error("Admin not found with this ID.");
        }
        // console.log(jwtToken);
        // console.log(message);
    }
    return (
        <>
             <ParentNavbarSiginIn siginupStyle={siginupStyle} />
            <Container>
                <Box component="img" src={background} sx={{ position: "absolute", top: -50, left: 0, objectFit: 'cover', zIndex: -1 }}></Box>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'} sx={{ marginTop: "80px" }}>
                    <Typography variant="h2" component="div" color='primary' sx={{ fontSize: "32px", fontWeight: "600" }}>
                        Login !
                    </Typography>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-end'} >

                        <Stack>
                            <div style={textFieldStyle}>
                                <label>UserId</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleInputChange}
                                    name='userId'
                                    value={data.userId}
                                    type='text'

                                />

                            </div>
                            <div style={textFieldStyle}>
                                <label>Password</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleInputChange}
                                    name='password'
                                    value={data.password}
                                    type='password'
                                />
                                {data.password.length > 0 ? "" : <VisibilityOffIcon
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '70%',
                                        transform: 'translateY(-50%)',
                                        cursor: 'pointer',
                                    }}
                                />}

                            </div>
                        </Stack>
                        

                    </Box>


                    <Stack sx={{mb:"80px"}} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} mt={2}>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                            onClick={handleLogin}
                        >Login</Button>

                        
                    </Stack>
                </Box>

            </Container>
            <Footer />
        </>
    )
}

export default AdminLogin
