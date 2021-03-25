export interface Data2 {
  case: number
  date: string |undefined
  death: number
  name: string
  recover: number
  _id: string
}
export interface Data{
  code:string
  _id:string
  name:string
  caseSum:number | undefined
  value:object[]
  __v:number
  __proto__:object
}


export interface PieData{
  name:string
  case:number
}
