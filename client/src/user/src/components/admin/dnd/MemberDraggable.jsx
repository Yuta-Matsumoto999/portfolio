import React, { useState } from 'react'
import styled, { useTheme } from 'styled-components';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Avatar, Box, Button, ListItemButton, Typography } from '@mui/material'
import { BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux'

const UserBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 10px;
    box-shadow: rgb(15 15 15 / 10%) 0px 0px 0px 1px, rgb(15 15 15 / 10%) 0px 2px 4px;
    margin: 8px 0;
    border-radius: 8px;

    :hover {
        background-color: #eee;
        border-radius: 8px;
    }
`

const MemberDraggable = (props) => {
    const [hover, setHover] = useState(false);

    const handleOnHover = () => {
        setHover(true);
    }

    const handleLeaveHover = () => {
        setHover(false);
    }

    return (
        <Draggable key={props.user.id} draggableId={"member" + props.user.id} index={props.index}>
            {(provided, snapshot) => (
                <UserBox
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onMouseEnter={handleOnHover}
                    onMouseLeave={handleLeaveHover}
                >
                    <Box sx={{ display: "flex", alignItems: "center"}}>
                        <Avatar />
                        {props.user.positions.map((position, index) => {
                            return (
                                index === 0 &&
                                <Typography 
                                    sx={{ 
                                        padding: "2px", 
                                        backgroundColor: position.color_code, 
                                        borderRadius: "8px", 
                                        opacity: "0.7", 
                                        width: "30px", 
                                        textAlign: "center",
                                        margin: "10px"
                                    }} 
                                    fontSize="0.7rem" 
                                    fontWeight="400"
                                >
                                    {position.position_name}
                                </Typography>           
                            )   
                        })}        
                        <Typography>{props.user.name}</Typography>
                    </Box>
                    <Button sx={{ display: hover ? "flex" : "none", alignItems: "center", minWidth: "30px" }} color="gray">
                        <BiChevronRight color='black' size="1.2rem"/>
                    </Button>
                </UserBox>
            )}
        </Draggable>
    )
}

export default MemberDraggable