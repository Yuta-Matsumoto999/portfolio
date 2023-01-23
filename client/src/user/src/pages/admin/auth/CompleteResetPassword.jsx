import React from 'react'
import { Box, Button, Typography, Alert, AlertTitle } from '@mui/material';
import { Link } from "react-router-dom";

const CompleteResetPassword = () => {
    return (
        <>
        <Typography sx={{ marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Complete Update Password</Typography>
        <Alert severity="success">
            <AlertTitle>パスワードの再設定が完了しました！</AlertTitle>
            新しく設定したパスワードでログインしてください。
        </Alert>
        <Box sx={{ marginTop: "20px" }}>
            <Button variant='contained' color='purple' component={Link} to="/admin/login">
                <Typography fontWeight="600" sx={{ color: "#fff" }}>ログインへ</Typography>
            </Button>
        </Box>
        </>
    )
}

export default CompleteResetPassword