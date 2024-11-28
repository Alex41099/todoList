import IconButton from "@mui/material/IconButton/IconButton"
import React from "react"
import Delete from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import DoneOutlineIcon from "@mui/icons-material/DoneOutline"
import { OpacityTaskSx } from "../../../Todolist.styles"
import { editTaskAC, removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { useAppDispatch } from "../../../../../../../common/hooks/useAppDispatch"
import { EditableSpan } from "../../../../../../../common/components/editableSpan"
import { RequestStatus } from "../../../../../../../app/app-reducer"

type TaskPropsType = {
  id: string
  title: string
  status: boolean
  todolistId: string
  entityStatus: RequestStatus
}

export const Task = ({ id, title, status, todolistId, entityStatus }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const isStatusTask = (todolistId: string, statusTask: boolean) => {
    const status = statusTask ? 2 : 0
    dispatch(updateTaskTC({ todolistId, taskId: id, model: { status } }))
  }
  const deleteTask = (todolistId: string) => {
    dispatch(removeTaskTC({ todolistId, taskId: id }))
  }
  const editTitleTaskHandler = (title: string) => {
    dispatch(updateTaskTC({ todolistId, taskId: id, model: { title } }))
  }

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            checked={status}
            onChange={(e) => isStatusTask(todolistId, e.currentTarget.checked)}
            name="antoine"
            checkedIcon={<DoneOutlineIcon />}
            size={"small"}
            disabled={entityStatus === "loading"}
          />
        }
        label={<EditableSpan title={title} getNewTitle={editTitleTaskHandler} entityStatus={entityStatus} />}
        sx={OpacityTaskSx(status)}
      />
      <IconButton onClick={() => deleteTask(todolistId)} size={"small"} disabled={entityStatus === "loading"}>
        <Delete sx={OpacityTaskSx(status)} />
      </IconButton>
    </>
  )
}
