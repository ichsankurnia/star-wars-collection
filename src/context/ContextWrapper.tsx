import React, { ReactNode, useEffect, useReducer } from 'react';
import GlobalContext from './GlobalContext';

export interface ActionRedux {
    type: string,
    payload: any
}

const BookmarkedItemsReducer = (state: any[], action: ActionRedux) => {
    const { type, payload } = action
    switch (type) {
        case 'push':
            if([...state].find(item => item.url === payload.url)){
                return state
            }
            return [...state, payload]
        case 'update':
            return state.map((item) => item.url === payload.url? payload : item)
        case 'delete':
            return state.filter((item) => item.url !== payload.url)
        default:
            throw new Error()
    }
}

const initItems = () => {
    const storageTasks = localStorage.getItem('bookmarkedItem')
    const parsedTasks = storageTasks? JSON.parse(storageTasks) : []
    return parsedTasks
}


type Props = {
    children: ReactNode
};

const ContextWrapper: React.FC<Props> = ({ children }) => {
    const [bookmarkedItem, dispatchCalBookmark] = useReducer(BookmarkedItemsReducer, [], initItems )

    useEffect(() => {
        localStorage.setItem('bookmarkedItem', JSON.stringify(bookmarkedItem))
    }, [bookmarkedItem])

    return (
        <GlobalContext.Provider 
            value={{
                bookmarkedItem, dispatchCalBookmark
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export default ContextWrapper;