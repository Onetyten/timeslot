import { createSlice } from "@reduxjs/toolkit"
import type { userState } from "../types/types"

const initialState:userState ={
    user:null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        clearUser:(state)=>{
            state.user = null
        }
    }
})
export const {setUser,clearUser} = userSlice.actions
export default userSlice.reducer