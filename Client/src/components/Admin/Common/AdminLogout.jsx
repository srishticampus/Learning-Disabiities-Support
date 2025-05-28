import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

const AdminLogout = ({openLogout,handleCloseLogout}) => {
    const style = {
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
   

    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
        toast.success("You logged out");

        // logging out and not returning back

    }
    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigate("/");
        }
    });
  return (
    <>
      
      <div>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openLogout}
                        onClose={handleCloseLogout}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                timeout: 500,
                            },
                        }}
                    >
                        <Fade in={openLogout}>
                            <Box sx={style}>
                                <Box display={"flex"} justifyContent={"space-between"} alignItems={"space-between"}>
                                    <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Logout</Typography>
                                    <CloseIcon onClick={handleCloseLogout} sx={{ fontSize: "18px" }} />
                                </Box>
                                <hr />
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                                    <Typography color='primary' sx={{ fontSize: "12px", fontWeight: '500' }} variant='p'>Are you sure you want to log out ? </Typography>
                                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ gap: "10px" }}>
                                        <Button variant='outlined' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleLogOut}>yes</Button>
                                        <Button variant='contained' color='secondary' sx={{ borderRadius: "25px", marginTop: "20px", height: "40px", width: '100px', padding: '10px 35px' }} onClick={handleCloseLogout}>no</Button>
                                    </Box>
                                </Box>

                            </Box>
                        </Fade>
                    </Modal>
                </div>
    </>
  )
}

export default AdminLogout
