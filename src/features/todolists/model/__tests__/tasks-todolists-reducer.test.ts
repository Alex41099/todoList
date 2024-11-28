import { addTodolistAC, todolistsReducer } from "../todolists-reducer"
import { tasksReducer } from "../tasks-reducer"
import { tasksType, todolistType } from "../../components/todolists/Todolists"

test("ids should be equals", () => {
  const startTasksState: tasksType = {}
  const startTodolistsState: todolistType[] = []

  const action = addTodolistAC("new todolist")

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolistId)
  expect(idFromTodolists).toBe(action.payload.todolistId)
})
