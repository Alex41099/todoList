import React from "react"
import Button from "@mui/material/Button"
import { editTodolistAC } from "../../../../model/todolists-reducer"
import { filterTodolistType } from "../../Todolists"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"

type FilterTasksButtonsPropsType = {
  filter: filterTodolistType
  todolistId: string
}

export const FilterTasksButtons = ({ filter, todolistId }: FilterTasksButtonsPropsType) => {
  const dispatch = useAppDispatch()

  const setNewFilterStatus = (todolistId: string, status: filterTodolistType) => {
    dispatch(editTodolistAC({ todolistId, model: { filter: status } }))
  }

  return (
    <div>
      <Button
        variant={filter === "all" ? "contained" : "text"}
        size={"small"}
        onClick={() => setNewFilterStatus(todolistId, "all")}
        color={"primary"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "contained" : "text"}
        size={"small"}
        onClick={() => setNewFilterStatus(todolistId, "active")}
        color={"success"}
      >
        Active
      </Button>
      <Button
        variant={filter === "completed" ? "contained" : "text"}
        size={"small"}
        onClick={() => setNewFilterStatus(todolistId, "completed")}
        color={"inherit"}
      >
        Completed
      </Button>
    </div>
  )
}
