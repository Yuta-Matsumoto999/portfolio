import React, { useMemo, useState, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Avatar, Box, Button, Typography } from '@mui/material'
import { BiDotsVertical } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'
import MemberDraggable from './MemberDraggable';
import TeamEditMenu from '../menu/TeamEditMenu';

const TeamDraggable = (props) => {
    const [hover, setHover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [members, setMembers] = useState();
    
    const handleHover = () => {
        setHover(true);
    }

    const handleMouseLeave = () => {
        setHover(false);
    }

    const openEditMenu = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const closeEditMenu = () => {
        setAnchorEl(null);
        setHover(false);
    }

    return (
        <Draggable key={props.team.id} draggableId={"column" + props.team.id} index={props.index}>
            {(provided, snapshot) => (
                <Box
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    key={props.team.id}
                >
                    <Box 
                        sx={{
                            margin: "0 10px", 
                            minWidth: "300px", 
                            backgroundColor: "#fff", 
                            padding: "12px", 
                            borderRadius: "10px" 
                        }}
                    >
                        <Box
                            sx={{ 
                                display: "flex", 
                                justifyContent: "space-between", 
                                alignItems: "center",
                                padding: "5px 0 20px 0",
                                borderBottom: "1px solid #eee"
                            }}
                            onMouseEnter={handleHover}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Box
                                {...provided.dragHandleProps}
                                sx={{ 
                                    display: "flex", 
                                    alignItems: "center" 
                                }}
                            >
                                <Typography
                                    sx={{ 
                                        padding: "3px 12px", 
                                        backgroundColor: props.team.color_code, 
                                        borderRadius: "3px", 
                                        marginRight: "10px" 
                                    }}
                                >
                                    {props.team.name}
                                </Typography>
                                <Typography 
                                    sx={{
                                        color: "rgba(55, 53, 47, 0.5)"
                                    }}
                                >
                                    {props.team.users.length}
                                </Typography>
                            </Box>
                            <Box 
                                sx={{ 
                                    display: hover ? "flex" : "none", 
                                    alignItems: "center" 
                                }}
                            >
                                <Button 
                                    sx={{ 
                                        minWidth: "30px" 
                                    }} 
                                    color='gray'
                                    onClick={openEditMenu}
                                >
                                    <BiDotsVertical />
                                </Button>
                                <TeamEditMenu anchorEl={anchorEl} open={open} onClose={closeEditMenu}/>
                            </Box>
                        </Box>
                        <Droppable droppableId={"member" + props.team.id} type="member" index={props.index}>
                            {(provided, snapshot) => (
                                <Box
                                    {...provided.droppableProps}    
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    key={props.team.id}
                                >
                                    {props.team.users &&
                                        props.team.users.map((user, index) => {
                                            return (
                                                props.team.id === user.team_id &&
                                                <MemberDraggable user={user} index={index} />
                                            )
                                        })
                                    }
                                    {provided.placeholder}
                                </Box>
                            )}
                        </Droppable>
                    </Box>
                </Box>
            )}
        </Draggable> 
    )
}

export default TeamDraggable