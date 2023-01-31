import React, { useEffect } from 'react'
import { Box, Button, createChainedFunction, TextField, Typography, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate, useLocation, useAsyncError  } from "react-router-dom";
import { useState } from 'react';
import AdminAuthApi from '../../../api/AdminAuthApi';
import { auth } from '../../../firebase';
import { verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';

const PasswordReset = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // from value
    const [actionCode, setActionCode] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");

    // validation error
    const [passwordValidateErr, setPasswordValidateErr] = useState("");
    const [passwordConfirmationValidateErr, setPasswordConfirmationValidateErr] = useState("");

    // alert
    const [showAlert, setShowAlert] = useState(false);

    const [loading, setLoading] = useState(false)

    // oddCodeを取得
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        const oobCode = queryParams.get('oobCode') || ''
        setActionCode(oobCode)
    }, [])


    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setPasswordValidateErr("");

        if(newPassword === "") {
            setPasswordValidateErr("パスワードを入力してください。")
        } else if(newPassword.length < 6) {
            setPasswordValidateErr("パスワードは6文字以上です。")
        }
        setPassword(newPassword);
    }

    const handlePasswordConfirmation = (e) => {
        const newPasswordConfirmation = e.target.value;
        setPasswordConfirmationValidateErr("");

        if(newPasswordConfirmation === "") {
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。")
        } else if(newPasswordConfirmation.length < 6) {
            setPasswordConfirmationValidateErr("パスワード(確認用)は6文字以上です。")
        } else if(password !== newPasswordConfirmation) {
            setPasswordConfirmationValidateErr("パスワードが一致しません。")
        }
        setPassword_confirmation(newPasswordConfirmation);
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // initial validate error
        setPasswordValidateErr("");
        setPasswordConfirmationValidateErr("");

        // validation

        let validationErr = false

        if(password === "") {
            validationErr = true;
            setPasswordValidateErr("パスワードを入力してください。");
        } else if(password.length < 6) {
            setPasswordValidateErr("パスワードは6文字以上です。")
        }

        if(password_confirmation === "") {
            validationErr = true;
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。");
        } else if(password_confirmation.length < 6) {
            validationErr = true;
            setPasswordConfirmationValidateErr("パスワードは6文字以上です。");
        } else if(password !== password_confirmation) {
            validationErr = true;
            setPasswordConfirmationValidateErr("パスワードが一致しません。")
        }

        if(validationErr) return;

        setLoading(true);

        if(actionCode === '') return

        const confirmPassword = async (value) => {
            try {
                await confirmPasswordReset(auth, actionCode, password);
                navigate("/admin/complete-reset-password");
                initialCsrfToken(value);
            } catch (err) {
                console.log(err.code);
    
                setLoading(false);
    
                if(err.code === "auth/invalid-action-code") {
                    setShowAlert(true);
                }
            }
        }

        const sendResetCompleteEmail = async (email) => {
            try {
                await AdminAuthApi.sendCompletePasswordResetEmail({ email });
            } catch(err) {
                console.log(err);
            }
        }

        await verifyPasswordResetCode(auth, actionCode).then((value) => {
            confirmPassword(value);
        })

        const initialCsrfToken = async (value) => {
            await AdminAuthApi.initialCsrfToken().then((res) => {
                sendResetCompleteEmail(value);
            });
        }
    }

    return (
        <>
        <Typography sx={{ marginTop: {"xs": "40px", "sm": 0}, marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Password Update</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>パスワードの再設定を行なってください。</Typography>
        <Box component="form" onSubmit={handleResetPassword} noValidate sx={{ marginTop: "20px"}}>
            <TextField 
                fullWidth
                onChange={handlePassword}
                id="password" 
                label="新しいパスワード" 
                margin="normal" 
                name="password"
                type="password"
                required
                helperText={passwordValidateErr}
                error={passwordValidateErr !== ""}
                disabled={loading}
            />
            <TextField 
                fullWidth
                onChange={handlePasswordConfirmation}
                id="password_confirm" 
                label="新しいパスワード(確認用)" 
                margin="normal" 
                name="password_confirm"
                type="password"
                required
                helperText={passwordConfirmationValidateErr}
                error={passwordConfirmationValidateErr !== ""}
                disabled={loading}
            />

            <Box sx={{
                    margin: "10px 0",
                    display: showAlert ? "block" : "none"
                }}
            >
                <Alert severity="error">
                    <AlertTitle>エラーが発生しました。</AlertTitle>
                    リンクの有効期限切れもしくはアカウントが無効になっています。
                    パスワードをリセットする場合は、再度リセットリンクを要求してください。
                    <Box sx={{
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            margin: "10px"
                        }}
                    >
                        <Button color='primary' variant='contained' component={Link} to="/admin/reset-password">リンクの要求</Button>
                    </Box>
                </Alert>
            </Box>

            <LoadingButton
                sx={{ mt: 3, mb: 2, padding: "10px 16px" }} 
                fullWidth type="submit" 
                loading={loading}
                color="success"
                variant="contained"
                >
                Update
            </LoadingButton>
        </Box>
        <Button component={Link} to="/admin/login" sx={{ marginTop: "15px"}}>
            <Typography sx={{ color: "black",  fontSize: "0.9rem"}}>アカウントをお持ちですか？</Typography>
            <Typography sx={{ color: "#6c3cb4", fontSize: "0.9rem", fontWeight: "600" }}>ログイン</Typography>
        </Button>
        </>
    )
}

export default PasswordReset