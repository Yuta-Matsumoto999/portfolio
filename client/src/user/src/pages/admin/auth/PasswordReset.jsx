import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import authApi from '../../../api/AdminAuthApi';

const PasswordReset = () => {
    const navigate = useNavigate();
    
    // from value
    const [email, setEmail] = useState("");

    // validation error
    const [emailValidateErr, setEmailValidateErr] = useState("");

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

        const accessPasswordResetApi = async () => {
            try {
                const res = await authApi.sendResetLink({ email });
                navigate("/admin/sended-reset-link")
            } catch (err) {
                setLoading(false);

                console.log(err);

                const errors = Array(err.data.errors);
                
                errors.forEach((error) => {
                    if(error.email) {
                        setEmailValidateErr(error.email[0]);
                    }
                })
            }
        }

        // initialize csrf token and access passwordReset api
        await authApi.initialCsrfToken().then((res) => {
            accessPasswordResetApi();
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <Typography sx={{ marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Password Reset</Typography>
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