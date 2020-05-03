import React, { useState, useContext, createContext, useCallback } from 'react'

const pageData = do {
    try {
        JSON.parse(document.getElementById('data').textContent);
    } catch (e) {
        ({ hash: 'aaaa', code: '' });
    }
};

const initialState = {
    saved: true,
    hash: pageData.hash,
    code: (pageData.code && decodeURIComponent(pageData.code)) || '',
};

// custom hook: useStore

const ctx = createContext();

export const Store = ({  children }) => {
    const [state, setState] = useState(initialState);

    const mergeState = useCallback((obj) => {
        setState(state => ({ ...state, ...obj }));
    }, []);

    return <ctx.Provider
        value={{ store: state, setStore: mergeState }}
        children={children}
    />
}

export const useStore = () => {
    const { store, setStore } = useContext(ctx);
    return [store, setStore];
}
