import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import authApi from '../../../api/AdminAuthApi';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../../../firebase";
import AdminAuthApi from '../../../api/AdminAuthApi';
import { async } from '@firebase/util';

const Register = () => {
    const navigate = useNavigate();

    // input 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPassword_confirmation] = useState("");

    // validation error message
    const [nameValidateErr, setNameValidateErr] = useState("");
    const [emailValidateErr, setEmailValidateErr] = useState("");
    const [passwordValidateErr, setPasswordValidateErr] = useState("");
    const [passwordConfirmationValidateErr, setPasswordConfirmationValidateErr] = useState("");

    const [loading, setLoading] = useState(false)

    // name input
    const handleName = (e) => {
        const newName = e.target.value.trim();
        setNameValidateErr("");

        if(newName === "") {
            setNameValidateErr("名前を入力してください。");
        }
        setName(newName);
    }
    
    const onFocusName = (e) => {
        const nameValue = e.target.value;

        if(nameValue === "") {
            setNameValidateErr("名前を入力してください。");
        }
    }

    // email input
    const handleEmail = (e) => {
        const newEmail = e.target.value.trim();
        setEmailValidateErr("");

        if(newEmail === "") {
            setEmailValidateErr("メールアドレスを入力してください。")
        }
        setEmail(newEmail);
    }

    const onFocusEmail = (e) => {
        const emailValue = e.target.value;

        if(emailValue === "") {
            setEmailValidateErr("メールアドレスを入力してください。")
        }
    }

    // password input
    const handlePassword = (e) => {
        const newPassword = e.target.value.trim();
        setPasswordValidateErr("");

        if(newPassword === "") {
            setPasswordValidateErr("パスワードを入力してください。")
        } else if(newPassword.length < 6) {
            setPasswordValidateErr("パスワードは6文字以上です。")
        }
        setPassword(newPassword);
    }

    const onFocusPassword = (e) => {
        const passwordValue = e.target.value;

        if(passwordValue === "") {
            setPasswordValidateErr("パスワードを入力してください。")
        }
    }

    // password confirmation input
    const handlePasswordConfirmation = (e) => {
        const newPasswordConfirmation = e.target.value.trim();
        setPasswordConfirmationValidateErr("");

        if(newPasswordConfirmation === "") {
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。");
        } else if(newPasswordConfirmation.length < 6) {
            setPasswordConfirmationValidateErr("パスワード(確認用)は、6文字以上です。")
        } else if(newPasswordConfirmation !== password) {
            setPasswordConfirmationValidateErr("パスワードが一致していません。")
        }
        setPassword_confirmation(newPasswordConfirmation);
    }

    const onFocusPasswordConfirmation = (e) => {
        const passwordConfirmationValue = e.target.value;

        if(passwordConfirmationValue === "") {
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。")
        }
    }

    const register = async (e) => {
        e.preventDefault();

         // initialize validate message
        setNameValidateErr("")
        setEmailValidateErr("")
        setPasswordValidateErr("")
        setPasswordConfirmationValidateErr("")

        // validation
        let error = false;

        if(name === "") {
            error = true;
            setNameValidateErr("名前を入力してください。");
        } else if(name > 255) {
            error = true;
            setNameValidateErr("名前は225文字以下で入力してください。");
        }

        if(email === "") {
            error = true
            setEmailValidateErr("メールアドレスを入力してください。")
        }

        if(password === "") {
            error = true;
            setPasswordValidateErr("パスワードを入力してください。")
        } else if(password.length < 6) {
            error = true;
            setPasswordValidateErr("パスワードは6文字以上です。")
        }

        if(password_confirmation === "") {
            error = true;
            setPasswordConfirmationValidateErr("パスワード(確認用)を入力してください。");
        } else if(password_confirmation.length < 6) {
            error = true;
            setPasswordConfirmationValidateErr("パスワード(確認用)は、6文字以上です。")
        } else if(password_confirmation !== password) {
            error = true;
            setPasswordConfirmationValidateErr("パスワードが一致していません。")
        }

        if(error) return;

        setLoading(true);

        const accessRegisterApi = async (uid) => {
            try {
                const res = await AdminAuthApi.register({ name, email, uid });

                if(res) {
                    navigate("/admin/organization");
                }
            } catch (err) {
                console.log(err);
            }
        }

        // firebaseへ新規登録
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const uid = res.user.uid;

            await authApi.initialCsrfToken().then((res) => {
                accessRegisterApi(uid, email);
            });
        } catch (err) {
            setLoading(false);

            console.log(err.code);

            if (err.code === 'auth/invalid-email') {
                // メールアドレスの形式がおかしい
                setEmailValidateErr("メールアドレス形式で入力してください。");
            } else if(err.code === "auth/email-already-in-use") {
                // メールアドレスが既に存在している
                setEmailValidateErr("メールアドレスはすでに使用されています。");
            } else if("auth/weak-password") {
                setPasswordValidateErr("パスワードは、6文字以上です。");
            }
        }
    }

    return (
        <>
        <Typography sx={{ marginTop: {"xs": "40px", "sm": 0}, marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Sign Up</Typography>
        <Box component="form" onSubmit={register} noValidate>
            <TextField 
                fullWidth
                onChange={handleName}
                onFocus={onFocusName}
                value={name}
                id="name" 
                label="名前" 
                margin="normal" 
                name="name"
                required
                helperText={nameValidateErr}
                error={nameValidateErr !== ""}
                disabled={loading}
            />

            <TextField 
                fullWidth 
                onChange={handleEmail}
                onFocus={onFocusEmail}
                value={email}
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
                onChange={handlePassword}
                onFocus={onFocusPassword}
                value={password}
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

            <TextField 
                fullWidth
                onChange={handlePasswordConfirmation}
                onFocus={onFocusPasswordConfirmation}
                value={password_confirmation}
                id="password_confirmation" 
                label="パスワード(確認)"
                margin="normal" 
                name="password_confirmation"
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
                Sign Up
            </LoadingButton>
        </Box>
        <Button component={Link} to="/admin/login" sx={{ marginTop: "15px"}}>
            <Typography sx={{ color: "black",  fontSize: "0.9rem"}}>アカウントをお持ちですか？</Typography>
            <Typography sx={{ color: "#6c3cb4", fontSize: "0.9rem", fontWeight: "600" }}>ログイン</Typography>
        </Button>
        </>
    )
}

export default Register