import React from "react"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import { MenuButton } from "./MenuButton"
import Switch from "@mui/material/Switch"
import AppBar from "@mui/material/AppBar"
import { changeThemeAC, ThemeMode } from "../../app/app-reducer"
import { Theme } from "@mui/material/styles"
import { Dispatch, UnknownAction } from "redux"
import LinearProgress from "@mui/material/LinearProgress"
import { selectAppStatus } from "../../app/appSelectors"
import { useAppSelector } from "../hooks/useAppSelector"
import "./header.css"
import { selectIsLoggedIn } from "../../features/auth/model/authSelectors"
import { logoutTC } from "../../features/auth/model/auth-reducer"
import { useAppDispatch } from "../hooks/useAppDispatch"

type HeaderPropsType = {
  themeMode: ThemeMode
  theme: Theme
}

export const Header = ({ theme, themeMode }: HeaderPropsType) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const appStatus = useAppSelector(selectAppStatus)
  const dispatch = useAppDispatch()

  const changeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
  }

  const logoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <AppBar position="static" sx={{ marginBottom: "20px" }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {isLoggedIn && (
          <MenuButton background={theme.palette.primary.dark} onClick={logoutHandler}>
            Logout
          </MenuButton>
        )}
        <MenuButton background={theme.palette.primary.light}>Faq</MenuButton>
        <Switch color={"default"} onChange={changeHandler} />
      </Toolbar>
      {appStatus === "loading" && (
        <span className={"linearProgress"}>
          <LinearProgress color={"inherit"} />
        </span>
      )}
    </AppBar>
  )
}
