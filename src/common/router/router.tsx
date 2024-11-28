import { App } from "../../App"
import { Main } from "../../app/main/Main"
import { Login } from "../../features/auth/ui/Login/Login"
import { createBrowserRouter } from "react-router-dom"
import { Page404 } from "../components/Page404/Page404"

export const Path = {
  Login: "/login",
} as const

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: Path.Login,
        element: <Login />,
      },
      {
        path: "/*",
        element: <Page404 />,
      },
    ],
  },
])
