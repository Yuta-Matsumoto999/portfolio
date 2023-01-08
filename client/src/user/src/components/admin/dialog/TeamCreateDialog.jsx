import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Container, TextField, Typography } from '@mui/material';
import AdminTeamApi from '../../../api/AdminTeamApi';

const TeamCreateDialog = (props) => {
    const [name, setName] = useState("");
    const [newNameValidateErr, setNewNameValidateErr] = useState("");

    const handleNewTeamName = async (e) => {
        setName(e.target.value);
    }

    const handleCreateNewTeam = async (e) => {
        e.preventDefault();

        setNewNameValidateErr("");

        let error = false;

        if(name === "") {
            error = true;
            setNewNameValidateErr("新しいチーム名を入力してください。");
        }

        if(error) return;

        try {
            await AdminTeamApi.create({ name });
        } catch (err) {
            const errors = Array(err.data.errors);
            setNewNameValidateErr(errors.name);
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
                    sx={{marginTop: "10px", width: "300px"}}
                    />
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