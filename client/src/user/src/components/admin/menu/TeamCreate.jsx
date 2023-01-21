import React, { useState } from 'react'
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Box, Button, InputBase, ListItem, ListItemButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import authApi from "../../../api/AdminAuthApi";
import AdminTeamApi from '../../../api/AdminTeamApi';
import { setTeam } from '../../../redux/features/teamSlice';
import { useNavigate } from 'react-router-dom';

const TeamCreateMenu = (props) => {
    const navigate = useNavigate();
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

        let order;

        if(teams.length !== 0) {
            const index = teams.length - 1;
            const a = teams[index];
            const lastOrder = Number(a.order);
            order = lastOrder + 1;
        } else {
            order = 0;  
        }

        const accessCreateApi = async () => {
            try {
                let res = await AdminTeamApi.create({ name, color_code, order });
                res = {...res, users: []}
                const newTeams = [...teams, res];
                dispatch(setTeam(newTeams));
            } catch (err) {
                if(err.status === 401) {
                    navigate("/admin/login");
                }
            }
        }

        await authApi.initialCsrfToken().then((res) => {
            accessCreateApi();
        })

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