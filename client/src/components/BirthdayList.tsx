import type { slotType } from '../../types/types'
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import CardCountdown from "./CardCountdown";
import SpotlightBorder from './SpotlightBorder';
import { MdEvent } from "react-icons/md";
import { TbDots } from "react-icons/tb";
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from '../../utils/api';





interface propType{
    slot:slotType
    index:number,
    setSlotList:React.Dispatch<React.SetStateAction<slotType[]>>
}

export default function BirthdayList(props:propType) {
    const {slot,setSlotList} = props
    const [showOpts,setShowOpts] = useState(false)
    const [isdeleting,setIsDeleting] = useState(false)
    async function HandleDelete(){
        setIsDeleting(true)
        try {
            const response = await api.delete(`/slot/delete/${slot._id}`)
            if (response.data.success == false){
                return toast.error(response.data.message)
            }
            setSlotList(prev=>prev.filter(s=>s._id !== slot._id))
        }
        catch (error) {
            if (axios.isAxiosError(error)){
                toast(error.response?.data.message)
            }
        }
        finally{
            setIsDeleting(false)
        }
    }
    
  return (
    <SpotlightBorder className={` w-sm text-white ${isdeleting?'hidden':'flex'} relative flex-col p-4 h-full items-center gap-4 justify-center text-center`}>
        <div className="flex w-full items-center gap-2 justify-between">
            <div className="flex w-full items-center gap-2 justify-start">
                {slot.type=='event'?(<MdEvent className="text-xl text-primary" />):(<LiaBirthdayCakeSolid className="text-xl text-primary" />)}
                <p className="capitalize text-white">
                    {slot.name}
                </p>
            </div>
            <div>
                <OutsideClickHandler  onOutsideClick={()=>{setShowOpts(false)}}>
                    <TbDots onClick={()=>{setShowOpts(!showOpts)}}/>
                    {showOpts&&
                        <div className='absolute -right-2 z-10 top-10'>
                                <div onClick={HandleDelete} className='hover:bg-red-500 bg-box hover:border-0 cursor-pointer p-2 border border-border-muted'>
                                    Delete
                                </div>
                        </div>
                    }
                </OutsideClickHandler>
            </div>
        </div>



        {slot.type=='birthday'&&(
            <div className="flex w-full justify-between items-center ">
                <div className='capitalize'>
                    {slot.relationship}
                </div>
            </div>
        )}

        <div className="flex w-full justify-start text-primary font-mono">
            <CardCountdown targetDate={new Date(slot.eventDate)} />
        </div>
    </SpotlightBorder>
  )
}
