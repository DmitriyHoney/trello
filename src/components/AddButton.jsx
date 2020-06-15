import React from "react"
import AddNewCard from "./AddNewCard";
import AddNewList from "./AddNewList";
import styled from "styled-components";

const ButtonContainerStyle = styled.div`
    background-color: ${props => (props.list === "true" ? "rgba(0, 0, 0, .3)" : "transparent")};
    max-height: 35px;
    width: ${props => (props.list === "true" ? "272px" : "100%")};
    border-radius: 3px;
    margin-bottom: 8px;
    color: ${props => (props.list === "true" ? "#fff" : "#5e6c84")};
    font-size: 14px;
    font-weight: 400;
    padding-left: 7px;
    padding-bottom: 5px;
    display: ${props => (props.list === "true" ? "inline-block" : "block")};
    cursor: pointer;
    transition: all linear .1s;
    &:hover {
        transition: all ease .1s;
        background-color: ${props => (props.list === "true" ? "rgba(0, 0, 0, .2)" : "#ccc")};
    }
`;
const IconStyle = styled.span`
    font-size: 22px;
    margin-right: 4px;
`;

class AddButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addMode: false,
        }
    }
    onAddMode = (e) => {
        this.setState({addMode: true});
    }
    handleClose = () => {
        this.setState({addMode: false});
    }


    handleAddCard = (cardText) => {
        this.props.addNewCard(cardText, this.props.columnId);
    }

    handleAddList = (listTitle) => {
        this.props.addNewList(listTitle);
    }

    render() {
        if (this.state.addMode) {
            if (this.props.list === "true") return <AddNewList onClose={this.handleClose} onAdd={this.handleAddList}/>
            else return <AddNewCard onAdd={this.handleAddCard} onClose={this.handleClose}/>
        }
        return(
            <ButtonContainerStyle list={this.props.list} onClick={this.onAddMode}>
                <IconStyle>+</IconStyle>
                <span>
                    {this.props.list 
                        ? "Add another card" 
                        : "Add another card"
                    }
                </span>
            </ButtonContainerStyle>
        )
        
    }
};

export default AddButton;