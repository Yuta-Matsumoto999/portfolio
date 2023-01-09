import React from 'react'
import { Box, Button, Menu, List, Typography, ListItemButton } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';

const NotificationMenu = (props) => {

  const notificationItems = [
    {
        "title": "通知",
        "content": "test",
        "category": "優先",
    },
    {
        "title": "通知2",
        "content": "test2",
        "category": "優先",
    },
    {
        "title": "通知3",
        "content": "test3",
        "category": "優先",
    },
    {
        "title": "通知4",
        "content": "test4",
        "category": "優先",
    },
    {
        "title": "通知5",
        "content": "test5",
        "category": "優先",
    },
  ]

  return (
    <Menu
        id="notification-menu"
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
        {notificationItems.map((item, index) => {
            return (
                <Box key={index} sx={{ minWidth: "150px", borderBottom: "1px solid #ececec", fontSize: "1rem", borderBottom: "1px solid #ececec" }}>
                    <ListItemButton component={Link} to="/admin">{item.title}</ListItemButton>
                </Box>
            )
        })}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 0" }}>
            <Typography fontSize="0.8rem">全て既読にする</Typography>
        </Box>
    </Menu>
  )
}

export default NotificationMenu