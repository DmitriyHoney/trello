const store = require('store');

// window.local = store;
// window.clear = store.clearAll();

export const listCardApi = {
    getDataFromLocalStorage() {
        return store.get("listCardPage")
    },  
    updateDataFromLocalStorage(listCardState) {
        store.set("listCardPage", listCardState);
    }
}