import React from 'react'
import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const CompleteResetPassword = () => {
    return (
        <>
        <Typography sx={{ marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Complete Update Password</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>パスワードの再設定が完了しました。</Typography>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 800, marginTop: "15px" }}>新しいパスワードでログインしてください。</Typography>
        <Box sx={{ marginTop: "20px" }}>
            <Button variant='contained' color='purple' component={Link} to="/login">
                <Typography sx={{ color: "white" }}>ログインへ</Typography>
            </Button>
        </Box>
        </>
    )
}

export default CompleteResetPassword