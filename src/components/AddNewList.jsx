import React from "react"
import TextareaAutosize from 'react-textarea-autosize';
import styled from "styled-components";

const ContainerStyle = styled.div`
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: inline-block;
    max-height: 100%;
    position: relative;
    white-space: normal;
    width: 272px;
    padding: 8px;
    margin: 0px 8px 0px 0px;
`;
const ButtonAddContainerStyle = styled.div`
    display: flex;
    align-items: center;
`;
const TextareaContainerStyle = styled.div`
    & textarea {
        background-color: #fff;
        border-radius: 3px;
        border: none;
        outline: none;
        margin-bottom: 8px;
        width: 100%;
        min-height: 20px;
        text-decoration: none;
        padding: 8px;
        resize: none;
        display: block;
        &:hover, &:active, &:focus {
            border: none;
            outline: none;
        }
    }
`;
const AddCardBtnStyle  = styled.button`
    background-color: #5aac44;
    box-shadow: none;
    border: none;
    color: #fff;
    font-size: 15px;
    cursor: pointer;
    font-weight: 400;
    line-height: 20px;
    margin: 0px 4px 0 0;
    padding: 6px 12px;
    text-align: center;
    border-radius: 3px;
    &:hover {
        background-color: #61bd4f;
    }
    &:hover, &:active, &:focus {
        border: none;
        outline: none;
    }
    &:active {
        background-color: #49852e;
    }
`;
const CloseCardBtnStyle  = styled.span`
    transform: rotate(45deg);
    font-size: 37px;
    display: inline-block;
    line-height: 0px;
    width: 28px;
    height: 28px;
    text-align: center;
    padding-top: 8px;
    cursor: pointer;
    color: #6b778c;
    user-select: none;
    &:hover {
        color: #172b4d;
    }
`;


class AddNewList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textareaValue: "",
        }
    }
    handleCloseBtn = () => {
        this.props.onClose();
        this.setState({textareaValue: ""})
    }

    handleAddButton = () => {
        this.props.onAdd(this.state.textareaValue);
        this.setState({textareaValue: ""});
    }

    handleTextarea = (e) => {
        this.setState({textareaValue: e.target.value})
    }

    render() {
        return (
            <ContainerStyle>
                <TextareaContainerStyle>
                    <TextareaAutosize 
                        placeholder={"Enter list title..."} 
                        value={this.state.textareaValue}
                        onChange={this.handleTextarea}
                    />
                </TextareaContainerStyle>   
                <ButtonAddContainerStyle>
                    <AddCardBtnStyle onClick={this.handleAddButton}>Add List</AddCardBtnStyle>
                    <CloseCardBtnStyle onClick={this.handleCloseBtn}>+</CloseCardBtnStyle>
                </ButtonAddContainerStyle>
                
            </ContainerStyle>
        )
    }
}

export default AddNewList;