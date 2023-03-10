import React from 'react'
import { Box, Button, Menu, List, Typography, ListItemButton } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminInvitationMenu = (props) => {

    return (
        <Menu
            id="admin-invitation-menu"
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
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            >
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0" }}>
                <Typography fontSize="0.8rem">全て既読にする</Typography>
            </Box>
        </Menu>
    )
}

export default AdminInvitationMenu