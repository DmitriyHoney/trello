import React from "react";
import Task from "./Task";
import styled from "styled-components";
import AddButton from "./AddButton";
import {Draggable, Droppable} from "react-beautiful-dnd";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ColumnTitle from "./ColumnTitle";

const CardStyle = styled.div`
   padding-top: 28px;
`;

const EditCardTitleStyle = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    top: 8px;
    justify-content: space-between;
    width: 93%;
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
                        <EditCardTitleStyle>
                            <ColumnTitle 
                                columnId={id}
                                title={title} 
                                changeColumnTitle={props.changeColumnTitle}
                            />
                            {/* <EditButton /> */}
                            <DeleteButton 
                                deletedElementId={id}
                                deleteEvent={props.deleteColumn}
                            />
                        </EditCardTitleStyle>
                        
                        
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
                                            columnId={id}
                                            index={index}
                                            changeTaskTitle={props.changeTaskTitle}
                                            deleteTask={props.deleteTask}
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
