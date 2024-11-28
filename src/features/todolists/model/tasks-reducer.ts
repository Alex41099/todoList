import { addTodolistActionType, removeTodolistActionType, setTodolistsActionType } from "./todolists-reducer"
import { DomainTask, tasksApi, UpdateTaskModel } from "../api/tasksApi.types"
import { Dispatch } from "redux"
import { RootState } from "../../../app/store"
import { ResulCode, TaskPriority, TaskStatus } from "../../../common/enums/enums"
import { setAppStatusAC } from "../../../app/app-reducer"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"

export type tasksType = {
  [key: string]: DomainTask[]
}

const initialState: tasksType = {}

export const tasksReducer = (state: tasksType = initialState, action: actionsType): tasksType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }

    case "ADD-TASK":
      return {
        ...state,
        [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
      }

    case "EDIT-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...action.payload.model } : t,
        ),
      }

    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolistId]: [] }

    case "REMOVE-TODOLIST":
      delete state[action.payload.todolistId]
      return { ...state }

    case "SET-TODOLISTS":
      let stateCopy = { ...state }
      action.payload.todolists.forEach((tl) => {
        stateCopy[tl.id] = []
      })
      return stateCopy

    case "SET-TASKS": {
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    }

    case "CLEAR-TASKS":
      return {}

    default:
      return state
  }
}

type actionsType =
  | removeTaskActionType
  | addTaskActionType
  | editTaskActionType
  | addTodolistActionType
  | removeTodolistActionType
  | setTodolistsActionType
  | setTaskActionType
  | clearTasksActionType

type removeTaskActionType = ReturnType<typeof removeTaskAC>
type addTaskActionType = ReturnType<typeof addTaskAC>
type editTaskActionType = ReturnType<typeof editTaskAC>
type setTaskActionType = ReturnType<typeof setTasksAC>
type clearTasksActionType = ReturnType<typeof clearTasksAC>

export const removeTaskAC = (payload: { todolistId: string; taskId: string }) => {
  return { type: "REMOVE-TASK", payload } as const
}
export const addTaskAC = (task: DomainTask) => {
  return { type: "ADD-TASK", payload: { task } } as const
}
export const editTaskAC = (payload: { todolistId: string; taskId: string; model: DomainTask }) => {
  return { type: "EDIT-TASK", payload } as const
}
export const setTasksAC = (payload: { tasks: DomainTask[]; todolistId: string }) => {
  return { type: "SET-TASKS", payload } as const
}
export const clearTasksAC = () => {
  return { type: "CLEAR-TASKS" } as const
}

export const fetchTasksTC = (todolistId: string) => {
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setTasksAC({ tasks: res.data.items, todolistId }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const removeTaskTC = (payload: { todolistId: string; taskId: string }) => {
  const { todolistId, taskId } = payload
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .removeTask({ todolistId, taskId })
      .then((res) => {
        if (res.data.resultCode === ResulCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(removeTaskAC({ taskId, todolistId }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const addTaskTC = (payload: { todolistId: string; title: string }) => {
  const { todolistId, title } = payload
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    tasksApi
      .createTask({ todolistId, title })
      .then((res) => {
        if (res.data.resultCode === ResulCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(addTaskAC(res.data.data.item))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export type requestUpdateTaskType = {
  title?: string
  description?: string
  status?: TaskStatus
  priority?: TaskPriority
  startDate?: string
  deadline?: string
}

export const updateTaskTC = (payload: { todolistId: string; taskId: string; model: requestUpdateTaskType }) => {
  const { todolistId, taskId, model } = payload
  return (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC("loading"))
    const task = getState().tasks[todolistId].find((t) => t.id === taskId)
    if (!task) {
      return
    }

    const data: UpdateTaskModel = {
      title: task.title,
      deadline: task.deadline,
      status: task.status,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      ...model,
    }
    tasksApi
      .updateTask({ data, taskId, todolistId })
      .then((res) => {
        if (res.data.resultCode === ResulCode.Success) {
          dispatch(setAppStatusAC("succeeded"))
          dispatch(editTaskAC({ taskId, todolistId, model: res.data.data.item }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
