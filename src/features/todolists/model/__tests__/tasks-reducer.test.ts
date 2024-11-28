import { v1 } from "uuid"
import { addTaskAC, editTaskAC, removeTaskAC, tasksReducer } from "../tasks-reducer"
import { tasksType, todolistType } from "../../components/todolists/Todolists"
import { addTodolistAC, removeTodolistAC, todolistsReducer } from "../todolists-reducer"

let startStateTasks: tasksType
let startStateTodolists: todolistType[]

beforeEach(() => {
  startStateTasks = {
    ["todoId1"]: [
      { id: v1(), title: "task1", isDone: true },
      { id: v1(), title: "task2", isDone: true },
      { id: "taskId3", title: "task3", isDone: false },
    ],
    ["todoId2"]: [
      { id: v1(), title: "task1", isDone: true },
      { id: v1(), title: "task2", isDone: false },
      { id: v1(), title: "task3", isDone: false },
    ],
  }

  startStateTodolists = [
    { id: "todoId1", title: "Todo-1", filter: "all" },
    { id: "todoId2", title: "Todo-2", filter: "all" },
  ]
})

test("remove-task", () => {
  const endState = tasksReducer(startStateTasks, removeTaskAC({ todolistId: "todoId1", taskId: "taskId3" }))

  expect(endState["todoId1"].length).toBe(2)
  expect(endState["todoId1"][1].title).toBe("task2")
})

test("add-task", () => {
  const endState = tasksReducer(startStateTasks, addTaskAC({ todolistId: "todoId1", title: "task4" }))

  expect(endState["todoId1"].length).toBe(4)
  expect(endState["todoId1"][3].title).toBe("task4")
})

test("edit-task", () => {
  const endState1 = tasksReducer(
    startStateTasks,
    editTaskAC({ todolistId: "todoId1", taskId: "taskId3", model: { title: "editTask3" } }),
  )
  const endState2 = tasksReducer(
    startStateTasks,
    editTaskAC({ todolistId: "todoId1", taskId: "taskId3", model: { isDone: true } }),
  )

  expect(endState1["todoId1"][2].title).toBe("editTask3")
  expect(endState2["todoId1"][2].isDone).toBe(true)
})

test("add-new-empty-array-for-todolist", () => {
  const action = addTodolistAC("Todo-3")
  const endStateTodolists = todolistsReducer(startStateTodolists, action)
  const endStateTasks = tasksReducer(startStateTasks, action)

  const keys = Object.keys(endStateTasks)

  expect(endStateTodolists.length).toBe(3)
  expect(keys.length).toBe(3)
})

test("remove-array-for-todolist", () => {
  const action = removeTodolistAC("todoId1")
  const endStateTodolists = todolistsReducer(startStateTodolists, action)
  const endStateTasks = tasksReducer(startStateTasks, action)

  const keys = Object.keys(endStateTasks)

  expect(endStateTodolists.length).toBe(1)
  expect(keys.length).toBe(1)
})
