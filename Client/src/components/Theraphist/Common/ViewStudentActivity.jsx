import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { 
  Box, 
  Button, 
  Fade, 
  Modal, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import LirbraryCardImage from '../../../assets/librarycard.png';

const ViewStudentActivity = ({ openActivity, handleActivityClose, childId }) => {
    const styleActivity = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        maxWidth: '1200px',
        bgcolor: 'background.paper',
        borderRadius: "10px",
        boxShadow: 24,
        height: '80vh',
        p: 4,
    };

    // Updated dummy activities data with images
    const activities = [
        {
            id: 1,
            title: "Critical Thinking Debate",
            description: "Students debate on 'Social media does more harm than good', preparing arguments for or against.",
            category: "Communication & Cognitive Skills",
            date: "2023-11-15",
            time: "10:00 AM - 11:30 AM",
            image: LirbraryCardImage
        },
        {
            id: 2,
            title: "STEM Challenge",
            description: "Design and build a bridge using only straws and tape that can hold weight.",
            category: "Problem-Solving",
            date: "2023-11-20",
            time: "1:00 PM - 2:30 PM",
            image: LirbraryCardImage
        },
        {
            id: 3,
            title: "Creative Writing Workshop",
            description: "Encourages students to write short stories using prompts and peer review.",
            category: "Language & Communication",
            date: "2023-11-22",
            time: "9:00 AM - 10:30 AM",
            image: LirbraryCardImage
        },
        {
            id: 4,
            title: "Mindfulness Meditation",
            description: "Guided breathing and reflection activities to develop self-regulation.",
            category: "Wellbeing",
            date: "2023-11-25",
            time: "2:00 PM - 3:00 PM",
            image: LirbraryCardImage
        }
    ];

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openActivity}
            onClose={handleActivityClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={openActivity}>
                <Box sx={styleActivity}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} >
                        <Typography variant='h4' sx={{ fontSize: "18px", fontWeight: "600" }}>Activities</Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                            <CloseIcon 
                                onClick={handleActivityClose} 
                                sx={{ 
                                    fontSize: "28px", 
                                    cursor: "pointer" 
                                }} 
                            />
                        </Box>
                    </Box>
                    
                    <hr />
                    
                    {activities.length === 0 ? (
    <Box textAlign="center" py={4}>
        <Typography variant="h6" color="textSecondary">
            No activities assigned yet
        </Typography>
    </Box>
) : (
    <Grid container spacing={3} sx={{ maxHeight: 'calc(80vh - 150px)', overflowY: 'auto', pr: 2 ,justifyContent: 'center'}}>
        {activities.map((activity) => (
            <Grid item xs={12} sm={6} md={6} key={activity.id} sx={{ display: 'flex' }}>
                <Card sx={{ 
                    width: '100%',
                    maxWidth: 370,
                    display: 'flex',
                    flexDirection: 'column',
                    // borderRadius: '12px',
                    // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    // transition: 'transform 0.3s',
                    // '&:hover': {
                    //     transform: 'translateY(-4px)',
                    //     boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)'
                    // }
                }}
                >
                    <CardMedia
                        component="img"
                        sx={{
                            height: 200,
                            // borderRadius: '12px 12px 0 0',
                            objectFit: 'cover'
                        }}
                        image={activity.image}
                        alt={activity.title}
                    />
                    
                    <CardContent sx={{ 
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography 
                            gutterBottom 
                            variant="h6" 
                            component="div"
                            sx={{
                                fontWeight: 600,
                                color: "#384371",
                                mb: 2,
                                minHeight: '3em',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {activity.title}
                        </Typography>
                        
                        <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                                mb: 2,
                                flexGrow: 1,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {activity.description}
                        </Typography>
                        
                        <Box 
                            display="flex" 
                            justifyContent="space-between" 
                            alignItems="center"
                            sx={{ mt: 'auto' }}
                        >
                            <Box>
                                <Typography 
                                    variant="caption" 
                                    display="block"
                                    sx={{
                                        color: 'secondary.main',
                                        fontWeight: 500
                                    }}
                                >
                                    Category
                                </Typography>
                                <Typography variant="body2">
                                    {activity.category}
                                </Typography>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
)}
                </Box>
            </Fade>
        </Modal>
    );
}

export default ViewStudentActivity;