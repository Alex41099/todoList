import axios from "axios"
import { GetTasksResponse } from "./tasksApi.types"
import { instance } from "../../../common/instance/instance"
import { BaseResponse } from "../../../common/types/types"

export type todolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export const todolistsApi = {
  getTodolists() {
    return instance.get<todolistType[]>("todo-lists")
  },
  updateTodolist(payload: { id: string; title: string }) {
    const { id, title } = payload
    return instance.put<BaseResponse>(`todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: todolistType }>>("todo-lists", { title })
  },
  removeTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`)
  },
}
