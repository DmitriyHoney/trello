import React, { useState } from "react";
import styled from "styled-components";

const ColumnTitleStyle = styled.h3`
    font-size: 14px;
    line-height: 20px;
    font-weight: 600;
    margin-bottom: 8px;
    cursor: pointer;
`;

const ColumnTitle = React.memo(props => {
    const [title, setTitle] = useState(props.title);
    const [editMode, setEditMode] = useState(false);

    let handleEditMode = () => {
        setEditMode(true);
    }

    let handleInput = (e) => {
        setTitle(e.target.value);
    }

    let changeTitle = () => {
        setEditMode(false);
        props.changeColumnTitle(props.columnId, title);
    }

    return(
        <ColumnTitleStyle>
            {editMode
                ? <input value={title} onChange={handleInput} onBlur={changeTitle}/>
                : <span onClick={handleEditMode} >{title}</span>
            }
        </ColumnTitleStyle>
    )
});

export default ColumnTitle;

