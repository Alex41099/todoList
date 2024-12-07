import React from "react"
import { H2 } from "../titleTodolist/TodolistTitle"
import { Skeleton } from "@mui/material"
import List from "@mui/material/List"

export const SkeletonTodolist = () => {
  return (
    <div>
      <div>
        <H2>
          <Skeleton width={150} />
        </H2>
      </div>
      <div>
        <Skeleton height={40} width={255} />
      </div>
      <div>
        <List>
          <Skeleton height={35} width={210} />
          <Skeleton height={35} width={210} />
          <Skeleton height={35} width={210} />
          <Skeleton height={35} width={210} />
        </List>
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        <Skeleton width={65} height={50} />
        <Skeleton width={65} height={50} />
        <Skeleton width={95} height={50} />
      </div>
    </div>
  )
}
