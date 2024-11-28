import { createTheme } from "@mui/material"
import { blue, purple } from "@mui/material/colors"
import { ThemeMode } from "../../app/app-reducer"

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === "light" ? "light" : "dark",
      primary: blue,
      secondary: purple,
    },
  })
}
