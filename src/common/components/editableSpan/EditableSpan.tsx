import React, { ChangeEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import { RequestStatus } from "../../../app/app-reducer"

type EditableSpanProps = {
  title: string
  getNewTitle: (title: string) => void
  entityStatus?: RequestStatus
}

export const EditableSpan = ({ title, getNewTitle, entityStatus }: EditableSpanProps) => {
  const [editMode, setEditMode] = useState(false)
  const [value, setValue] = useState(title)
  const [error, setError] = useState<null | string>(null)

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(null)
    setValue(e.currentTarget.value)
  }

  const blurHandler = () => {
    if (value.trim() === "") {
      setError("Заполните!")
    }
    if (title !== value && value.trim() !== "") {
      // проверяем чтобы попросту не отправлять не измененный текст
      setEditMode(false)
      getNewTitle(value)
    }
    setEditMode(false)
  }

  return (
    <>
      {editMode ? (
        <TextField
          value={value}
          onChange={(e) => changeHandler(e)}
          variant={"standard"}
          size={"small"}
          error={error ? true : false}
          onBlur={blurHandler}
          autoFocus
          label={error ? error : ""}
        />
      ) : (
        <span onDoubleClick={() => setEditMode(entityStatus === "loading" ? false : true)}>{value}</span>
      )}
    </>
  )
}
