import React, { useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import authApi from '../../../api/AdminAuthApi';
import { FaFacebookSquare, FaTwitterSquare, FaLine, FaGoogle } from "react-icons/fa";
import { IconContext } from 'react-icons';

const Login = () => {
    const navigate = useNavigate();

    // validation error
    const [emailValidateErr, setEmailValidateErr] = useState("");
    const [passwordValidateErr, setPasswordValidateErr] = useState("");

    const [loading, setLoading] = useState(false)

    const login = async (e) => {
        e.preventDefault();

        // initial validate error
        setEmailValidateErr("");
        setPasswordValidateErr("");

        // get form value
        const formData = new FormData(e.target);
        const email = formData.get("email").trim();
        const password = formData.get("password").trim();

        // validation

        let validationErr = false

        if(email === "") {
            validationErr = true;
            setEmailValidateErr("メールアドレスを入力してください。");
        }

        if(password === "") {
            validationErr = true;
            setPasswordValidateErr("パスワードを入力してください。");
        }

        if(validationErr) return;

        setLoading(true);

        const accessLoginApi = async () => {
            try {
                const user = await authApi.login({email, password});

                if(user) {
                    navigate("/admin")
                }
            } catch (err) {
                setLoading(false);

                const errors = Array(err.data.errors);
                
                errors.forEach((error) => {
                    if(error.email) {
                        setEmailValidateErr(error.email[0]);
                    }

                    if(error.password) {
                        setPasswordValidateErr(error.password[0]);
                    }
                })
            }
        }

        // initialize csrf token and access login api
        await authApi.initialCsrfToken().then((res) => {
            accessLoginApi();
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
        <Typography sx={{ marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Sign In</Typography>
        <Box component="form" onSubmit={login} noValidate>
            <TextField 
                fullWidth 
                id="email" 
                label="メールアドレス" 
                margin="normal" 
                name="email"
                required
                helperText={emailValidateErr}
                error={emailValidateErr !== ""}
                disabled={loading}
            />

            <TextField 
                fullWidth 
                id="password" 
                label="パスワード" 
                margin="normal" 
                name="password"
                type="password"
                required
                helperText={passwordValidateErr}
                error={passwordValidateErr !== ""}
                disabled={loading}
            />

            <LoadingButton
                sx={{ mt: 3, mb: 2}} 
                fullWidth type="submit" 
                loading={loading}
                color="success"
                variant="contained"
                >
                Sign In
            </LoadingButton>
            <Box sx={{ textAlign: "center" }}>
                <Button component={Link} to="/admin/authenticate/reset-password" sx={{ marginTop: "10px" }}>
                    <Typography sx={{ color: "#6c3cb4", fontSize: "0.9rem", fontWeight: "600" }}>パスワードをお忘れですか？</Typography>
                </Button>
            </Box>
        </Box>
            <Box>
                <Typography 
                    sx={{
                        fontWeight: 800,
                        margin: "10px 0",
                        textAlign: "center"
                    }}
                >
                    or
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <Button>
                        <IconContext.Provider value={{ color: "#4267B2", size: "40px" }}>
                            <FaFacebookSquare />
                        </IconContext.Provider> 
                    </Button>
                    <Button>
                        <IconContext.Provider value={{ color: "#1DA1F2", size: "40px" }}>
                            <FaTwitterSquare />
                        </IconContext.Provider> 
                    </Button>
                    <Button>
                        <IconContext.Provider value={{ color: "#06c775", size: "40px" }}>
                            <FaLine />
                        </IconContext.Provider> 
                    </Button>
                    <Button>
                        <IconContext.Provider value={{ color: "#DB4437", size: "40px" }}>
                            <FaGoogle/>
                        </IconContext.Provider> 
                    </Button>
                </Box>
                <Button component={Link} to="/admin/authenticate/register" sx={{ marginTop: "15px"}}>
                    <Typography sx={{ color: "black",  fontSize: "0.9rem"}}>アカウントを持っていませんか？</Typography>
                    <Typography sx={{ color: "#6c3cb4", fontSize: "0.9rem", fontWeight: "600" }}>新規作成</Typography>
                </Button>
            </Box>
        </>
    )
}

export default Login