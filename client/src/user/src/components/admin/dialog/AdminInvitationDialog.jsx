import React, { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { Button, Container, TextField, Typography } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/system';
import { BiLinkAlt } from "react-icons/bi";
import AdminInvitationApi from "../../../api/AdminInvitationApi";
import AdminAuthApi from '../../../api/AdminAuthApi';
import { useNavigate } from 'react-router-dom';

const AdminInvitationDialog = (props) => {
    const navigate = useNavigate();
    const [isShowInvitationLink, setIsShowInvitationLink] = useState(false);
    const [invitationLink, setInvitationLink] = useState();
    const [getLinkLoading, setGetLinkLoading] = useState(false);
    const [sendEmailLoading, setSendEmailLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [emailValidateErr, setEmailValidateErr] = useState("");

    const handleShowInvitationLink = () => {
        setIsShowInvitationLink(!isShowInvitationLink);
    }

    const getInvitationLink = async () => {
        setGetLinkLoading(true);

        const accessInvitationApi = async () => {
            try {
                const res = await AdminInvitationApi.updateOrCreate();
                setInvitationLink(res);
                setGetLinkLoading(false);
                setIsShowInvitationLink(!isShowInvitationLink);
            } catch (err) {
                if(err.status === 401) {
                    navigate("/admin/login");
                }
            }
        }

        await AdminAuthApi.initialCsrfToken().then(() => {
            accessInvitationApi();
        })
    }

    const disableInvitationLink = async () => {
        setIsShowInvitationLink(!isShowInvitationLink);
        const accessDisableInvitationApi = async () => {
            try {
                const res = await AdminInvitationApi.disableLink();
                setInvitationLink("");
            } catch (err) {
                if(err.status === 401) {
                    navigate("/admin/login");
                }
            }
        }

        await AdminAuthApi.initialCsrfToken().then(() => {
            accessDisableInvitationApi();
        })
    }

    const sendInvitationEmail = async (e) => {
        e.preventDefault();

        setSendEmailLoading(true);

        setEmailValidateErr("");

        let error = false;

        if(email === "") {
            error = true
            setEmailValidateErr("メールアドレスを入力してください。");
            setSendEmailLoading(false);
        }

        if(error) return;

        const accessSendEmailApi = async () => {
            try {
                // メール送信Api

                setIsShowInvitationLink(!isShowInvitationLink);
                sendEmailLoading(false);
                props.handleClose();
            } catch (err) {
                if(err.status === 401) {
                    navigate("/admin/login");
                }
            }
        }

        await AdminAuthApi.initialCsrfToken().then(() => {
            accessSendEmailApi();
        })
    }

    return (
        <Dialog
            open={props.isShow}
            onClose={props.handleClose}
            aria-labelledby="invitation-dialog"
        >
            <DialogTitle id="invitation-dialog" fontWeight="700">チームに招待</DialogTitle>
            <Box component="form" onSubmit={sendInvitationEmail}>
                <DialogContent>
                    <DialogContentText
                        fontSize="0.9rem"
                    >
                    メンバーを追加するには招待リンクを取得もしくは、メールアドレスを入力し、招待を送信します。
                    </DialogContentText>
                    <Box
                        sx={{
                            display: isShowInvitationLink ? "none" : "flex",
                            justifyContent: "center"
                        }}
                    >
                        <LoadingButton
                            variant='contained'
                            color="gray"
                            sx={{
                                margin: "20px 0",
                                width: "80%"
                            }}
                            onClick={getInvitationLink}
                            loading={getLinkLoading}
                        >
                            <BiLinkAlt size={20} />
                            <Typography 
                                sx={{
                                    marginLeft: "10px"
                                }}
                            >
                                リンクを取得
                            </Typography>
                        </LoadingButton>
                    </Box>
                    <Box 
                        sx={{
                            display: isShowInvitationLink ? "flex" : "none",
                            alignItems: "center",
                            marginTop: "20px"
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#eee",
                                padding: "6px 10px",
                                maxWidth: "100%",
                                overflow: "scroll"
                            }}
                        >
                            <Typography 
                                sx={{
                                    whiteSpace: "nowrap"
                                }}
                            >
                                {`http://localhost:3000/admin/invitation/${invitationLink}`}
                            </Typography>
                        </Box>
                        <Button
                                variant='contained'
                                color='purple'
                        >
                            <Typography color="#fff">Copy</Typography>
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            display: isShowInvitationLink ? "flex" : "none",
                            justifyContent: "end",
                            padding: "5px"
                        }}
                    >
                        <Button 
                            sx={{
                                textAlign: "right",
                                fontSize: "0.8rem"
                            }}
                            onClick={disableInvitationLink}
                        >
                            リンクを無効にする
                        </Button>
                    </Box>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="invitation_email"
                        name='invitation_email'
                        label="Email"
                        type="text"
                        error={emailValidateErr !== ""}
                        helperText={emailValidateErr}
                        fullWidth
                        sx={{marginTop: "20px"}}
                    />
                </DialogContent>
                <Box 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "20px"
                    }}
                >
                    <LoadingButton 
                        type='submit' 
                        variant="contained" 
                        color="success" 
                        fullWidth
                        loading={sendEmailLoading}
                    >
                        招待を送信
                    </LoadingButton>
                </Box>
            </Box>
        </Dialog>
    )
}

export default AdminInvitationDialog