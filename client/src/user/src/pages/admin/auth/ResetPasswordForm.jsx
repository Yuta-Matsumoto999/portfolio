import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { useState } from 'react';
import authApi from '../../../api/AdminAuthApi';

const PasswordReset = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const getUrlParams = () => {
            const search = location.search;
            const query = new URLSearchParams(search);
            const email = query.get("email");
            const token = query.get("token");

            setEmail(email);
            setToken(token);
        }
        getUrlParams()
    }, [])
    
    // from value
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");

    // validation error
    const [passwordValidateErr, setPasswordValidateErr] = useState("");
    const [passwordConfirmationValidateErr, setPasswordConfirmationValidateErr] = useState("");

    // identify error
    const [identifyErr, setIdentifyErr] = useState(false);

    const [loading, setLoading] = useState(false)

    const handlePassword = (e) => {
        const newPassword = e.target.value;
        setPasswordValidateErr("");

        if(newPassword === "") {
            setPasswordValidateErr("パスワードを入力してください。")
        } else if(newPassword.length < 8) {
            setPasswordValidateErr("パスワードは8文字以上です。")
        }
        setPassword(newPassword);
    }

    const handlePasswordConfirmation = (e) => {
        const newPasswordConfirmation = e.target.value;
        setPasswordConfirmationValidateErr("");

        if(newPasswordConfirmation === "") {
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。")
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
        }

        if(password_confirmation === "") {
            validationErr = true;
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。");
        }

        if(validationErr) return;

        setLoading(true);

        const accessResetPasswordApi = async () => {
            try {
                const res = await authApi.resetPassword({ email, token, password, password_confirmation });
                navigate("/admin/complete-reset-password");
            } catch (err) {
                setLoading(false);

                console.log(err);

                const errors = Array(err.data.errors);
                
                errors.forEach((error) => {
                    if(error.password[0] === "パスワードが一致していません。") {
                        setPasswordConfirmationValidateErr("パスワードが一致していません。")
                    } else {
                        setPasswordValidateErr(error.password[0]);
                    }

                    if(error.email) {
                        setIdentifyErr(true);
                    }

                    if(error.token) {
                        setIdentifyErr(true);
                    }
                })
            }
        }

        // initialize csrf token and access passwordReset api
        await authApi.initialCsrfToken().then((res) => {
            accessResetPasswordApi();
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <Typography sx={{ marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Password Update</Typography>
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
            <LoadingButton
                sx={{ mt: 3, mb: 2}} 
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