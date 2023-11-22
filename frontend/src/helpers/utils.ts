export const getItemFromStore = (key:string, defaultValue:any, store = localStorage) => {
    try {
        return store.getItem(key) === null
            ? defaultValue
            : JSON.parse(store.getItem(key) || "{}");
    } catch {
        return store.getItem(key) || defaultValue;
    }
}

export const setItemToStore = (key:string, payload:any, store = localStorage) =>
    store.setItem(key, payload);


export const setObjectItemToStore = (key:string, payload:any,objectName:any, store = localStorage) => {
    console.log(key, payload, objectName)
    store.setItem(key, JSON.stringify(objectName));
}