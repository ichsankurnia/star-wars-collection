import React from "react"
import { ActionRedux } from "./ContextWrapper";

export interface IBookmark {
  url: string,
  name: string,
  collection: string
}

export interface AppContextInterface {
    bookmarkedItem: IBookmark[],
    dispatchCalBookmark: (action: ActionRedux) => any
  }
  

const GlobalContext = React.createContext({} as AppContextInterface )

export default GlobalContext