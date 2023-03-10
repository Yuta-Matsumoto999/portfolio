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
        // 移動対象のteamId
        const startTeamId = Number(startDroppableId.split("r")[1]);

        // 移動先のteamId
        const endTeamId = Number(endDroppableId.split("r")[1]);


        let temp = [...list];

        // ----- ここから移動元の処理 -----


        // 移動元のチームのindexを取得
        const startTeamIndex = temp.findIndex((e) => e.id === startTeamId);

        // 移動元のチームの配列を取得
        const startTeam = temp[startTeamIndex];

        // 移動元のusersの配列を取得
        const startTeamUsers = [...startTeam.users];

        // 移動する要素のチームIDとorderを移動先のものに更新
        startTeamUsers[startIndex] = {...startTeamUsers[startIndex], team_id: endTeamId , order: endIndex}

        // 移動元から移動する要素を削除する
        const removed = startTeamUsers.splice(startIndex, 1);

        // 移動元の配列を更新する(チームの配列を指定し、その中のusersプロパティを更新する)
        temp[startTeamIndex] = {...temp[startTeamIndex], users: startTeamUsers}


        // ----- ここから移動先の処理 -----


        // 移動先のチームのindexを取得
        const endTeamIndex = temp.findIndex((e) => e.id === endTeamId);

        // 移動先のチームの配列を取得
        const endTeam= temp[endTeamIndex];

        // 移動先のusersの配列を取得
        const endTeamUsers = [...endTeam.users];

        // 移動させる要素を移動先の配列に追加
        endTeamUsers.splice(endIndex, 0, removed[0]);

        // endIndexが0かそれ以外かを調べる
        if(endIndex === 0) {
            // 0だったら、移動先のusers配列の全てのorderを+1

            endTeamUsers.forEach((user, index) => {
                if(index !== 0) {;
                    endTeamUsers[index] = {...endTeamUsers[index], order: + 1}
                }
            })
        } else {
            // 0でない場合は、endIndexとindexが等しいレコード以降の全てのorderを+1
            endTeamUsers.forEach((user, index) => {
                if(endIndex < index) {
                    endTeamUsers[index] = {...endTeamUsers[index], order: index + 1}
                }
            })
        }

        // 移動先の配列を更新する(チームの配列を指定し、その中のusersプロパティを更新する)
        temp[endTeamIndex] = {...temp[endTeamIndex], users: endTeamUsers}

        // 全体の配列をdispatch
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
            // 検索項目が更新された時
            temp = [...teams];
        } else {
            // ページ読み込み時
            temp = res;
        }

        // 実際の検索処理
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
                        placeholder='入力して検索...'
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
                            フィルター
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
                            並び替え
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
                            新規
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
                    <Typography fontSize="0.9rem" fontWeight="400">➕検索項目を追加</Typography>
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