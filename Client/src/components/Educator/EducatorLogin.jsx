import React, { useState } from 'react';
import ParentNavbarSiginIn from '../Parent/ParentNavbarSiginIn';
import { Box, Button, Container, InputAdornment, Stack, TextField, Typography, styled } from '@mui/material';
import background from "../../assets/Frame 12.png"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Footer from '../Footer/Footer';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../baseUrl';

const EducatorLogin = () => {
    const textFieldStyle = { height: "65px", width: "360px", display: "flex", flexDirection: "column", justifyContent: "start", position: "relative" }
    const siginupStyle = { background: "white", boxShadow: "none" };

    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${baseUrl}educator/login`, data);

        const jwtToken = response.data.token;
        const message = response.data.message;


        if (jwtToken && message === "educator logged in successfully") {
            localStorage.setItem("token", jwtToken);
            toast.success("logged in successfully!")
            navigate("/educator/home");
        }

        else {
            toast.error("Invalid email or password");
        }

        console.log(jwtToken);
        console.log(message);
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
                                <label>Email</label>
                                <input style={{ height: "40px", borderRadius: "8px", border: " 1px solid #CCCCCC", padding: '8px' }}
                                    onChange={handleInputChange}
                                    name='email'
                                    value={data.email}
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
                        <Box display={'flex'} alignItems={'flex-end'} justifyContent={'center'}>
                            <Link to="/educator/forgotpassword" style={{textDecoration:"none"}}>
                            <Typography variant='p' color='primary' sx={{ marginTop: "10px", fontSize: "12px", fontWeight: '500' }}>Forgot password</Typography>
                            </Link>
                            
                        </Box>

                    </Box>


                    <Stack display={'flex'} flexDirection={'column'} alignItems={'center'} gap={2} mt={2}>
                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '200px', padding: '10px 35px' }}
                            onClick={handleLogin}
                        >Login</Button>

                        <Typography>
                            Don't have an account? <Link to="/educator/registration"><span style={{ textDecoration: "underline" }}>Sign up</span></Link>
                        </Typography>
                    </Stack>
                </Box>

            </Container>
            <Footer />
    </>
  )
}

export default EducatorLogin
