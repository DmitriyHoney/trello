import React from "react";
import Task from "./Task";
import styled from "styled-components";
import AddButton from "./AddButton";
import {Draggable} from "react-beautiful-dnd";

const CardStyle = styled.div`
   
`;
const ColumnTitleStyle = styled.h3`
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 8px;
`;

const ColumnCard = props => {
    let {id, title, tasks} = props;
    return(
        <CardStyle {...props} ref={props.innerRef}>
            <ColumnTitleStyle>{title}</ColumnTitleStyle>
            <AddButton 
                list="false" 
                addNewCard={props.addNewCard} 
                columnId={id}
            />
            {tasks.map((taskData, index) => (
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
            ))}
            
        </CardStyle>
    )
};

export default ColumnCard;
