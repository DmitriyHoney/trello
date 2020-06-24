import React from 'react';
import Header from "./Header";
import styled from "styled-components";
import ColumnCard from "./ColumnCard";
import AddButton from './AddButton';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  addNewCardThunkCallback, addNewListThunkCallback, dragTaskInCurrentColumnThunkCallback, 
  dragTaskInOtherColumnThunkCallback, dragColumnThunkCallback, getListCardDataFromLocalStorage,
  changeColumnTitleThunkCallback, deleteColumnThunkCallback, changeTaskTitleThunkCallback,
  deleteTaskIdThunkCallback
} from "../reducers/listCard-reducer";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";



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
  height: 80%; 
  min-height: ${props => !props.isDraggingOver && "75px"};
  display: flex;
  align-items: flex-start;
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

  componentDidMount() {
    this.props.getListCardDataFromLocalStorage();
  }

  addNewCard = (cardText, columnId) => {
    this.props.addNewCardThunkCallback(cardText, columnId);
  }

  addNewList = (listTitle) => {
    this.props.addNewListThunkCallback(listTitle);
  }

  onDragEnd = result => {
    let {destination, source, draggableId, type} = result;


    if (type === "COLUMN") { //Передвигаем колонку
      if (destination === null) return;
      let sourceIndex = source.index;
      let destinationIndex = destination.index;
      this.props.dragColumnThunkCallback(sourceIndex, destinationIndex);
      return;
    }

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

  changeTaskTitle = (taskId, title) => {
    this.props.changeTaskTitleThunkCallback(taskId, title);
  }

  deleteColumn = columnId => {
    console.log(columnId);
    this.props.deleteColumnThunkCallback(columnId);
  }

  changeColumnTitle = (columnId, newTitle) => {
    this.props.changeColumnTitleThunkCallback(columnId, newTitle);
  }

  deleteTask = (taskId, whereDelete) => {
    this.props.deleteTaskIdThunkCallback(taskId, whereDelete);
  }



  render() {
    let {listCardPage} = this.props;
    return (
      <div>
          <Header />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId={"all-columns"} direction={"horizontal"} type={"COLUMN"}>
              {(provided, snapshot) => {
                return(
                  <ColumnCardStyle 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {listCardPage.columnOrder.map((column, index) => {
                      let oneColumn = listCardPage.columns[column];
                      let tasks = oneColumn.taskList.map(task => listCardPage.tasks[task]);
                      return(
                        <Draggable draggableId={oneColumn.id} index={index} key={oneColumn.id}>
                          {(provided, snapshot) => {
                            return(
                                <ColumnCardContainerStyle
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <ColumnCard
                                    key={oneColumn.id}
                                    index={index}
                                    addNewCard={this.addNewCard}
                                    changeColumnTitle={this.changeColumnTitle}
                                    deleteColumn={this.deleteColumn}
                                    changeTaskTitle={this.changeTaskTitle}
                                    deleteTask={this.deleteTask}
                                    tasks={tasks} //Таски для этой карточки
                                    {...oneColumn} //Данные для одной колонки
                                  />
                                  
                                </ColumnCardContainerStyle>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                    
                    {provided.placeholder}
                    <AddButton list="true" addNewList={this.addNewList}/>
                  </ColumnCardStyle>
                )
              }}
            </Droppable>
          </DragDropContext>
          
      </div>
    );
  }
  
}


export default compose(
  connect(mapStateToProps, {
    addNewCardThunkCallback, addNewListThunkCallback, dragTaskInCurrentColumnThunkCallback, 
    dragTaskInOtherColumnThunkCallback, dragColumnThunkCallback, getListCardDataFromLocalStorage,
    changeColumnTitleThunkCallback, deleteColumnThunkCallback, changeTaskTitleThunkCallback,
    deleteTaskIdThunkCallback
  })
)(ListCardPage);
