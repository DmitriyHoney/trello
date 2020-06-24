import React from "react"
import styled from "styled-components";

const EditButtonStyle = styled.div`

`;

const EditButton = props => {
    return(
        <EditButtonStyle>
            <span>
                <i className="fa fa-pencil"></i>
            </span>
        </EditButtonStyle>
    )
};

export default EditButton;