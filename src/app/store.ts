import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { tasksReducer } from "../features/todolists/model/tasks-reducer"
import { todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { appReducer } from "./app-reducer"
import { thunk } from "redux-thunk"
import { authReducer } from "../features/auth/model/auth-reducer"
import { composeWithDevTools } from "redux-devtools-extension"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = legacy_createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store
