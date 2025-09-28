
export interface profileInterface{
    _id:string,
    name:string,
    email:string,
    refreshToken:string,
}

export interface userState {
    user:profileInterface|null
}