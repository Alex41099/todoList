export type ThemeMode = "dark" | "light"
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"

type InitialState = typeof initialState

const initialState = {
  themeMode: "light" as ThemeMode,
  status: "idle" as RequestStatus,
  error: null as string | null,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "CHANGE_THEME":
      return { ...state, themeMode: action.payload.mode }

    case "SET-STATUS":
      return { ...state, status: action.payload.status }

    case "SET-ERROR":
      return { ...state, error: action.payload.error }

    default:
      return state
  }
}

export const changeThemeAC = (mode: ThemeMode) => {
  return { type: "CHANGE_THEME", payload: { mode } } as const
}
export const setAppStatusAC = (status: RequestStatus) => {
  return { type: "SET-STATUS", payload: { status } } as const
}
export const setAppErrorAC = (error: string | null) => {
  return { type: "SET-ERROR", payload: { error } } as const
}

type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>

type ActionsType = ChangeThemeActionType | SetAppStatusActionType | SetAppErrorActionType
