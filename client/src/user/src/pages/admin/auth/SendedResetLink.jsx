import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material';
import { Link } from "react-router-dom";

const SendedResetLink = () => {
    return (
        <>
        <Typography sx={{ marginTop: {"xs": "40px", "sm": 0}, marginBottom: "20px", fontWeight: "800", fontSize: "1.4rem" }}>Sended Reset Link</Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>設定したメールアドレスへパスワード再設定用リンクをお送りしました。<br />メールを確認の上、パスワードの再設定を行なってください。</Typography>
        <Typography sx={{ fontSize: "0.9rem", fontWeight: 800, marginTop: "15px" }}>メールが届かない場合は、再設定用リンクをリクエストしてください。</Typography>
        <Box sx={{ marginTop: "20px" }}>
            <Button variant='contained' color='purple' component={Link} to="/admin/reset-password">
                <Typography sx={{ color: "#fff" }}>パスワードリセットへ</Typography>
            </Button>
        </Box>

        <Box sx={{ marginTop: "30px" }}>
            <Button component={Link} to="/admin/login">
                <Typography sx={{ fontWight: 800 }}>ログインへ戻る</Typography>
            </Button>
        </Box>
        </>
    )
}

export default SendedResetLink