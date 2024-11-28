export type BaseResponse<D = {}> = {
  messages: any[]
  fieldsErrors: any[]
  resultCode: number
  data: D
}
