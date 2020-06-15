import React from 'react';
import Header from "./Header";
import styled from "styled-components";
import ColumnCard from "./ColumnCard";
import AddButton from './AddButton';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {addNewCardThunkCallback, addNewListThunkCallback, dragTaskInCurrentColumnThunkCallback, dragTaskInOtherColumnThunkCallback} from "../reducers/listCard-reducer";
import {DragDropContext, Droppable} from "react-beautiful-dnd";


let ColumnCardStyle = styled.div`
  padding: 8px;
  user-select: none;
  white-space: nowrap;
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 8px;
  position: absolute;
  margin-top: 40px;
  height: 100%; 
  min-height: ${props => !props.isDraggingOver && "75px"};
`;
let ColumnCardContainerStyle = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  max-height: 100%;
  position: relative;
  white-space: normal;
  width: 272px;
  padding: 8px;
  margin: 0px 8px 0px 0px;
`;

let mapStateToProps = state => ({

});


class ListCardPage extends React.Component {
  constructor(props) {
    super(props)
  }

  addNewCard = (cardText, columnId) => {
    this.props.addNewCardThunkCallback(cardText, columnId);
  }

  addNewList = (listTitle) => {
    this.props.addNewListThunkCallback(listTitle);
  }

  onDragEnd = result => {
    let {destination, source, draggableId, type} = result;

    if ((!destination) || destination.index === source.index &&  //Если таск никуда не кинут или кинут на тоже место
        destination.droppableId === source.droppableId
        ) {
      return
    } 

    
    if(destination.droppableId === source.droppableId && //Вставляем задачу в другое место в этой же колонке
      destination.index !== source.index
    ) {
      let currentColumn = source.droppableId;
      let currentTaskindex = source.index;
      let destinationTaskIndex = destination.index;
      this.props.dragTaskInCurrentColumnThunkCallback(currentColumn, currentTaskindex, destinationTaskIndex);
    }

    if(destination.droppableId !== source.droppableId) {//Вставляем задачу в другую колонку
      let currentColumn = source.droppableId;
      let destinationColumn = destination.droppableId;
      let currentTaskindex = source.index;
      let destinationTaskIndex = destination.index;
      this.props.dragTaskInOtherColumnThunkCallback(currentColumn, destinationColumn, currentTaskindex, destinationTaskIndex);
    }

  }

  render() {
    let {listCardPage} = this.props;
    return (
      <div>
          <Header />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <ColumnCardStyle>
              {listCardPage.columnOrder.map((column, index) => {
                let oneColumn = listCardPage.columns[column];
                let tasks = oneColumn.taskList.map(task => listCardPage.tasks[task]);
                return(
                  <Droppable droppableId={oneColumn.id} index={index} key={oneColumn.id}>
                    {(provided, snapshot) => {
                      return(
                        <ColumnCardContainerStyle>
                          <ColumnCard
                            isDraggingOver={snapshot.isDraggingOver}
                            innerRef={provided.innerRef} 
                            {...provided.droppableProps}
                            key={oneColumn.id}
                            index={index}
                            addNewCard={this.addNewCard}
                            tasks={tasks} //Таски для этой карточки
                            {...oneColumn} //Данные для одной колонки
                          />
                          {provided.placeholder}
                        </ColumnCardContainerStyle>
                      )
                    }}
                  </Droppable>
                )
              })}
              <AddButton list="true" addNewList={this.addNewList}/>
            </ColumnCardStyle>
          </DragDropContext>
      </div>
    );
  }
  
}


export default compose(
  connect(mapStateToProps, {addNewCardThunkCallback, addNewListThunkCallback, dragTaskInCurrentColumnThunkCallback, dragTaskInOtherColumnThunkCallback})
)(ListCardPage);
