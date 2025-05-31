import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Modal,
    Fade,
    Backdrop,
} from "@mui/material";
import axios from "axios";

const ParentAllEducator = () => {
    const [educators, setEducators] = useState([]);
    const [selectedEducator, setSelectedEducator] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (educator) => {
        setSelectedEducator(educator);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedEducator(null);
    };

    useEffect(() => {
        const fetchEducators = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8000/educator/all", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEducators(response.data);
            } catch (error) {
                console.error("Failed to fetch educators:", error);
            }
        };

        fetchEducators();
    }, []);

    const sendRequest = async (educatorId) => {
        try {
            const token = localStorage.getItem("token");
            const parentId = localStorage.getItem("parentId"); // Make sure this is stored in localStorage
            const response = await axios.post(
                "http://localhost:8000/request/send",
                {
                    senderId: parentId,
                    receiverId: educatorId,
                    type: "educator",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Request sent successfully!");
        } catch (error) {
            console.error("Failed to send request:", error);
            alert("Failed to send request");
        }
    };

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                All Educators
            </Typography>
            <Grid container spacing={2} padding={2}>
                {educators.map((educator) => (
                    <Grid item xs={12} sm={6} md={4} key={educator._id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{educator.name}</Typography>
                                <Typography>Email: {educator.email}</Typography>
                                <Typography>Specialty: {educator.specialty}</Typography>
                                <Box mt={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleOpen(educator)}
                                        sx={{ mr: 1 }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => sendRequest(educator._id)}
                                    >
                                        Send Request
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        {selectedEducator && (
                            <>
                                <Typography variant="h5" gutterBottom>
                                    {selectedEducator.name}
                                </Typography>
                                <Typography>Email: {selectedEducator.email}</Typography>
                                <Typography>Specialty: {selectedEducator.specialty}</Typography>
                                <Typography>
                                    Bio: {selectedEducator.bio || "No bio available."}
                                </Typography>
                                <Box mt={2} display="flex" justifyContent="flex-end">
                                    <Button onClick={handleClose}>Close</Button>
                                </Box>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default ParentAllEducator;
