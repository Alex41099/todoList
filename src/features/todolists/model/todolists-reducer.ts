import { v1 } from "uuid"
import { filterTodolistType } from "../ui/todolists/Todolists"
import { todolistsApi, todolistType } from "../api/todolistsApi.types"
import { Dispatch } from "redux"
import { RootState } from "../../../app/store"
import { RequestStatus, setAppStatusAC } from "../../../app/app-reducer"
import { ResulCode } from "../../../common/enums/enums"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"
import { addTaskAC } from "./tasks-reducer"

export type DomainTodolistType = todolistType & {
  filter: filterTodolistType
  entityStatus: RequestStatus
}
const initialState: DomainTodolistType[] = []

export const todolistsReducer = (
  state: DomainTodolistType[] = initialState,
  action: actionsType,
): DomainTodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.payload.todolistId)

    case "ADD-TODOLIST":
      return [
        {
          id: action.payload.todolistId,
          title: action.payload.title,
          order: 0,
          addedDate: "",
          filter: "all",
          entityStatus: "idle",
        },
        ...state,
      ]

    case "EDIT-TODOLIST":
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, ...action.payload.model } : tl))

    case "SET-TODOLISTS":
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))

    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl))

    case "CLEAR-TODOLISTS":
      return []

    default:
      return state
  }
}

type actionsType =
  | removeTodolistActionType
  | addTodolistActionType
  | editTodolistActionType
  | setTodolistsActionType
  | changeTodolistEntityStatusActionType
  | clearTodolistsActionType

export type removeTodolistActionType = ReturnType<typeof removeTodolistAC>
export type addTodolistActionType = ReturnType<typeof addTodolistAC>
export type editTodolistActionType = ReturnType<typeof editTodolistAC>
export type setTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type changeTodolistEntityStatusActionType = ReturnType<typeof changeTodolistEntityStatus>
export type clearTodolistsActionType = ReturnType<typeof clearTodolistsAC>

export const removeTodolistAC = (todolistId: string) => {
  return { type: "REMOVE-TODOLIST", payload: { todolistId } } as const
}
export const addTodolistAC = (payload: { title: string; todolistId: string }) => {
  return { type: "ADD-TODOLIST", payload } as const
}
export const editTodolistAC = (payload: {
  todolistId: string
  model: { title?: string; filter?: filterTodolistType }
}) => {
  return { type: "EDIT-TODOLIST", payload } as const
}
export const setTodolistsAC = (todolists: todolistType[]) => {
  return { type: "SET-TODOLISTS", payload: { todolists } } as const
}
export const changeTodolistEntityStatus = (payload: { id: string; status: RequestStatus }) => {
  return { type: "CHANGE-TODOLIST-ENTITY-STATUS", payload } as const
}
export const clearTodolistsAC = () => {
  return { type: "CLEAR-TODOLISTS" } as const
}

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .getTodolists()
      .then((res) => {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setTodolistsAC(res.data))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === ResulCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(addTodolistAC({ title, todolistId: res.data.data.item.id }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const removeTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodolistEntityStatus({ id: todolistId, status: "loading" }))
    todolistsApi
      .removeTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === ResulCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(removeTodolistAC(todolistId))
        } else {
          handleServerAppError(res.data, dispatch)
        }
        dispatch(changeTodolistEntityStatus({ id: todolistId, status: "failed" }))
      })
      .catch((error) => {
        dispatch(changeTodolistEntityStatus({ id: todolistId, status: "failed" }))
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const updateTodolistTC = (payload: { todolistId: string; model: { title: string } }) => {
  const { todolistId, model } = payload
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    todolistsApi
      .updateTodolist({ id: todolistId, title: model.title })
      .then((res) => {
        if (res.data.resultCode === ResulCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(editTodolistAC({ todolistId, model }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
