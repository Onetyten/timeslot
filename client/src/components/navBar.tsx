import { TextScramble } from '@skyshots/react-text-scrambler'
import type React from 'react'
import type { RootState } from '../../utils/store'
import { useSelector } from 'react-redux'
import { FaPlus } from "react-icons/fa6";

interface propTypes{
    slotTypes:string[],
    setDisplayedSlotIndex: React.Dispatch<React.SetStateAction<number>> ,
    setShowAddForm: React.Dispatch<React.SetStateAction<boolean>> ,
    displayedSlotIndex:number
}

export default function NavBar(props:propTypes) {
    const {slotTypes,setDisplayedSlotIndex,setShowAddForm,displayedSlotIndex} = props
    const user = useSelector((state:RootState)=>state.user.user)


  return (
    <div className='w-full fixed z-20 bg-background h-16 flex justify-between items-center border-b border-border-muted px-3 sm:px-6'>
            <div className='capitalize flex sm:hidden text-3xl text-white'>
                <TextScramble texts={[user?.name.slice(0,1)||"A"]} letterSpeed={40} nextLetterSpeed={60} pauseTime={2000}/>
            </div>
            <div className='capitalize hidden sm:flex text-3xl text-white max-w-20'>
                <TextScramble texts={[user?.name||"Name"]} letterSpeed={40} nextLetterSpeed={60} pauseTime={2000}/>
            </div>
            
            <div className='bg-box flex overflow-hidden rounded-sm'>
            {slotTypes.map((item,index)=>{
                return(
                <div onClick={()=>{setDisplayedSlotIndex(index)}} className={`cursor-pointer text-xs  sm:text-base capitalize p-1 px-4 w-20 sm:w-28 text-center ${index==displayedSlotIndex?"bg-primary text-background":""}`} key={index}>
                    {item}s
                </div>
                )
            })}
            </div>

            <button onClick={()=>{setShowAddForm(true)}} className={`p-2 px-4 hidden sm:flex font-medium relative cursor-pointer hover:bg-primary-100 bg-primary text-background`}>
                Add new slot
            </button>
            
            <button onClick={()=>{setShowAddForm(true)}} className={`flex sm:hidden relative cursor-pointer hover:text-primary-100 text-xl text-primary`}>
                <FaPlus />
            </button>
        </div>
  )
}
