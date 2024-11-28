import React, { useEffect } from "react"
import { Todolist } from "./Todolist"
import Grid from "@mui/material/Grid2"
import Paper from "@mui/material/Paper"
import { GridContainerSx, PaperSx } from "./Todolist.styles"
import { fetchTodolistsTC, removeTodolistAC, setTodolistsAC } from "../../model/todolists-reducer"
import { useAppSelector } from "../../../../common/hooks/useAppSelector"
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch"
import { selectTodolists } from "../../model/todolistsSelectors"
import { selectTasks } from "../../model/tasksSelectors"

export type filterTodolistType = "all" | "active" | "completed"

export type taskType = {
  id: string
  title: string
  isDone: boolean
}

export const Todolists = () => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)
  const tasks = useAppSelector(selectTasks)

  const deleteTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId))
  }

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <div>
      <Grid container spacing={4} sx={GridContainerSx}>
        {todolists.map((tl: any) => {
          return (
            <Grid key={tl.id}>
              <Paper sx={PaperSx} elevation={18}>
                <Todolist
                  id={tl.id}
                  filter={tl.filter}
                  task={tasks[tl.id]}
                  title={tl.title}
                  deleteTodolist={deleteTodolist}
                  entityStatus={tl.entityStatus}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}
