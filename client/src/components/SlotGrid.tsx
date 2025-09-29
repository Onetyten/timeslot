import type React from "react"
import type { slotType } from "../../types/types"
import BirthdayList from "./BirthdayList";

interface propType{
    slotList:slotType[],
    setSlotList:React.Dispatch<React.SetStateAction<slotType[]>>,
    slotLoading:boolean,
    displayedSlotIndex:number
    slotTypes:string[],
}

export default function SlotGrid(props:propType) {
    
    const {slotList,slotLoading,setSlotList,displayedSlotIndex} = props
        if (slotLoading){
        return(
            <div className="w-full mt-6 justify-center items-center gap-2 flex flex-col">
                <p>
                    Loading Timeslots
                </p>
                <p className="animate-spin text-2xl text-primary">
                    /
                </p>
            </div>
        )
    }
    if (!slotLoading && (!slotList || slotList.length==0)){
        if (displayedSlotIndex ==0){
            return(
                <div className="w-full mt-6 justify-center items-center gap-4 flex">
                    <p>
                        No timeslot available, create a timeslot
                    </p>
                </div>
            )
        }
        else{
            return(
                <div className="w-full mt-6 justify-center items-center gap-4 flex">
                    <p>
                        No timeslot available, create a timeslot
                    </p>
                </div>
            )
        }
    }
    
    const birthdaySlots = slotList.filter(slot=>slot.type=='birthday')
    const eventSlots= slotList.filter(slot=>slot.type=='event')



  return (
    <div className='grid grid-cols-3 mt-6 gap-4 items-center'>
        {displayedSlotIndex==0 ? (
            birthdaySlots.map((item,index:number)=>{
                return(
                    <BirthdayList setSlotList={setSlotList} slot={item} index={index} key={index}/>
            )}))
        :
        (
        eventSlots.map((item,index)=>{
            return(
               <BirthdayList setSlotList={setSlotList} slot={item} index={index} key={index}/>
            )}))
        }
    </div>
  )
}
