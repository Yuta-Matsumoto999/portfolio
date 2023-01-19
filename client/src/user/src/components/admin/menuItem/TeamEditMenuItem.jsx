import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TeamEditMenuItem = (props) => {
    return (
        <>
            {props.team.name}
        </>
    )
}

export default TeamEditMenuItem