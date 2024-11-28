import React from "react"
import { EditableSpan } from "../../../../../../common/components/editableSpan/EditableSpan"
import { editTodolistAC, updateTodolistTC } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "../../../../../../common/hooks/useAppDispatch"
import { RequestStatus } from "../../../../../../app/app-reducer"

type TodolistTitlePropsType = {
  todolistId: string
  title: string
  entityStatus: RequestStatus
}

export const TodolistTitle = ({ todolistId, title, entityStatus }: TodolistTitlePropsType) => {
  const dispatch = useAppDispatch()

  const editTitleTodolistHandler = (title: string) => {
    dispatch(updateTodolistTC({ todolistId, model: { title } }))
  }

  return (
    <div>
      <h2>
        <EditableSpan title={title} getNewTitle={editTitleTodolistHandler} entityStatus={entityStatus} />
      </h2>
    </div>
  )
}
