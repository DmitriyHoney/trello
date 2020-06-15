import React from "react"
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
`;

const Task = props => {
    return(
        <TaskContainerStyle {...props} ref={props.innerRef}>
            {props.title}
        </TaskContainerStyle>
    )
};

export default Task;