const ADD_NEW_CARD              = "ADD_NEW_CARD";
const ADD_NEW_COLUMN            = "ADD_NEW_COLUMN";
const DRAG_TASK_CURRENT_COLUMN  = "DRAG_TASK_CURRENT_COLUMN";
const DRAG_TASK_OTHER_COLUMN    = "DRAG_TASK_OTHER_COLUMN";
const DRAG_COLUMN               = "DRAG_COLUMN";

let initialState = {
    boardId: 1,
    taskIdPrefixx: `task-`,
    listIdPreffix: `column-`,
    lastListIndexId: 3,
    lastTaskIndexId: 4,
    tasks: {
        'task-1': {id: 'task-1', title: "Помыть кота"},
        'task-2': {id: 'task-2', title: "Помыть посуду"},
        'task-3': {id: 'task-3', title: "Написать приложение"}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'to do',
            taskList: ['task-1', 'task-2']
        },
        'column-2': {
            id: 'column-2',
            title: 'must doing',
            taskList: ['task-3']
        },
    },
    columnOrder: ['column-1', 'column-2'],
};

const listCardReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_NEW_CARD: {
            let newTaskId = state.taskIdPrefixx + state.lastTaskIndexId;
            let newTask = {
                id: newTaskId, 
                title: action.cardText
            };
            let columnNeedAddTask = state.columns[action.columnId];
            columnNeedAddTask.taskList.push(newTaskId);
            return {
                ...state,
                lastTaskIndexId: state.lastTaskIndexId += 1,
                tasks: {
                    ...state.tasks,
                    [newTaskId]: newTask
                },
                columns: {
                    ...state.columns,
                    [action.columnId]: columnNeedAddTask
                }
            }
        }
        case ADD_NEW_COLUMN:
            let currentIdList = state.listIdPreffix + state.lastListIndexId;
            let newColumn = {
                id: currentIdList,
                title: action.listTitle,
                taskList: []
            };
            let reorderColumnOrder = [...state.columnOrder, currentIdList];
            return {
                ...state,
                lastListIndexId: state.lastListIndexId + 1,
                columns: {
                    ...state.columns,
                    [currentIdList]: newColumn
                },
                columnOrder: reorderColumnOrder
            }
        case DRAG_TASK_CURRENT_COLUMN:
            let column = state.columns[action.currentColumn];
            let changeTaskList = column.taskList;
            let taskForDrag = changeTaskList.splice(action.currentTaskindex, 1);
            changeTaskList.splice(action.destinationTaskIndex, 0, taskForDrag);
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.currentColumn]: {
                        ...state.columns[action.currentColumn],
                        taskList: changeTaskList
                    }
                }
            }
        case DRAG_COLUMN:
            let columnOrder = state.columnOrder;
            let cutColumn = columnOrder.splice(action.sourceIndex, 1);
            columnOrder.splice(action.destinationIndex, 0, cutColumn[0]);
            return {
                ...state,
                columnOrder: columnOrder
            }
        case DRAG_TASK_OTHER_COLUMN:
            let sourceColumn = state.columns[action.currentColumn]; //колонка в которой берем
            let destinationColumn = state.columns[action.destinationColumn]; //колонка куда отдаём

            let sourceColumnTaskList = sourceColumn.taskList; //порядок колонок откуда взяли
            let destinationColumnTaskList = destinationColumn.taskList; //порядок колонок куда отдали

            let draggableElem = sourceColumnTaskList.splice(action.currentTaskindex, 1); //task который забрали
            destinationColumnTaskList.splice(action.destinationTaskIndex, 0, draggableElem[0]);
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.currentColumn]: {
                        ...state.columns[action.currentColumn],
                        taskList: [...sourceColumnTaskList]
                    },
                    [action.destinationColumn]: {
                        ...state.columns[action.destinationColumn],
                        taskList: [...destinationColumnTaskList]
                    },
                }
            }

        default:
            return state;
    }
};

//Action Creator
export const addNewCardAC = (cardText, columnId) => ({type: ADD_NEW_CARD, cardText, columnId});
export const addNewColumnAC = (listTitle) => ({type: ADD_NEW_COLUMN, listTitle});
export const dragColumnAC = (sourceIndex, destinationIndex) => ({type: DRAG_COLUMN, sourceIndex, destinationIndex});
export const dragTaskInCurrentColumnAC = (currentColumn, currentTaskindex, destinationTaskIndex) => ({
    type: DRAG_TASK_CURRENT_COLUMN, 
    currentColumn, 
    currentTaskindex, 
    destinationTaskIndex
});
export const dragTaskInOtherColumnAC = (currentColumn, destinationColumn, currentTaskindex, destinationTaskIndex) => ({
    type: DRAG_TASK_OTHER_COLUMN, 
    currentColumn, 
    destinationColumn, 
    currentTaskindex, 
    destinationTaskIndex
});

//ThunkCallback
export const addNewCardThunkCallback = (cardText, columnId) => async dispatch => {
    dispatch(addNewCardAC(cardText, columnId));
}
export const addNewListThunkCallback = listTitle => async dispatch => {
    dispatch(addNewColumnAC(listTitle));
}
export const dragTaskInCurrentColumnThunkCallback = (currentColumn, currentTaskindex, destinationTaskIndex) => async dispatch => {
    dispatch(dragTaskInCurrentColumnAC(currentColumn, currentTaskindex, destinationTaskIndex));
}
export const dragTaskInOtherColumnThunkCallback = (currentColumn, destinationColumn, currentTaskindex, destinationTaskIndex) => async dispatch => {
    dispatch(dragTaskInOtherColumnAC(currentColumn, destinationColumn, currentTaskindex, destinationTaskIndex));
}
export const dragColumnThunkCallback = (sourceIndex, destinationIndex) => async dispatch => {
    dispatch(dragColumnAC(sourceIndex, destinationIndex));
}

export default listCardReducer;