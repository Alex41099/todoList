import { addTodolistAC, editTodolistAC, removeTodolistAC, todolistsReducer } from "../todolists-reducer"
import { todolistType } from "../../components/todolists/Todolists"

let startState: todolistType[]

beforeEach(() => {
  startState = [
    { id: "todoId1", title: "Todo-1", filter: "all" },
    { id: "todoId2", title: "Todo-2", filter: "all" },
  ]
})

test("remove-todolist", () => {
  const endState = todolistsReducer(startState, removeTodolistAC("todoId2"))

  expect(endState.length).toBe(1)
  expect(endState[0].title).toBe("Todo-1")
})

test("add-todolist", () => {
  const endState = todolistsReducer(startState, addTodolistAC("Todo-3"))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe("Todo-3")
})

test("edit-todolist", () => {
  // Можно изменить как title тудулиста, так и ее filter!

  const endState1 = todolistsReducer(
    startState,
    editTodolistAC({ todolistId: "todoId2", model: { title: "editTodo-2" } }),
  )
  const endState2 = todolistsReducer(startState, editTodolistAC({ todolistId: "todoId2", model: { filter: "active" } }))

  expect(endState1[1].title).toBe("editTodo-2")
  expect(endState2[1].filter).toBe("active")
})
