import { useState } from "react";
import Signin from "./components/Signin";
import SignUp from "./components/SignUp";



export default function Auth() {
    const [authState,setAuthState]= useState('signin')

  return (
    <div className="flex w-full min-h-screen justify-center items-center">
        {authState=='signin'?<Signin setAuthState = {setAuthState}/>:<SignUp setAuthState = {setAuthState}/>}
    </div>
  )
}
