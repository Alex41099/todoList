import * as React from "react"
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { useAppSelector } from "../hooks/useAppSelector"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { setAppErrorAC } from "../../app/app-reducer"
import { useEffect, useState } from "react"

export default function ErrorSnackbar() {
  const dispatch = useAppDispatch()
  const error = useAppSelector((state) => state.app?.error)
  const [open, setOpen] = useState(true)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
    dispatch(setAppErrorAC(null))
  }

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        handleClose()
      }, 6000)
    }
  }, [error])

  return (
    <div>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  )
}
