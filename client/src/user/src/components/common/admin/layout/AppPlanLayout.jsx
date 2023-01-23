import React, { useEffect } from 'react'
import { Container } from '@mui/system';
import { Box, Button, Typography } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import authApi from '../../../../api/AdminAuthApi';
import useAdminAuth from '../../../../customHooks/useAdminAuth';
import AdminAuthApi from '../../../../api/AdminAuthApi';

const AppPlanLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
                        width: {"xs": "100%", "lg": "80%"},
                        minHeight: {"xs": "100%", "lg": "80%"}
            }}>
                <Box sx={{ 
                            width: "100%", 
                            padding: {"xs": "5px", "lg": "30px"}
                        }}>
                    <Box 
                        sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
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
                </Box>
                <Outlet />
            </Box>
        </Box>
    </div>
    )
}

export default AppPlanLayout