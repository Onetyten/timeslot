
export interface profileInterface{
    _id:string,
    name:string,
    email:string,
    refreshToken:string,
}

export interface userState {
    user:profileInterface|null
}

export interface slotType{
  _id:string,
  userId: string,
  name: string,
  email: string,
  type: string,
  eventDate: Date,
  relationship: string,
  createdAt: Date,
  updatedAt: Date,
  __v: number

}