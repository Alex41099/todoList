import Container from "@mui/material/Container"
import React from "react"
import { AddItemForm } from "../../common/components/addItemForm/AddItemForm"
import { addTodolistAC, addTodolistTC } from "../../features/todolists/model/todolists-reducer"
import { Todolists } from "../../features/todolists/ui/todolists/Todolists"
import { useAppDispatch } from "../../common/hooks/useAppDispatch"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../../common/hooks/useAppSelector"
import { selectIsInitialized, selectIsLoggedIn } from "../../features/auth/model/authSelectors"
import { Path } from "../../common/router/router"

export const Main = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addNewTodolist = (title: string) => {
    dispatch(addTodolistTC(title))
  }

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container maxWidth={"xl"}>
      <AddItemForm addItem={addNewTodolist} />
      <Todolists />
    </Container>
  )
}
