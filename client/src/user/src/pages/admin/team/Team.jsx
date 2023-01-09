import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import AdminTeamApi from '../../../api/AdminTeamApi'
import useTeamAndUser from '../../../customHooks/useTeamAndUser'
import { setTeam } from '../../../redux/features/teamSlice'
import { setTeamUser } from '../../../redux/features/teamUserSlice'
import { BiPlusCircle } from "react-icons/bi";
import { DataGrid } from '@mui/x-data-grid';
import TeamCreateDialog from '../../../components/admin/dialog/TeamCreateDialog'
import useWindowSize from '../../../customHooks/useWindowSize'
import TeamNameItem from '../../../components/admin/items/TeamNameItem'

const Team = () => {
    const teamAndUser = useTeamAndUser();
    const navigate = useNavigate();
    const teams = useSelector((state) => state.team.value);
    const teamUser = useSelector((state) => state.teamUser.value);
    const dispatch = useDispatch();

    const [onClick, setOnClick] = useState(1);
    const [isShowCreateDialog, setIsShowCreateDialog] = useState(false);
    const [width, height] = useWindowSize();
    const mainContentPcWidth = width - 280;
    const mainContentTabWidth = width - 100;
    const mainContentMobileWidth = width - 30;

    const columns = [
        {
            field: "position1",
            headerName: "",
        },
        {
            field: "name",
            headerName: "NAME",
        },
        {
            field: "birthday",
            headerName: "BIRTHDAY",
        },
        {
            field: "age",
            headerName: "Age",
        },
        {
            field: "grade",
            headerName: "GARDE",
        },
    ];

    const rows = teamUser;

    const handleItem = (params) => {
        console.log(params.row.id);
    }

    const selectAllItems = (params) => {
        console.log(teamUser);
        console.log(teams);
    }

    const handleOpenCreateDialog = () => {
        setIsShowCreateDialog(true);
    }

    const handleCloseCreateDialog = () => {
        setIsShowCreateDialog(false);
    }

    return (
        <>
            <Box sx={{ padding: "20px", backgroundColor: "#fff", display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize="1.2rem" fontWeight="800">Team</Typography>
                <Button onClick={handleOpenCreateDialog} variant='contained' padding="0"><BiPlusCircle size="1.2rem"/><Typography sx={{ marginLeft: "5px" }}>create team</Typography></Button>
            </Box>
            <Box sx={{ padding: "20px", width: "100%" }}>
                <Box sx={{ display: "flex",  borderBottom: "3px solid #eee", alignItems: "center", marginBottom: "25px", width: {"xs": mainContentMobileWidth, "sm": mainContentTabWidth,"md": mainContentPcWidth }, overflow: "scroll" }}>
                    {teams.map((team, index) => {
                        return (
                            <>
                                <TeamNameItem onClick={onClick} team={team} key={index}/>
                            </>
                        );
                    })}
                </Box>

                <Box sx={{ backgroundColor: "#fff", padding: "10px", borderRadius: "8px", marginBottom: "25px" }}>
                    <Typography>ここに検索ボックス</Typography>
                </Box>

                <Box sx={{ backgroundColor: "#fff", padding: "10px", borderRadius: "8px", width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={18}
                        rowsPerPageOptions={[18]}
                        checkboxSelection
                        autoHeight={true}
                        disableSelectionOnClick={true}
                        onCellClick={handleItem}
                        onColumnHeaderClick={selectAllItems}
                        sx={{ ".MuiDataGrid-columnHeader": {backgroundColor: "#eee"}, ".MuiDataGrid-cellContent": {width: "200px"} }}
                    />
                </Box>
            </Box>
            <TeamCreateDialog isShow={isShowCreateDialog}  handleClose={handleCloseCreateDialog}/>
        </>
    )
}

export default Team