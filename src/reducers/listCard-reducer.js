import {listCardApi} from "../api/api";

const ADD_NEW_CARD              = "ADD_NEW_CARD";
const ADD_NEW_COLUMN            = "ADD_NEW_COLUMN";
const DRAG_TASK_CURRENT_COLUMN  = "DRAG_TASK_CURRENT_COLUMN";
const DRAG_TASK_OTHER_COLUMN    = "DRAG_TASK_OTHER_COLUMN";
const DRAG_COLUMN               = "DRAG_COLUMN";
const SET_DEFAULT_STATE         = "SET_DEFAULT_STATE";
const SET_LOCAL_STORAGE_STATE   = "SET_LOCAL_STORAGE_STATE";
const CHANGE_COLUMN_TITLE       = "CHANGE_COLUMN_TITLE";
const DELETE_COLUMN             = "DELETE_COLUMN";
const CHANGE_TASK_TITLE         = "CHANGE_TASK_TITLE";




let defaultState = {
    boardId: 1,
    taskIdPrefixx: `task-`,
    listIdPreffix: `column-`,
    lastListIndexId: 1,
    lastTaskIndexId: 1,
    tasks: {},
    columns: {},
    columnOrder: [],
}

// let initialState = {
//     boardId: 1,
//     taskIdPrefixx: `task-`,
//     listIdPreffix: `column-`,
//     lastListIndexId: 3,
//     lastTaskIndexId: 4,
//     tasks: {
//         'task-1': {id: 'task-1', title: "Помыть кота"},
//         'task-2': {id: 'task-2', title: "Помыть посуду"},
//         'task-3': {id: 'task-3', title: "Написать приложение"}
//     },
//     columns: {
//         'column-1': {
//             id: 'column-1',
//             title: 'to do',
//             taskList: ['task-1', 'task-2']
//         },
//         'column-2': {
//             id: 'column-2',
//             title: 'must doing',
//             taskList: ['task-3']
//         },
//     },
//     columnOrder: ['column-1', 'column-2'],
// };

const listCardReducer = (state = defaultState, action) => {
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
        case DELETE_COLUMN:
            return {
                ...state,
                columnOrder: state.columnOrder.filter(id => id !== action.columnId)
            }
        case SET_DEFAULT_STATE:
            return {
                ...defaultState
            }
        case CHANGE_COLUMN_TITLE:
            return {
                ...state,
                columns: {
                    ...state.columns,
                    [action.columnId]: {
                        ...state.columns[action.columnId],
                        title: action.title
                    }
                }
            }
        case SET_LOCAL_STORAGE_STATE:
            return {
                ...action.dataFromLocalStorage
            }
        case CHANGE_TASK_TITLE:
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [action.taskId]: {
                        ...state.tasks[action.taskId],
                        title: action.title
                    }
                }

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
export const setDefaultStateAC = () => ({type: SET_DEFAULT_STATE});
export const setListCardDataFromLocalStorageAC = (dataFromLocalStorage) => ({type: SET_LOCAL_STORAGE_STATE, dataFromLocalStorage});
export const changeColumnTileAC = (columnId, title) => ({type: CHANGE_COLUMN_TITLE, columnId, title});
export const deleteColumnAC = (columnId) => ({type: DELETE_COLUMN, columnId});
export const changeTaskTitleAC = (taskId, title) => ({type: CHANGE_TASK_TITLE, taskId, title});

//ThunkCallback
export const getListCardDataFromLocalStorage = () => async dispatch => {

    let res = listCardApi.getDataFromLocalStorage(); //Пользователь получает карточку из localStorage
    if (res) { //Если есть 
        dispatch(setListCardDataFromLocalStorageAC(res))
    } else { //Если нет
        dispatch(setDefaultStateAC());
    };
}
export const addNewCardThunkCallback = (cardText, columnId) => async (dispatch, getState) => {
    dispatch(addNewCardAC(cardText, columnId));
    listCardApi.updateDataFromLocalStorage(getState().listCardPage);
}
export const deleteColumnThunkCallback = columnId => async (dispatch, getState) => {
    dispatch(deleteColumnAC(columnId));
    listCardApi.updateDataFromLocalStorage(getState().listCardPage);
}
export const addNewListThunkCallback = listTitle => async (dispatch, getState) => {
    dispatch(addNewColumnAC(listTitle));
    listCardApi.updateDataFromLocalStorage(getState().listCardPage);
}
export const dragTaskInCurrentColumnThunkCallback = (currentColumn, currentTaskindex, destinationTaskIndex) => async (dispatch, getState) => {
    dispatch(dragTaskInCurrentColumnAC(currentColumn, currentTaskindex, destinationTaskIndex));
    listCardApi.updateDataFromLocalStorage(getState().listCardPage);
}
export const dragTaskInOtherColumnThunkCallback = (currentColumn, destinationColumn, currentTaskindex, destinationTaskIndex) => async (dispatch, getState) => {
    dispatch(dragTaskInOtherColumnAC(currentColumn, destinationColumn, currentTaskindex, destinationTaskIndex));
    listCardApi.updateDataFromLocalStorage(getState().listCardPage);
}
export const dragColumnThunkCallback = (sourceIndex, destinationIndex) => async (dispatch, getState) => {
    dispatch(dragColumnAC(sourceIndex, destinationIndex));
    listCardApi.updateDataFromLocalStorage(getState().listCardPage);
}

export const changeColumnTitleThunkCallback = (columnId, newTitle) => async (dispatch, getState) => {
    dispatch(changeColumnTileAC(columnId, newTitle));
    listCardApi.updateDataFromLocalStorage(getState().listCardPage);
}


export const changeTaskTitleThunkCallback = (taskId, title) => async (dispatch, getState) => {
    dispatch(changeTaskTitleAC(taskId, title));
    listCardApi.updateDataFromLocalStorage(getState().listCardPage);
}





export default listCardReducer;