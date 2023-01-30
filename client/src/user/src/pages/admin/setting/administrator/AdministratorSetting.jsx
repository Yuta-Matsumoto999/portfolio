import React from 'react'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminAuthApi from '../../../../api/AdminAuthApi'
import { BiDotsHorizontal, BiPlusMedical } from "react-icons/bi";
import { useLayoutEffect } from 'react';
import AdminInvitationDialog from '../../../../components/admin/dialog/AdminInvitationDialog';
import { setAdministrator } from '../../../../redux/features/administratorSlice'

const AdministratorSetting = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.admin.value);
    const administrator = useSelector((state) => state.administrator.value);
    const [showInvitationDialog, setShowInvitationDialog] = useState(false);

    useLayoutEffect(() => {
        const getAdmins = async () => {
            try {
                const res = await AdminAuthApi.getAdmins();
                dispatch(setAdministrator(res));
            } catch (err) {
                if(err.status === 401) {
                    navigate("/admin/login");
                }
            }
        }

        const initialCsrfToken = async() => {
            await AdminAuthApi.initialCsrfToken().then(() => {
                getAdmins();
            })
        }

        initialCsrfToken();
    }, []);

    const handleInvitationDialog = () => {
        setShowInvitationDialog(!showInvitationDialog);
    }

    return (
        <>
        <Box sx={{ padding: "20px", backgroundColor: "#fff" }}>
            <Typography fontSize="1.2rem" fontWeight="800">Administrator Setting</Typography>
        </Box>
        <Box
            sx={{
                padding: "20px"
            }}
        >
            <Typography
                fontSize="1rem"
                fontWeight="800"
            >
                組織メンバー
            </Typography>
        </Box>
        <Box sx={{
                padding: {"xs": "0 5px", "sm": "0 20px"},
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#fff",
                    padding: "15px",
                    marginBottom: "14px",
                    borderRadius: "8px",
                }}
            >
                {/* header */}
                <Box sx={{
                        display: {"xs": "none", "sm": "flex"},
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px",
                    }}
                >
                    <Box sx={{
                            width: "30%"
                        }}
                    >
                        <Typography 
                            sx={{
                                textAlign: "left"
                            }}
                            fontSize="0.9rem"
                            fontWeight="600"
                        >
                            名前
                        </Typography>
                    </Box>
                    <Box sx={{
                            width: "30%",
                        }}
                    >
                        <Typography 
                            sx={{
                                textAlign: "left"
                            }}
                            fontSize="0.9rem"
                            fontWeight="600"
                        >
                            メールアドレス
                        </Typography>
                    </Box>
                    <Box sx={{
                            width: "30%"
                        }}
                    >
                        <Typography 
                            sx={{
                                textAlign: "left"
                            }}
                            fontSize="0.9rem"
                            fontWeight="600"
                        >
                            チームでの権限
                        </Typography>
                    </Box>
                </Box>

                {/* ここに管理者をmapで表示 */}
                {/* body */}
                {administrator.map((item, index) => {
                    return (
                        <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                borderTop: "1px solid #eee",
                                borderBottom: "1px solid #eee",
                                padding: "20px 10px",
                            }}
                            key={item.id}
                        >
                            <Box sx={{
                                    width: {"xs": "50%", "sm": "30%"},
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <Avatar sx={{ width: "30px", height: "30px", marginRight: "10px" }}/>
                                <Box>
                                    <Typography 
                                        sx={{
                                            textAlign: "left",
                                            fontWeight: {"xs": "600", "sm": "normal"}
                                        }}
                                        fontSize="0.9rem"
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography 
                                        sx={{
                                            textAlign: "left",
                                            display: {"xs": "block", "sm": "none"},
                                            fontSize: {"xs": "0.8rem", "sm": "0.9rem"}
                                        }}
                                    >
                                        {item.email}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{
                                    width: "30%",
                                    display: {"xs": "none", "sm": "block"}
                                }}
                            >
                                <Typography 
                                    sx={{
                                        textAlign: "left"
                                    }}
                                    fontSize="0.9rem"
                                >
                                    {item.email}
                                </Typography>
                            </Box>
                            <Box sx={{
                                    width: {"xs": "50%", "sm": "30%"}
                                }}
                            >
                                {[item.permission].map((item, index) => {
                                    return (
                                        <Typography
                                            sx={{
                                                textAlign: {"xs": "right", "sm": "left"}
                                            }}
                                            fontSize="0.9rem"
                                            key={item.id}
                                        >
                                            {item.permission_name}
                                        </Typography>
                                    )
                                })}
                            </Box>
                        </Box>
                    )
                })}
                {/* ここまで管理者一覧 */}
                
                <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: {"xs": "24px", "sm": "36px"}
                    }}
                >
                    <Button
                        variant='contained'
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                        onClick={handleInvitationDialog}
                    >
                        <BiPlusMedical color='#fff' />
                        <Typography 
                            sx={{ marginLeft: "20px" }}
                            fontWeight="800"
                            fontSize="0.9rem"
                            color="#fff"
                        >
                            他のメンバーを招待
                        </Typography>
                    </Button>
                    <AdminInvitationDialog isShow={showInvitationDialog} handleClose={handleInvitationDialog} />
                </Box>
            </Box>
        </Box>
        <Box
            sx={{
                padding: "20px"
            }}
        >
            
            <Typography
                fontSize="1rem"
                fontWeight="800"
            >
                組織
            </Typography>
        </Box>
        <Box sx={{
                padding: {"xs": "0 5px", "sm": "0 20px"},
            }}
        >
            <Box
                sx={{
                    backgroundColor: "#fff",
                    padding: "15px",
                    marginBottom: "14px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Typography fontSize="0.9rem" fontWeight="600">組織名</Typography>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >
                    <Typography sx={{ marginLeft: "10px" }}>{user.organization_name}</Typography>
                    <Button
                        color='gray'
                        sx={{
                            minWidth: "30px"
                        }}
                    >
                        <BiDotsHorizontal />
                    </Button>
                </Box>
            </Box>
        </Box>
        </>
    )
}

export default AdministratorSetting