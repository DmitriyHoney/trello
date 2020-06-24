import React, { useState, useEffect } from "react"
import TextareaAutosize from 'react-textarea-autosize';
import DeleteButton from "./DeleteButton";
import styled from "styled-components";

const TaskContainerStyle = styled.div`
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    text-decoration: none;
    padding: 8px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    transition: .2s all ease;
    & div {
        opacity: 0;
        transition: .2s all ease;
    }
    &:hover div {
        transition: .2s all ease;
        opacity: 1;
        
    }
`;

const TaskEditStyle = styled.div`
    & textarea {
        width: 100%;
        outline: none;
        border: none;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0 1px 0 rgba(9,30,66,.25);
        margin-bottom: 8px;
        max-width: 300px;
        min-height: 20px;
        padding: 8px;
        resize: none;   
    }
`;

const EditButtonStyle = styled.div`
    cursor: pointer;
    color: grey;
    padding: 2px 5px;
    border-radius: 3px;
    margin-right: 5px;
    &:hover {
        background-color: rgba(0, 0, 0, .055);
    }
`;
const TaskButtonStyle = styled.div`
    display: flex;
    align-items: center;
`;

const Task = props => {
    let startTitle = props.title; //Изначальное имя таска
    const [editTask, setEditTask] = useState(false);
    const [title, setTitle] = useState(props.title);
    useEffect(() => {
        setTitle(props.title);
    }, [props.title]);

    let handleEditTaskBtn = () => {
        setEditTask(true);
    };

    let offEditMode = () => {
        setEditTask(false);
        
        if (title !== startTitle) { //Если, пользователь всё оставил без изменений не делаем запрос на изменение
            props.changeTaskTitle(props.id, title);
        }
       
    }

    let handleEditTitle = e => {
        setTitle(e.target.value);
    }

    if (editTask) {
        return(
            <TaskEditStyle>
                <TextareaAutosize 
                    {...props} 
                    ref={props.innerRef} 
                    onBlur={offEditMode}
                    value={title}
                    onChange={handleEditTitle}
                    autoFocus
                />
            </TaskEditStyle>
        )
    }
    return(
        <TaskContainerStyle {...props} ref={props.innerRef} >
            {title}   
            <TaskButtonStyle>
                <EditButtonStyle onClick={handleEditTaskBtn}>
                    <i className="fa fa-pencil"></i>
                </EditButtonStyle>
                <DeleteButton 
                    deletedElementId={props.id}
                    whereDelete={props.columnId}
                    deleteEvent={props.deleteTask}
                />
            </TaskButtonStyle>
        </TaskContainerStyle>
    )
};

export default Task;