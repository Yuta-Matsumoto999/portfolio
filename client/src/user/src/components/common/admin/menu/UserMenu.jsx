import React from 'react'
import { Button, Menu, List, Typography, ListItemButton } from '@mui/material'
import { Box } from '@mui/system'
import { Link, useNavigate, useParams } from 'react-router-dom';

const UserMenu = (props) => {
    return (
        <Menu
            id="user-edit-menu"
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.onClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            >
            <Box sx={{ width: "100%", borderBottom: "1px solid #ececec", padding: "10px 15px" }}>
                <Typography fontSize="0.9rem"  sx={{ marginBottom: "5px" }}>Signed in as</Typography>
                <Typography fontSize="1rem"  fontWeight="800">{props.username}</Typography>
            </Box>
            <Box sx={{ width: "100%", borderBottom: "1px solid #ececec", fontSize: "1rem" }}>
                <ListItemButton component={Link} to="/admin">Your profile</ListItemButton>
                <ListItemButton component={Link} to="/admin">Edit password</ListItemButton>
            </Box>
            <Box sx={{ width: "100%", borderBottom: "1px solid #ececec", fontSize: "1rem" }}>
                <ListItemButton component={Link} to="/admin">Billing</ListItemButton>
                <ListItemButton component={Link} to="/admin">message</ListItemButton>
            </Box>
            <Box sx={{ width: "100%", fontSize: "1rem" }}>
                <ListItemButton onClick={props.logout}>Sign out</ListItemButton>
            </Box>
        </Menu>
    )
}

export default UserMenu