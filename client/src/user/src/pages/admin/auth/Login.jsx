import React, { useEffect } from 'react'
import { makeStyles } from "@mui/material/styles";
import { Box, Button, TextField, Typography, Alert, AlertTitle, Avatar } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import authApi from '../../../api/AdminAuthApi';
import { FaFacebookSquare, FaTwitterSquare, FaLine, FaGoogle } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { auth, provider } from "../../../firebase";
import { signInWithEmailAndPassword, signInWithPopup, getRedirectResult } from 'firebase/auth';
import styled from 'styled-components';

const GoogleButton = styled.button`
    background-color: #4285f4;
    width: 100%;
    border: 1px solid #4285f4;
    padding: 0;
    border-radius: 5px;
    cursor:pointer;
`

const Login = () => {
    const navigate = useNavigate();

    // validation error
    const [emailValidateErr, setEmailValidateErr] = useState("");
    const [passwordValidateErr, setPasswordValidateErr] = useState("");
    const [showAlert, setShowAlert] = useState(false);

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

        const accessLoginApi = async (uid) => {
            try {
                const res = await authApi.login({ uid });

                if(res) {
                    const organizationUniqueKey = res[1];
                    navigate(`/admin/manage/${organizationUniqueKey}`);
                }
            } catch (err) {
                setLoading(false);

                console.log(err);
            }
        }

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            
            const uid = res.user.uid;

            await authApi.initialCsrfToken().then((res) => {
                accessLoginApi(uid);
            });
        } catch (err) {
            setLoading(false);

            if (err.code === 'auth/invalid-email') {
                // メールアドレスの形式がおかしい
                setEmailValidateErr("メールアドレス形式で入力してください。");
            } else if(err.code === 'auth/user-disabled') {
                // ユーザが無効になっている
                setEmailValidateErr("メールアドレスが無効です。");
            } else if(err.code === 'auth/user-not-found') {
                // ユーザが存在しない
                setEmailValidateErr("メールアドレスが存在しません。");
            } else if(err.code === 'auth/wrong-password') {
                // パスワードが間違っている
                setPasswordValidateErr("パスワードが一致しません。");
            } else if (err.code === 'auth/too-many-requests') {
                // 何度もパスワードを間違えた
                setShowAlert(true);
            }
        }
    }

    // social login 用
    const accessLoginApi = async (name, email, uid, iconUrl) => {
        try {
            const res = await authApi.login({ name, email, uid, iconUrl });

            // 既に登録済みの場合
            if(res[1] !== undefined) {
                const organizationUniqueKey = res[1];
                navigate(`/admin/manage/${organizationUniqueKey}`);
            } else {
                // 未登録の場合
                navigate("/admin/organization");
            }
        } catch (err) {
            console.log(err);
        }
    }

    //Google認証
    const loginWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, provider);

            console.log(res);

            await authApi.initialCsrfToken().then(() => {
                accessLoginApi(res.user.displayName, res.user.email, res.user.uid, res.user.photoURL);
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
        <Typography sx={{ marginTop: {"xs": "40px", "sm": 0}, marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Sign In</Typography>
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

            <Box sx={{
                    margin: "10px 0",
                    display: showAlert ? "block" : "none"
                }}
            >
                <Alert severity="error">
                    <AlertTitle>エラーが発生しました。</AlertTitle>
                    繰り返しログインに失敗しました。<br />しばらく経ってから再度お試しください。
                </Alert>
            </Box>

            <LoadingButton
                sx={{ mt: 3, mb: 2, padding: "10px 16px" }} 
                fullWidth type="submit" 
                loading={loading}
                color="success"
                variant="contained"
                >
                Sign In
            </LoadingButton>
            <Box sx={{ textAlign: "center" }}>
                <Button component={Link} to="/admin/reset-password" sx={{ marginTop: "10px" }}>
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
                <GoogleButton
                    type='button'
                    onClick={loginWithGoogle}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                padding: "8px",
                                backgroundColor: "#fff",
                                borderRadius: "5px"
                            }}
                        >
                            <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' />
                        </Box>
                        <Typography
                            sx={{
                                flexGrow: 1,
                                color: "#fff"
                            }}
                            fontWeight="800"
                        >
                            Googleでログイン
                        </Typography>
                    </Box>

                </GoogleButton>
            </Box>
            <Button component={Link} to="/admin/register" sx={{ marginTop: "25px"}}>
                <Typography sx={{ color: "#000000",  fontSize: "0.9rem", fontWeight: 400}}>アカウントを持っていませんか？</Typography>
                <Typography sx={{ color: "#6c3cb4", fontSize: "0.9rem", fontWeight: "600" }}>新規作成</Typography>
            </Button>
        </Box>
        </>
    )
}

export default Login