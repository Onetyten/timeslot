import { TextScramble } from '@skyshots/react-text-scrambler'
import SpotlightBorder from './SpotlightBorder'
import { useRef, useState } from 'react'
import {Listbox, ListboxButton, ListboxOption, ListboxOptions} from '@headlessui/react'
import { IoChevronDownSharp, IoClose } from 'react-icons/io5'
import { CiCalendar } from 'react-icons/ci'
import toast from 'react-hot-toast'
import type { RootState } from '../../utils/store'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { slotJoiSchema } from '../../validation/userInputValidate'
import api from '../../utils/api'
import { useNavigate } from 'react-router-dom'
import type { slotType } from '../../types/types'
import Eventslot from './Eventslot'
import Birthdayslot from './Birthdayslot'


interface propTypes{
    slotTypes:string[],
    setDisplayedSlotIndex: React.Dispatch<React.SetStateAction<number>>,
    displayedSlotIndex:number
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>> ,
    setSlotList:React.Dispatch<React.SetStateAction<slotType[]>>,
}

    const oneYear = 365 * 24 * 60 * 60 * 1000

export default function NewSlotForm(props:propTypes) {
    const {slotTypes,setDisplayedSlotIndex,setShowAddForm,setSlotList,displayedSlotIndex} = props
    const [isloading,setIsLoading] = useState(false)
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [type,setType] = useState(slotTypes[displayedSlotIndex])
    const [relationship,setRelationship] = useState("")
    const [eventDate,setEventDate] = useState(new Date(Date.now()+oneYear))
    const dateInputRef = useRef<HTMLInputElement>(null)
    const user = useSelector((state:RootState)=>state.user.user)
    const token = useSelector((state:RootState)=>state.token.token)
    const navigate = useNavigate()

    async function HandleAddSlot(){
        if (!token || !user){
            return navigate('/auth')
        }
        if(isloading) return
        const {error} = slotJoiSchema.validate({name,email,type,eventDate,relationship})
        if (error){
           return toast(error.message)
        }
        setIsLoading(true)
        try {
            let response;
            if (type=='event'){
                 response = await api.post('/slot/create',{name,email:user.email,type,eventDate,relationship})
            }   
            else{
                response = await  api.post('/slot/create',{name,email,type,eventDate,relationship})
            }
            if (response.data.success == false){
                return toast.error(response.data.message)
            }
            setSlotList(prev => [response.data.data, ...(prev || [])])
            if (type=='event'){
                setDisplayedSlotIndex(1)
            }
            else{
                setDisplayedSlotIndex(0)
            }
        }
        catch (error) {
            if (axios.isAxiosError(error)){
                toast(error.response?.data.message)
            }
        }
        finally{
            setIsLoading(false)
            setName("")
            setEmail("")
            setRelationship("")
            setEventDate(new Date(Date.now()+oneYear))
        }
    }


  return (
    <div className='fixed flex justify-center text-white items-center w-screen h-screen bg-background/70 z-50 backdrop-blur-sm'>
        <SpotlightBorder className="w-full sm:w-[90%] relative max-w-[800px] h-[500px] flex text-sm">
            <div className="flex-1 p-4 h-full flex flex-col text-sm justify-between items-center">
                <div className="flex flex-col gap-1 items-center">

                    <div className="text-xl flex gap-2 font-semibold mt-6 text-nowrap sm:mt-0"> <TextScramble texts={['Create a']} letterSpeed={30} nextLetterSpeed={30}/> <span className="text-primary"><TextScramble texts={['Timeslot']} letterSpeed={30} nextLetterSpeed={30}/></span></div>
                    <div className="text-sm w-full text-center">
                        <TextScramble key={type} texts={[type=='event'?'Get email notifications about your upcoming events.':'Automatically send birthday emails to your selected contacts.']} letterSpeed={3} nextLetterSpeed={3} pauseTime={4000} />
                    </div>
                    
                    <div className="flex flex-col mt-3 gap-2 items-center">
                        <input type='text' placeholder={`${type=='birthday'?'Recipient name':'Event title'}`} value={name} onChange={(e)=>{setName(e.target.value)}} className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3" />

                        {type=='birthday'&&(
                            <input type='text' value={relationship} onChange={(e)=>{setRelationship(e.target.value)}} placeholder="Relationship to recipient" className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3" />
                        )}
                        
                        {type=='birthday'&&(
                            <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Recipient email' className="w-full xxs:w-72 md:w-80 h-10 border border-muted focus:border-border-active focus:outline-0 p-3" />
                        )}

                        <div className='flex flex-col sm:flex-row h-10 justify-between w-full items-center gap-2'>
                            <div className='flex-1 w-full sm:w-1/2 p-2 border border-muted h-full flex gap-2 items-center'>
                                <button type="button" className='text-2xl cursor-pointer' >
                                    <CiCalendar onClick={() => dateInputRef.current?.showPicker()} />
                                </button>
                         
                                <p className=''>
                                    {eventDate.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})} 
                                </p>

                                <input type="date" ref={dateInputRef} min={new Date().toISOString().split("T")[0]} name="" id="" className='size-5 sr-only' onChange={(e)=>{
                                    const todaysDate = new Date()
                                    const changedDate = new Date(e.target.value)
                                    todaysDate.setHours(0,0,0,0)
                                    changedDate.setHours(0,0,0,0)
                                    
                                    if (changedDate>=todaysDate){
                                        setEventDate(new Date(e.target.value))
                                    }
                                    else{
                                        toast("Your due date cant be in the past")
                                    }
                                }}/>
                            </div>
                            
                            <Listbox value={type} onChange={setType} >
                                <div className='relative w-full sm:translate-y-0 sm:w-1/2 border border-muted h-10 focus:outline-0'>
                                    <ListboxButton className='w-full h-full flex justify-between items-center p-2 capitalize'>
                                        {type}
                                        <IoChevronDownSharp className='ml-2' />
                                    </ListboxButton>
                                    <ListboxOptions className='absolute focus:outline-0 w-full bg-border-muted'>
                                        {
                                            slotTypes.map((item,index)=>{
                                                return(
                                                    <ListboxOption key={index} value={item} className={({ focus, selected }) =>`cursor-pointer capitalize select-none p-2 ${focus ? "bg-primary text-white" : selected ? "bg-lightgrey" : ""}`} >
                                                        {item}
                                                    </ListboxOption>
                                                )
                                            })
                                        }
                                    </ListboxOptions>
                                </div>
                            </Listbox>
                        </div>

                        
                        
                    </div>
                </div>

                <div onClick={HandleAddSlot} className="flex flex-col gap-2 items-center">
                    <button className={`p-2 px-4 font-medium relative cursor-pointer ${isloading?"bg-muted":"hover:bg-primary-100 bg-primary"} text-background`}>
                        <TextScramble texts={['Add']} letterSpeed={30} nextLetterSpeed={30}/>
                        {isloading&&(
                        <div className="absolute  text-2xl justify-center items-baseline inset-0 flex bg-muted/60">
                            <p className=" animate-spin">/</p>
                        </div>
                        )}
                    </button>
                </div>
            </div> 

            <div className="flex-1 justify-center items-center h-full bg-background hidden md:flex flex-col text-sm">
                {type=="event"?(<Eventslot name={name} eventDate={eventDate} />):(<Birthdayslot name={name} email={email} relationship={relationship}  eventDate={eventDate}/>)}
            </div>

            <IoClose onClick={()=>{setShowAddForm(false)}} className='absolute right-3 top-3 text-2xl hover:text-primary'/>
            
        </SpotlightBorder>
    </div>
  )
}
