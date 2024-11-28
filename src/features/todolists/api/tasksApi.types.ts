import axios from "axios"
import { ChangeEvent } from "react"
import { instance } from "../../../common/instance/instance"
import { BaseResponse } from "../../../common/types/types"
import { TaskPriority, TaskStatus } from "../../../common/enums/enums"

export type GetTasksResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}
export type DomainTask = {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  addedDate: string
}
export type UpdateTaskModel = {
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  removeTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(payload: { data: UpdateTaskModel; todolistId: string; taskId: string }) {
    const { data, taskId, todolistId } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`todo-lists/${todolistId}/tasks/${taskId}`, data)
  },
}
