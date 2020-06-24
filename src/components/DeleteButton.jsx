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

    let handleButton = () => {
        props.deleteColumn(props.columnId)
    }
   
    return(
        <DeleteButtonStyle onClick={handleButton}>
            <span>
                <i className="fa fa-trash-o"></i>
            </span>
        </DeleteButtonStyle>
    )
};

export default DeleteButton;