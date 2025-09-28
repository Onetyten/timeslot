import type React from "react"
import SpotlightBorder from "./SpotlightBorder"
import { TextScramble } from "@skyshots/react-text-scrambler"
import { useState } from "react"
import toast from "react-hot-toast"
import api from "../../utils/api"
import { signinSchema } from "../../validation/userInputValidate"
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUser } from "../../state/userSlice"
import { setToken } from "../../state/tokenSlice"
import { useNavigate } from "react-router-dom"

interface propType{
    setAuthState:React.Dispatch<React.SetStateAction<string>>
}

export default function Signin(prop:propType) {
    const dispatch = useDispatch()
    const {setAuthState} = prop
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [isloading,setIsLoading] = useState(false)
    const navigate = useNavigate()    

    async function handleSignIn() {
        const {error} = signinSchema.validate({email,password})
        if (error){
            toast(error.message)
            return console.log(error.message)
        }
        if (isloading) return
        setIsLoading(true)
        try {
            const response = await api.post('/user/signin',{email,password})
            if (response.data.success == false){
                toast.error(response.data.message)
                return console.log(response.data)
            }
            dispatch(setUser(response.data.data))
            dispatch(setToken(response.data.token))
            navigate("/")
        }
        catch (error) {
            if (axios.isAxiosError(error)){
                toast(error.response?.data.message)
                console.log(error.response?.data.message)
            }
        }
        finally{
            setIsLoading(false)
            setEmail("")
            setPassword("")
        }
    }
  return (
    <SpotlightBorder className="w-md h-[500px] p-4 flex flex-col text-sm justify-between items-center">
        <div className="flex flex-col gap-1 items-center">
            <div className="text-xl flex gap-2 font-semibold"> <TextScramble texts={['Welcome to']} letterSpeed={30} nextLetterSpeed={30}/> <span className="text-primary"><TextScramble texts={['Timeslot']} letterSpeed={30} nextLetterSpeed={30}/></span></div>
            <div className="text-sm w-full text-center">
                <TextScramble texts={['The perfect birthday gift.','Never forget a special day again.','Save life’s most important moments.','Celebrate automatically with thoughtful emails.','Celebrate effortlessly, let us do the remembering.','Stay connected through every milestone.']} letterSpeed={30} nextLetterSpeed={10} pauseTime={4000} />
            </div>
            <div className="flex flex-col mt-3 gap-2 items-center">
                <input type='email' value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} className="w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3" />
                <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3" />
            </div>
        </div>

        <div className="flex flex-col gap-2 items-center">
            <button onClick={handleSignIn} className={`p-2 px-4 font-medium relative cursor-pointer ${isloading?"bg-muted":"hover:bg-primary-100 bg-primary"} text-background`}>
                <TextScramble texts={['Sign in']} letterSpeed={30} nextLetterSpeed={30}/>
                {isloading&&(
                <div className="absolute text-2xl justify-center items-baseline inset-0 flex bg-muted/60">
                    <p className=" animate-spin">/</p>
                </div>
                )}

            </button>
            <div className="mt-2 flex gap-2 text-sm text-slate-300">
                <TextScramble texts={[`Don't have an account?`]} letterSpeed={30} nextLetterSpeed={30}/>
                <span className="cursor-pointer hover:text-primary-100 text-primary" onClick={()=>{setAuthState('signup')}}>
                    <TextScramble texts={[`sign up`]} letterSpeed={30} nextLetterSpeed={30}/>
                </span>
            </div>
        </div>
        
    </SpotlightBorder>
  )
}
