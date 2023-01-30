import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const OrganizationNotFound = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.admin.value);

    const handleBackMyPage = () => {
        navigate(`/admin/manage/${user.organization_unique_key}`);
        window.location.reload();
    }

    return (
        <Box sx={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh",
                flexDirection: "column"
            }}
        >
            <Typography fontSize="3rem" fontWeight="800">
                404
            </Typography>
            <Typography fontSize="1.3rem" fontWeight="800" sx={{ margin: "20px 0" }}>このページは存在しません</Typography>
            <Button
                variant='contained'
                onClick={handleBackMyPage}
            >
                <Typography fontWeight="600">自分のページに戻る</Typography>
            </Button>
        </Box>
    )
}

export default OrganizationNotFound