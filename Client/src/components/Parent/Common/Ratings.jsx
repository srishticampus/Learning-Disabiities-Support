import React, { useState } from 'react';
import { Avatar, Box, Breadcrumbs, Button, Container, Fade, Modal, Stack, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import GradeIcon from '@mui/icons-material/Grade';

const Ratings = ({ openRating, handleRatingClose, handleRatingSubmit, professionalType }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const stylerating = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    const onSubmit = () => {
        handleRatingSubmit(rating);
        setRating(0);
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openRating}
                onClose={handleRatingClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={openRating}>
                    <Box sx={stylerating}>
                        <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                            <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>
                                Rate {professionalType === 'educator' ? 'Educator' : 'Therapist'}
                            </Typography>
                            <CloseIcon 
                                onClick={handleRatingClose} 
                                sx={{ 
                                    fontSize: "18px",
                                    cursor: "pointer",
                                    '&:hover': {
                                        color: 'primary.main'
                                    }
                                }} 
                            />
                        </Box>
                        <hr />
                        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                            <Typography color='primary' sx={{ fontSize: "12px", fontWeight: '500', mb: 2 }} variant='p'>
                                {rating > 0 ? `You rated ${rating} star${rating > 1 ? 's' : ''}` : 'Please rate your experience'}
                            </Typography>
                            <Box display={"flex"} flexDirection={'column'} alignItems={"center"} justifyContent={"center"}>
                                <Box display={"flex"} alignItems={"center"} justifyContent={"center"} sx={{ gap: "10px" }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <GradeIcon 
                                            key={star}
                                            sx={{
                                                color: star <= (hover || rating) ? "#FFD700" : "#D9D9D9",
                                                fontSize: "32px",
                                                cursor: "pointer",
                                                transition: "color 0.2s",
                                            }}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    ))}
                                </Box>
                                <Button 
                                    variant='contained' 
                                    color='secondary' 
                                    sx={{ 
                                        borderRadius: "25px", 
                                        marginTop: "20px", 
                                        height: "40px", 
                                        width: '100px', 
                                        padding: '10px 35px' 
                                    }}
                                    onClick={onSubmit}
                                    disabled={rating === 0}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Ratings;