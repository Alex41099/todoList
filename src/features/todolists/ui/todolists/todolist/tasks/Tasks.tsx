import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { filterTodolistType } from "../../Todolists"
import { Task } from "./task/Task"
import { useAppSelector } from "../../../../../../common/hooks/useAppSelector"
import { DomainTask } from "../../../../api/tasksApi.types"
import { TaskStatus } from "../../../../../../common/enums/enums"
import { RequestStatus } from "../../../../../../app/app-reducer"

type TasksPropsType = {
  todolistId: string
  filter: filterTodolistType
  entityStatus: RequestStatus
}

export const Tasks = (props: TasksPropsType) => {
  const task = useAppSelector((state) => state.tasks[props.todolistId])

  let filterTask = task
  if (props.filter === "active") {
    filterTask = filterTask.filter((t: DomainTask) => t.status === TaskStatus.Completed)
  }
  if (props.filter === "completed") {
    filterTask = filterTask.filter((t: DomainTask) => t.status === TaskStatus.New)
  }

  return (
    <div>
      <List>
        {filterTask.map((t: DomainTask) => {
          return (
            <ListItem key={t.id}>
              <Task
                id={t.id}
                title={t.title}
                status={t.status === TaskStatus.Completed ? true : false}
                todolistId={props.todolistId}
                entityStatus={props.entityStatus}
              />
            </ListItem>
          )
        })}
      </List>
    </div>
  )
}
