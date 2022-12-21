import { toast } from 'react-toastify';
import localStore from 'store2';

export const isValidArray = (arr) => {
    return arr && Array.isArray(arr) && arr.length > 0;
}

export const isValidObject = (obj, keys) => {
    if (isValidArray(keys)) {
        const newObjKeys = isValidObject(obj, []) ? Object.keys(obj) : [];

        if (!isValidArray(newObjKeys)) {
            return false;
        }

        let isValid = keys.length;
        keys.forEach(key => {
            if (newObjKeys.includes(key)) {
                isValid -= 1;
            }
        });
        return isValid === 0;
    }
    return obj && Object.keys(obj).length > 0;
}

export const getAllRequiredHeaders = () => {
    const token = localStore.get('token') || "undefined";
    const uid = localStore.get('uid') || "undefined";

    return {
        "Authorization": `Bearer ${token}`,
        "X-Authorization": uid,
    }
}

export const setLocalStorageItems = ({ set = false, setAll = false, item = null, items = {}}) => {
    if (set) {
        localStore.set(item)
    } else if (setAll) {
        localStore.setAll(items)
    }
}

export const getLocalStorageItems = ({get = false, getAll = false, key = null, keys = {}}) => {
    if (get) {
        return localStore.get(key);
    } else if (getAll) {
        return localStore.getAll(keys);
    }
}

export const SendNotification = ({ type, message, duration }) => {
    let options = {
        autoClose: 3000 || duration
    }
    if (type === 's') {
        toast.success(message, options)
    } else if (type === 'e') {
        toast.error(message, options)
    } else if (type === 'w') {
        toast.warn(message, options)
    }
}

export const globalSearch = (list, input) => {
    const searchText = (item) => {
        for (let key in item) {
            if (item[key] == null) {
                continue;
            }
            if (item[key].toString().toUpperCase().indexOf(input.toString().toUpperCase()) !== -1) {
                return true;
            }
        }
    };
    list = list.filter(value => searchText(value));
    return list;
}
