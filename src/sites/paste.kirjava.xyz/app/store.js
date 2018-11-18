import React, { useState, useContext, createContext } from 'react'
import {render} from 'react-dom'

const pageData = do {
    try {
        JSON.parse(document.getElementById('data').textContent);
    } catch (e) {
        ({});
    }
};

const initialState = {
    saved: true,
    ...pageData,
};

const ctx = createContext()

export const Store = ({  children }) => {
    const [state, setState] = useState(initialState);

    function mergeState(obj) {
        setState(state => ({ ...state, ...obj }));
    }

    return <ctx.Provider
        value={{ store: state, setStore: mergeState }}
        children={children}
    />
}

export const useStore = () => {
    const { store, setStore } = useContext(ctx);
    return [store, setStore];
}
