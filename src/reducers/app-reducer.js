const TEST              = "TEST";
const store = require('store');

let initialState = {};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

//Action Creator
export const addNewCardAC = () => ({type: TEST});

//ThunkCallback
export const initializeThunkCallback = () => async (dispatch, getState) => {
    let result = store.get("trello"); //Пользователь первый раз зашёл или нет
    if (result) { //Если пользователь уже был, тогда получаем из localStore его данные

    } else {

    }
    console.log(getState());
}
export default appReducer;