import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography, Alert, AlertTitle } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import authApi from '../../../api/AdminAuthApi';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";

const PasswordReset = () => {
    const navigate = useNavigate();
    
    // from value
    const [email, setEmail] = useState("");

    // validation error
    const [emailValidateErr, setEmailValidateErr] = useState("");

    // alert
    const [showAlert, setShowAlert] = useState(false);

    const [loading, setLoading] = useState(false)

    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        // initial validate error
        setEmailValidateErr("");

        // validation

        let validationErr = false

        if(email === "") {
            validationErr = true;
            setEmailValidateErr("メールアドレスを入力してください。");
        }

        if(validationErr) return;

        setLoading(true);

        try {
            const res = await sendPasswordResetEmail(auth, email);
            navigate("/admin/sended-reset-link")
        } catch (err) {
            setLoading(false);

            if(err.code === "auth/user-not-found") {
                setShowAlert(true);
            }
        }
    }

    return (
        <>
        <Typography sx={{ marginTop: {"xs": "40px", "sm": 0}, marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Password Reset</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>パスワードをお忘れの場合は設定したメールアドレスを入力してください。<br />パスワード再設定用のリンクをメールアドレスへお送りします。</Typography>
        <Box component="form" onSubmit={handlePasswordReset} noValidate sx={{ marginTop: "20px"}}>
            <TextField 
                fullWidth
                onChange={handleEmail}
                id="email" 
                label="メールアドレス" 
                margin="normal" 
                name="email"
                required
                helperText={emailValidateErr}
                error={emailValidateErr !== ""}
                disabled={loading}
            />

            <Box sx={{
                    margin: "10px 0",
                    display: showAlert ? "block" : "none"
                }}
            >
                <Alert severity="error">
                    <AlertTitle>メールアドレスが存在しません。</AlertTitle>
                </Alert>
            </Box>

            <LoadingButton
                sx={{ mt: 3, mb: 2}} 
                fullWidth type="submit" 
                loading={loading}
                color="success"
                variant="contained"
                >
                Send Email
            </LoadingButton>
            <Button component={Link} to="/admin/login" sx={{ marginTop: "15px", textAlign: "center"}}>
                <Typography sx={{ color: "black",  fontSize: "0.9rem"}}>アカウントをお持ちですか？</Typography>
                <Typography sx={{ color: "#6c3cb4", fontSize: "0.9rem", fontWeight: "600" }}>ログイン</Typography>
            </Button>
        </Box>
        </>
    )
}

export default PasswordReset