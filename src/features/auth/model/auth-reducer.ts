import { LoginArgs } from "../api/authApi.types"
import { Dispatch } from "redux"
import { setAppStatusAC } from "../../../app/app-reducer"
import { authApi } from "../api/authApi"
import { ResulCode } from "../../../common/enums/enums"
import { handleServerNetworkError } from "../../../common/utils/handleServerNetworkError"
import { handleServerAppError } from "../../../common/utils/handleServerAppError"
import { clearTodolistsAC } from "../../todolists/model/todolists-reducer"
import { clearTasksAC } from "../../todolists/model/tasks-reducer"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload.isLoggedIn }

    case "SET_IS_INITIALIZED_IN":
      return { ...state, isInitialized: action.payload.isInitialized }

    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: "SET_IS_LOGGED_IN", payload: { isLoggedIn } } as const
}
const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: "SET_IS_INITIALIZED_IN", payload: { isInitialized } } as const
}

// Actions types
type ActionsType = setIsLoggedInActionType | setIsInitializedActionType

type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
type setIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === ResulCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError<{ userId: number; token: string }>(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === ResulCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(false))
        dispatch(clearTodolistsAC())
        dispatch(clearTasksAC())
        localStorage.removeItem("sn-token")
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === ResulCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setIsLoggedInAC(true))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch)
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true))
    })
}
