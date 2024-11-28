import React, { useEffect } from "react"
import { filterTodolistType, taskType } from "./Todolists"
import "./Todolist.css"
import { Tasks } from "./todolist/tasks/Tasks"
import { TodolistInputForm } from "./todolist/InputFormTodolist/TodolistInputForm"
import { TodolistTitle } from "./todolist/titleTodolist/TodolistTitle"
import { FilterTasksButtons } from "./todolist/filterTasksButtons/FilterTasksButtons"
import { DomainTask } from "../../api/tasksApi.types"
import { fetchTasksTC } from "../../model/tasks-reducer"
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch"
import { RequestStatus } from "../../../../app/app-reducer"

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

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  return (
    <div>
      <TodolistTitle todolistId={id} title={title} entityStatus={entityStatus} />
      <TodolistInputForm todolistId={id} entityStatus={entityStatus} />
      <Tasks todolistId={id} filter={filter} entityStatus={entityStatus} />
      <FilterTasksButtons filter={filter} todolistId={id} />
    </div>
  )
}
