import React from "react"
import { AddItemForm } from "../../../../../../common/components/addItemForm/AddItemForm"
import IconButton from "@mui/material/IconButton"
import Delete from "@mui/icons-material/Delete"
import { addTaskAC, addTaskTC } from "../../../../model/tasks-reducer"
import { addTodolistTC, removeTodolistAC, removeTodolistTC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { RequestStatus } from "../../../../../../app/app-reducer"

type TodolistInputFormPropsType = {
  todolistId: string
  entityStatus: RequestStatus
}

export const TodolistInputForm = ({ todolistId, entityStatus }: TodolistInputFormPropsType) => {
  const dispatch = useAppDispatch()

  const addNewTaskHandler = (title: string) => {
    dispatch(addTaskTC({ todolistId, title }))
  }
  const deleteTodolist = () => {
    dispatch(removeTodolistTC(todolistId))
  }

  return (
    <div>
      <AddItemForm addItem={addNewTaskHandler} disabled={entityStatus === "loading"} />
      <span>
        <IconButton size={"small"} onClick={deleteTodolist} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </span>
    </div>
  )
}
