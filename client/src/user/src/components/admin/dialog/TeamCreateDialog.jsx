import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Box, TextField, Typography } from '@mui/material';
import AdminTeamApi from '../../../api/AdminTeamApi';
import { BiCaretDown } from "react-icons/bi";
import ColorPicker from '../../common/input/ColorPicker';
import { useDispatch, useSelector } from 'react-redux';
import { setTeam } from '../../../redux/features/teamSlice';

const ColorInput = styled.input`
    position: absolute;
    left: 0;
    opacity: 0;
    width: 300px;
`

const TeamCreateDialog = (props) => {
    const teams = useSelector((state) => state.team.value);
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [color_code, setColorCode] = useState("#1569a8");
    const [newNameValidateErr, setNewNameValidateErr] = useState("");
    const [colorCodeValidateErr, setColorCodeValidateErr] = useState("");

    const handleNewTeamName = async (e) => {
        setName(e.target.value);
    }
    const handleColorCode = (e) => {
        setColorCode(e.target.value);
    }

    const handleCreateNewTeam = async (e) => {
        e.preventDefault();

        setNewNameValidateErr("");
        setColorCodeValidateErr("");

        let error = false;

        if(name === "") {
            error = true;
            setNewNameValidateErr("新しいチーム名を入力してください。");
        }

        if(color_code === "") {
            error = true;
            setColorCodeValidateErr("カラーを入力してください。");
        }

        if(error) return;

        try {
            const res = await AdminTeamApi.create({ name, color_code });
            console.log(res);
            const newTeams = [...teams, res];

            dispatch(setTeam(newTeams));

            props.handleClose();
        } catch (err) {
            const errors = Array(err.data.errors);

            errors.forEach((error) => {
                if(error.name) {
                    setNewNameValidateErr(error.name[0]);
                }

                if(error.color_code) {
                    setColorCodeValidateErr(error.color_code[0]);
                }
            })
        }
    }

    return (
        <Dialog
            open={props.isShow}
            onClose={props.handleClose}
            aria-labelledby="create-new-team"
        >
            <DialogTitle id="create-new-team" fontWeight="700">チーム新規作成</DialogTitle>
            <form onSubmit={handleCreateNewTeam}>
                <DialogContent>
                    <TextField
                    autoFocus
                    onChange={handleNewTeamName}
                    margin="dense"
                    id="newTeamName"
                    name='newTeamName'
                    label="新しいチーム名"
                    type="text"
                    helperText={newNameValidateErr}
                    error={newNameValidateErr !== ""}
                    sx={{marginTop: "10px"}}
                    fullWidth
                    />
                    <ColorPicker colorCode={color_code} onChange={handleColorCode} validateErr={colorCodeValidateErr}/>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' variant="contained" color="natural">
                        作成
                    </Button>
                    <Button onClick={props.handleClose} variant="contained" color="error">
                        キャンセル
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default TeamCreateDialog