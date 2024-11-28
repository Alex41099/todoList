import React, { useEffect } from "react"
import "./App.css"
import CssBaseline from "@mui/material/CssBaseline"
import { CircularProgress, ThemeProvider } from "@mui/material"
import { getTheme } from "./common/theme/theme"
import { Header } from "./common/components/Header"
import { useAppSelector } from "./common/hooks/useAppSelector"
import { useAppDispatch } from "./common/hooks/useAppDispatch"
import { selectThemeMode } from "./app/appSelectors"
import ErrorSnackbar from "./common/components/ErrorSnackbar"
import { Outlet } from "react-router-dom"
import { initializeAppTC } from "./features/auth/model/auth-reducer"
import { selectIsInitialized } from "./features/auth/model/authSelectors"
import s from "./App.module.css"

export const App = () => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isInitialized && (
        <>
          <Header themeMode={themeMode} theme={theme} />
          <Outlet />
        </>
      )}
      {!isInitialized && (
        <div className={s.circularProgressContainer}>
          <CircularProgress size={150} thickness={3} />
        </div>
      )}
      <ErrorSnackbar />
    </ThemeProvider>
  )
}
