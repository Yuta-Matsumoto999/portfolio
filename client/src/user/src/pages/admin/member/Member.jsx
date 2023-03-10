import styled, { useTheme } from 'styled-components';
import { Box, Button, InputBase, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminTeamApi from '../../../api/AdminTeamApi'
import { setTeam } from '../../../redux/features/teamSlice'
import { BiSearchAlt, BiDotsHorizontal, BiChevronDown } from "react-icons/bi";
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TeamDraggable from '../../../components/admin/dnd/TeamDraggable';
import TeamCreateMenu from '../../../components/admin/menu/TeamCreate';
import AdminSearchApi from '../../../api/AdminSearchApi';
import { teamSearch } from '../../../search/admin/TeamSearch';
import { blue } from '@mui/material/colors';
import authApi from '../../../api/AdminAuthApi';

const Member = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const teams = useSelector((state) => state.team.value);
    const [teamCreateAnchorEl, setTeamCreateAnchorEl] = useState(null);
    const TeamCreateOpen = Boolean(teamCreateAnchorEl);
    const [teamEditAnchorEl, setTeamEditAnchorEl] = useState(null);
    const teamEditOpen = Boolean(teamEditAnchorEl);
    const [searchWord, setSearchWord] = useState();
    const [filterQueries, setFilterQueries] = useState([]);
    const [sortQueries, setSortQueries] = useState([]);
    const [searchQueries, setSearchQueries] = useState();

    useEffect(() => {
        const getTeams = async () => {
            try{
                const res = await AdminTeamApi.getTeamAndUser();
                console.log(res);
                const searchQueries = await AdminSearchApi.getAttachSearchItems({
                    queryCategory: 1
                });
                setFilterQueries(searchQueries[0]);
                setSortQueries(searchQueries[1]);
                searchTeams(res, searchQueries[0], searchQueries[1]);
            } catch (err) {
                if(err.status === 401) {
                    navigate('/admin/login');
                }
            }
        }

        const initialCsrfToken = async() => {
            await authApi.initialCsrfToken().then(() => {
                getTeams();
            })
        }

        initialCsrfToken();
    },[]);

    const onDragEnd = (result) => {
        const list = [...teams];

        if(!result.destination) {
            return;
        }

        if(result.type === "team") {
            teamReOrder(list, result.source.index, result.destination.index, result.type);
        } 
        else {
            memberReOrder(list, result.source.index, result.destination.index, result.source.droppableId, result.destination.droppableId);
        }
    }

    const teamReOrder = async (list, startIndex, endIndex) => {
        let temp = [...list];

        // state update
        const removed = temp.splice(startIndex, 1);
        temp.splice(endIndex, 0, removed[0]);

        dispatch(setTeam(temp));

        // api call
        const accessTeamReOrderApi = async () => {
            try {
                const res = await AdminTeamApi.reOrder({
                    teams: temp
                })
            } catch (err) {
                if(err.status === 401) {
                    navigate('/admin/login');
                }
            }
        }

        await authApi.initialCsrfToken().then(() => {
            accessTeamReOrderApi();
        })
    }

    const memberReOrder = async (list, startIndex, endIndex, startDroppableId, endDroppableId) => {
        // ???????????????teamId
        const startTeamId = Number(startDroppableId.split("r")[1]);

        // ????????????teamId
        const endTeamId = Number(endDroppableId.split("r")[1]);


        let temp = [...list];

        // ----- ?????????????????????????????? -----


        // ????????????????????????index?????????
        const startTeamIndex = temp.findIndex((e) => e.id === startTeamId);

        // ???????????????????????????????????????
        const startTeam = temp[startTeamIndex];

        // ????????????users??????????????????
        const startTeamUsers = [...startTeam.users];

        // ??????????????????????????????ID???order??????????????????????????????
        startTeamUsers[startIndex] = {...startTeamUsers[startIndex], team_id: endTeamId , order: endIndex}

        // ????????????????????????????????????????????????
        const removed = startTeamUsers.splice(startIndex, 1);

        // ?????????????????????????????????(?????????????????????????????????????????????users??????????????????????????????)
        temp[startTeamIndex] = {...temp[startTeamIndex], users: startTeamUsers}


        // ----- ?????????????????????????????? -----


        // ????????????????????????index?????????
        const endTeamIndex = temp.findIndex((e) => e.id === endTeamId);

        // ???????????????????????????????????????
        const endTeam= temp[endTeamIndex];

        // ????????????users??????????????????
        const endTeamUsers = [...endTeam.users];

        // ???????????????????????????????????????????????????
        endTeamUsers.splice(endIndex, 0, removed[0]);

        // endIndex???0??????????????????????????????
        if(endIndex === 0) {
            // 0???????????????????????????users??????????????????order???+1

            endTeamUsers.forEach((user, index) => {
                if(index !== 0) {;
                    endTeamUsers[index] = {...endTeamUsers[index], order: + 1}
                }
            })
        } else {
            // 0?????????????????????endIndex???index??????????????????????????????????????????order???+1
            endTeamUsers.forEach((user, index) => {
                if(endIndex < index) {
                    endTeamUsers[index] = {...endTeamUsers[index], order: index + 1}
                }
            })
        }

        // ?????????????????????????????????(?????????????????????????????????????????????users??????????????????????????????)
        temp[endTeamIndex] = {...temp[endTeamIndex], users: endTeamUsers}

        // ??????????????????dispatch
        dispatch(setTeam(temp));


        // ----- api call ------

        const accessReplaceUserApi = async () => {
            try {
                const res = await AdminTeamApi.replaceMember({
                    users: temp,
                    teamId: endTeamId,
                });
            } catch (err) {
                if(err.status === 401) {
                    navigate('/admin/login');
                }
            }
        }

        await authApi.initialCsrfToken().then(() => {
            accessReplaceUserApi();
        })
    }

    const searchTeams = (res, filterQueries, sortQueries, searchWord) => {
        let temp;

        if(!res) {
            // ?????????????????????????????????
            temp = [...teams];
        } else {
            // ????????????????????????
            temp = res;
        }

        // ?????????????????????
        temp = teamSearch(temp, searchWord, filterQueries, sortQueries, searchWord);

        dispatch(setTeam(temp));
    }
    
    const openCreateMenu = (e) => {
        setTeamCreateAnchorEl(e.currentTarget);
    }

    const closeCreateMenu = () => {
        setTeamCreateAnchorEl(null);
    }

    return (
        <>
            <Box sx={{ padding: "20px", backgroundColor: "#fff", display: "flex", justifyContent: "space-between" }}>
                <Typography fontSize="1.4rem" fontWeight="800">Member</Typography>
            </Box>
            <Box sx={{ 
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0 12px 0",
                    boxShadow: "rgb(233 233 240) 0px -1px 0px inset",
                    margin: "0 20px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <InputBase
                        placeholder='??????????????????...'
                        sx={{
                            margin: "0 5px",
                            padding: 0
                        }}
                    />
                    <Button
                        color='gray'
                    >
                        <BiSearchAlt size="1.2rem" />
                    </Button>
                    <Button 
                        sx={{
                            margin: "0 5px"
                        }}
                        color="gray"
                    >
                        <Typography
                            fontWeight="600"
                            fontSize="0.8rem"
                            color={filterQueries.length !== 0 ? "rgb(35, 131, 226)" : "rgba(55, 53, 47, 0.65)"}
                        >
                            ???????????????
                        </Typography>
                    </Button>
                    <Button 
                        sx={{
                            margin: "0 5px"
                        }}
                        color="gray"
                    >
                        <Typography
                            fontWeight="600"
                            fontSize="0.8rem"
                            color={sortQueries.length !== 0 ? "rgb(35, 131, 226)" : "rgba(55, 53, 47, 0.65)"}
                        >
                            ????????????
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Button
                        variant='contained'
                        onClick={openCreateMenu}
                    >
                        <Typography
                            fontWeight="800"
                            fontSize="0.8rem"
                        >
                            ??????
                        </Typography>
                    </Button>
                    <TeamCreateMenu 
                        anchorEl={teamCreateAnchorEl} 
                        open={TeamCreateOpen}
                        onClose={closeCreateMenu}
                    />
                    <Button
                        color='gray'
                        sx={{
                            marginLeft: "5px",
                            minWidth: "30px"
                        }}
                    >
                        <BiDotsHorizontal size="1.4rem" />
                    </Button>
                </Box>
            </Box>
            <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "20px",
                    color: "rgba(55, 53, 47, 0.65)"
                }}
            >
                {sortQueries.map((item, index) => {
                    return (
                        <>
                            <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    margin: "0 5px",
                                    padding: "3px 8px",
                                    border: "1px solid #eee",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(35, 131, 226, 0.35)",
                                    color: "rgb(35, 131, 226);"
                                }}
                                key={item.id}
                            >
                                <Typography fontSize="0.8rem" fontWeight="600">{item.name}</Typography>
                                <BiChevronDown />
                            </Box>
                        </>
                    )
                })}
                {filterQueries.map((item, index) => {
                    return (
                        <>
                            <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    margin: "0 5px",
                                    padding: "3px 8px",
                                    border: "1px solid #eee",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(55, 53, 47, 0.16)",
                                }}
                                key={item.id}
                            >
                                <Typography fontSize="0.8rem" fontWeight="600">{item.name}</Typography>
                                <BiChevronDown />
                            </Box>
                        </>
                    )
                })}
                <Box sx={{
                        margin: "0 5px"
                    }}
                >
                    <Typography fontSize="0.9rem" fontWeight="400">????????????????????????</Typography>
                </Box>
            </Box>
            <Box sx={{ display: "flex", padding: "0 20px" }}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="all-column" direction='horizontal' type='team'>
                        {(provided, snapshot) => (
                            <Box
                                {...provided.droppableProps}    
                                ref={provided.innerRef}
                                sx={{ display: "flex" }}
                            >
                                {teams.map((team, index) => {
                                    return (
                                        <>
                                        <TeamDraggable index={index} team={team} />
                                        </>
                                    )
                                })}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
            </Box>
        </>
    )
}

export default Member