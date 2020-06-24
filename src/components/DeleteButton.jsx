import React from "react"
import styled from "styled-components";

const DeleteButtonStyle = styled.div`
    margin-bottom: 5px;
    color: grey;
    cursor: pointer;
    &:hover {
        color: red;
    }
`;

const DeleteButton = props => {

    // let handleButton = () => {
    //     props.deleteColumn(props.columnId)
    // }

    let deleteEvent = () => {
        if (!props.whereDelete) props.deleteEvent(props.deletedElementId)
        props.deleteEvent(props.deletedElementId, props.whereDelete)
    }

   
    return(
        <DeleteButtonStyle onClick={deleteEvent}>
            <span>
                <i className="fa fa-trash-o"></i>
            </span>
        </DeleteButtonStyle>
    )
};

export default DeleteButton;