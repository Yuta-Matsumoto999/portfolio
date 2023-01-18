import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, InputBase, ListItem, ListItemButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import AdminTeamApi from '../../../api/AdminTeamApi';
import { setTeam } from '../../../redux/features/teamSlice';

const TeamCreateMenu = (props) => {
    const teams = useSelector((state) => state.team.value);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [color_code, setColorCode] = useState("#FA8072");

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleCreate = async (e) => {
        e.preventDefault();

        let error = false;

        if(name === "") {
            error = true;
        }

        if(error) return;

        try {
            const index = teams.length - 1;
            const a = teams[index];
            const lastOrder = Number(a.order);
            const order = lastOrder + 1;
            let res = await AdminTeamApi.create({ name, color_code, order });
            res = {...res, users: []}
            const newTeams = [...teams, res];
            dispatch(setTeam(newTeams));
        } catch (err) {
            console.log(err);
        }

        props.onClose()
    }

    return (
        <Menu
            id='team-create-menu'
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.onClose}
        >
            <Box 
                sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                }}
                component="form"
                onSubmit={handleCreate}
            >
                <InputBase 
                    placeholder='新しいチーム'
                    onChange={handleName}
                />
                <Button
                    variant='contained'
                    type='submit'
                >
                    <Typography
                        fontWeight="800"
                        fontSize="0.8rem"
                    >
                        完了
                    </Typography>
                </Button>
            </Box>
        </Menu>
    )
}

export default TeamCreateMenu