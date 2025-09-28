import { TextScramble } from '@skyshots/react-text-scrambler'
import type React from 'react'
import type { RootState } from '../../utils/store'
import { useSelector } from 'react-redux'

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
    <div className='w-full sticky h-14 flex justify-between items-center border-b border-border-muted px-3'>
            <div className='capitalize text-xl text-white max-w-20'>
            <TextScramble texts={[user?.name||"Name"]} letterSpeed={40} nextLetterSpeed={60} pauseTime={2000}/>
            </div>
            
            <div className='bg-box flex overflow-hidden rounded-sm'>
            {slotTypes.map((item,index)=>{
                return(
                <div onClick={()=>{setDisplayedSlotIndex(index)}} className={`cursor-pointer capitalize p-2 px-6 ${index==displayedSlotIndex?"bg-primary text-background":""}`} key={index}>
                    {item}s
                </div>
                )
            })}
            </div>
            <button onClick={()=>{setShowAddForm(true)}} className={`p-2 px-4 font-medium relative cursor-pointer hover:bg-primary-100 bg-primary text-background`}>
                Add new slot
            </button>
        </div>
  )
}
