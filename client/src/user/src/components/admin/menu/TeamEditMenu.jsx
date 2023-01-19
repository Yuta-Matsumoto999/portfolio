import React, {useState} from 'react'
import styled, { useTheme } from 'styled-components';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, InputBase, List, ListItem, ListItemButton, TextField, Typography } from '@mui/material';
import { setTeam } from '../../../redux/features/teamSlice';

const TeamEditMenu = (props) => {
    return (
        <Menu
            id='team-edit-menu'
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.onClose}
        >
            <Box>
                <ListItemButton>
                    <Typography
                        fontSize="0.9rem"
                    >
                        名前を変更
                    </Typography>
                </ListItemButton>
                <ListItemButton>
                    <Typography
                        fontSize="0.9rem"
                    >
                        カラーを変更
                    </Typography>
                </ListItemButton>
            </Box>
        </Menu>
    )
}

export default TeamEditMenu