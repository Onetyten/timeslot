import type React from "react"
import SpotlightBorder from "./SpotlightBorder"
import { TextScramble } from "@skyshots/react-text-scrambler"
import { useState } from "react"
import toast from "react-hot-toast"
import {signupSchema} from '../../validation/userInputValidate'
import api from '../../utils/api'


interface propType{
    setAuthState:React.Dispatch<React.SetStateAction<string>>
}

export default function SignUp(prop:propType) {
    const {setAuthState} = prop
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [isloading,setIsLoading] = useState(false)
    
    async function handleSignUp() {
        const {error} = signupSchema.validate({name,email,password})
        if (error){
            return toast(error.message)
        }
        if (isloading) return
        setIsLoading(true)
        try {
            const response = await api.post('/user/signup',{name,email,password})

            if (response.data.success == false){
                return toast.error(response.data.message)
            }
            return toast.success(`Time slot account created, proceed to signin page`)
        }
        catch (error) {
            console.error(error)
        }
        finally{
            setIsLoading(false)
            setName("")
            setEmail("")
            setPassword("")
        }
    }


  return (
    <SpotlightBorder className="w-full m-2 sm:m-0 sm:w-md h-[500px] p-4 flex flex-col text-sm justify-between items-center">
        <div className="flex flex-col gap-1 items-center">

            <div className="text-xl flex gap-2 text-nowrap font-semibold"> <TextScramble texts={['Welcome to']} letterSpeed={30} nextLetterSpeed={30}/> <span className="text-primary"><TextScramble texts={['Timeslot']} letterSpeed={30} nextLetterSpeed={30}/></span></div>
            <div className="text-sm w-full text-center">
                <TextScramble texts={['The perfect birthday gift.','Never forget a special day again.','Save life’s most important moments.','Celebrate automatically with thoughtful emails.','Celebrate effortlessly, let us do the remembering.','Stay connected through every milestone.']} letterSpeed={30} nextLetterSpeed={10} pauseTime={4000} />
            </div>
            <div className="flex flex-col mt-3 gap-2 items-center">
                <input type='text' value={name} placeholder="Name" onChange={(e)=>{setName(e.target.value)}} className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3" />
                <input type='email' value={email} placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3" />
                <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password" className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3" />
            </div>

        </div>

        <div className="flex flex-col gap-2 items-center">
            <button onClick={handleSignUp} className={`p-2 px-4 font-medium relative cursor-pointer ${isloading?"bg-muted":"hover:bg-primary-100 bg-primary"} text-background`}>
                <TextScramble texts={['Sign up']} letterSpeed={30} nextLetterSpeed={30}/>
                {isloading&&(
                <div className="absolute text-2xl justify-center items-baseline inset-0 flex bg-muted/60">
                    <p className=" animate-spin">/</p>
                </div>
                )}
            </button>
            <div className="mt-2 text-nowrap flex gap-2 text-sm">
                <TextScramble texts={[`Have an account already?`]} letterSpeed={30} nextLetterSpeed={30}/>
                <span className="cursor-pointer hover:text-primary-100 text-primary" onClick={()=>{setAuthState('signin')}}>
                    <TextScramble texts={[`sign in`]} letterSpeed={30} nextLetterSpeed={30}/>
                </span>
            </div>
        </div>
        
    </SpotlightBorder>
  )
}
