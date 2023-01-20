import React, { useEffect } from 'react'
import { Container } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import authApi from '../../../../api/AdminAuthApi';
import useAdminAuth from '../../../../customHooks/useAdminAuth';
import AdminAuthApi from '../../../../api/AdminAuthApi';

const AuthLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authenticate = useAdminAuth();

    const logout = async () => {
        await AdminAuthApi.logout();
    }

    if(authenticate === true) {
        logout();
    }

    return (
        <div>
        <Box sx={{ height: "100vh", position: "relative", display: "flex" }}>
            <Box sx={{ 
                        height: "100vh",
                        backgroundColor: "#ece4f4",
                        width: {"xs": 0, "lg": "43%"},
                        display: {"xs": "none", "lg": "block"}
            }}>
            </Box>
            <Box sx={{ 
                        height: "100vh", 
                        backgroundColor: "#f4f4fc", 
                        width: {"xs": "100%", "lg:": "57%"},
                        display: "block"
                    }}>
            </Box>
            <Box sx={{ 
                        position: "absolute",
                        top: "50%",
                        left: {"xs": 0, "lg": "50%"},
                        transform: {"xs": "translateY(-50%) translateX(0%)", "lg": "translateY(-50%) translateX(-50%)"},
                        backgroundColor: "#fff", 
                        zIndex: 100, 
                        padding: {"xs": "none", "lg": "8px"},
                        borderRadius: "10px", 
                        display: "flex",
                        width: {"xs": "100%", "lg": "80%"},
                        minHeight: {"xs": "100%", "lg": "80%"}
            }}>
                <Box sx={{ 
                            backgroundColor: "#f4f4fc",
                            width: {"xs": 0, "lg": "25%"},
                            display: {"xs": "none", "lg": "block"},
                            borderTopLeftRadius: "10px",
                            position: "relative"
                }}>
                    <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "column", padding: "20px"}}>
                        <img src='/logo-v2.png' width="150px" height="auto"></img>
                        <Typography sx={{ fontWeight: 800, fontSize: "1.3rem", marginTop: "50px" }}>Evolve your competition with us</Typography>
                    </Box>
                    <Box sx={{position: "absolute", bottom: 0, width: "100%", display: "flex", flexDirection: "column", alignItems: "bottom"}}>
                        <img src='/auth-image-v3.png' height="100%"></img>
                    </Box>
                </Box>
                <Box sx={{ 
                            width: {"xs": "100%", "lg": "75%"}, 
                            padding: {"xs": "5px", "lg": "30px"}
                        }}>
                    <Box 
                        sx={{ 
                            display: "flex", 
                            justifyContent:{"xs": "space-between", "lg": "end"}, 
                            alignItems: "center",
                            margin: {"xs": "20px 20px 0 20px", "lg": 0}
                        }}
                    >
                        <Box
                            sx={{ 
                                    display:{"xs": "block", "lg": "none"}
                                }}
                            >
                            <img src='/logo-v2.png'></img>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center"}}>
                            <Typography sx={{ 
                                                padding: "0 15px",
                                                display: {"xs": "none", "sm": "block"}
                                            }}>
                                                Want to know more?
                            </Typography>
                            <Button 
                                variant='contained' 
                                color="purple" 
                                sx={{ 
                                        color: "#fff",
                                    }}
                            >
                                Learn more
                            </Button>
                        </Box>
                    </Box>
                    <Container
                        maxWidth="xs"
                        sx={{ 
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <Outlet />
                    </Container>
                </Box>
            </Box>
        </Box>
    </div>
    )
}

export default AuthLayout