import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import "./AddItemForm.css"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import { AddCircle } from "@mui/icons-material"

type AddItemFormProps = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const AddItemForm = (props: AddItemFormProps) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setValue(e.currentTarget.value)
  }

  const clickHandler = () => {
    if (value.trim() !== "") {
      props.addItem(value.trim())
      setValue("")
    } else {
      setError(true)
    }
  }

  const keyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.shiftKey && e.key === "Enter") {
      clickHandler()
    }
  }

  return (
    <>
      <TextField
        value={value}
        onChange={changeHandler}
        error={error ? true : false}
        variant={"standard"}
        size={"small"}
        onKeyUp={keyUpHandler}
        helperText={error ? "Incorrect entry" : ""}
        disabled={props.disabled}
        type={"text"}
      />
      <IconButton onClick={clickHandler} size={"small"} color={"primary"} disabled={props.disabled}>
        <AddCircle />
      </IconButton>
    </>
  )
}
