import { SxProps } from "@mui/material"

export const PaperSx: SxProps = {
  padding: "15px 5px 15px 10px",
  borderRadius: "10px",
}

export const GridContainerSx: SxProps = {
  padding: "0 40px",
  marginTop: "20px",
}

export const OpacityTaskSx = (isDone: boolean): SxProps => {
  return {
    opacity: isDone ? 0.4 : 1,
  }
}
