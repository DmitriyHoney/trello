import React from "react";
import Task from "./Task";
import styled from "styled-components";
import AddButton from "./AddButton";
import {Draggable, Droppable} from "react-beautiful-dnd";

const CardStyle = styled.div`
   padding-top: 28px;
`;
const ColumnTitleStyle = styled.h3`
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    position: absolute;
    top: 8px;
`;

const ColumnCard = props => {
    let {id, title, tasks} = props;
    return(
        <Droppable droppableId={id}>
            {(provided, snapshot) => {
                return(
                    <CardStyle 
                        ref={provided.innerRef} 
                        {...provided.droppableProps} 
                        isDraggingOver={snapshot.isDraggingOver}
                    >
                        <ColumnTitleStyle>{title}</ColumnTitleStyle>
                        
                        {tasks.map((taskData, index) => {
                            return(
                                <Draggable draggableId={taskData.id} index={index} key={taskData.id}>
                                    {(provided, snapshot) => (
                                        <Task 
                                            innerRef={provided.innerRef} 
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            {...taskData} 
                                            key={taskData.id}
                                            id={taskData.id}
                                            index={index}
                                        />
                                    )}
                                </Draggable>
                            )
                        })}
                        <AddButton 
                            list="false" 
                            addNewCard={props.addNewCard} 
                            columnId={id}
                        />
                        {provided.placeholder}
                    </CardStyle>
                )
            }}
            
        </Droppable>
    )
};

export default ColumnCard;
