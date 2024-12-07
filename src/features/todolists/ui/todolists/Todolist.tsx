import React, { useEffect, useState } from "react"
import { filterTodolistType, taskType } from "./Todolists"
import "./Todolist.css"
import { Tasks } from "./todolist/tasks/Tasks"
import { TodolistInputForm } from "./todolist/InputFormTodolist/TodolistInputForm"
import { H2, TodolistTitle } from "./todolist/titleTodolist/TodolistTitle"
import { FilterTasksButtons } from "./todolist/filterTasksButtons/FilterTasksButtons"
import { DomainTask } from "../../api/tasksApi.types"
import { fetchTasksTC } from "../../model/tasks-reducer"
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch"
import { RequestStatus } from "../../../../app/app-reducer"
import { Skeleton } from "@mui/material"
import List from "@mui/material/List"
import { SkeletonTodolist } from "./todolist/skeletonTodolist/SkeletonTodolist"

type TodolistPropsType = {
  id: string
  title: string
  filter: filterTodolistType
  task: DomainTask[]
  deleteTodolist: (todolistId: string) => void
  entityStatus: RequestStatus
}

export const Todolist = ({ id, filter, deleteTodolist, title, entityStatus }: TodolistPropsType) => {
  const dispatch = useAppDispatch()

  const [getTasksStatus, setGetTasksStatus] = useState(false)

  useEffect(() => {
    dispatch(fetchTasksTC(id)).then(() => {
      setGetTasksStatus(true)
    })
  }, [])

  return (
    <>
      {getTasksStatus ? (
        <div>
          <TodolistTitle todolistId={id} title={title} entityStatus={entityStatus} />
          <TodolistInputForm todolistId={id} entityStatus={entityStatus} />
          <Tasks todolistId={id} filter={filter} entityStatus={entityStatus} />
          <FilterTasksButtons filter={filter} todolistId={id} />
        </div>
      ) : (
        <SkeletonTodolist />
      )}
    </>
  )
}
