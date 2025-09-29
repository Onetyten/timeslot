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
import { CiUser } from "react-icons/ci";
import { SlEvent } from "react-icons/sl";



interface propType{
    slot:slotType
    index:number,
    setSlotList:React.Dispatch<React.SetStateAction<slotType[]>>
}

export default function TimeslotList(props:propType) {
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
    <SpotlightBorder className={` w-full sm:w-sm text-white ${isdeleting?'hidden':'flex'} relative flex-col p-3 sm:p-4 h-full items-center gap-4 justify-center text-center`}>
        <div className="flex w-full items-center gap-2 justify-between">
            <div>
                {slot.type=='event'?(<MdEvent className="text-xl text-primary" />):(<LiaBirthdayCakeSolid className="text-xl text-primary" />)}
            </div>
            {slot.name.length<32?(
            <p className="capitalize text-center text-sm sm:text-lg text-white">
                {slot.name}
            </p>
            ):(
                <p className="capitalize text-center text-sm sm:text-lg text-white">
                {   slot.name.slice(0,24)}...
                </p>
            )}

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

    
            <div className="flex w-full justify-start gap-3 sm:gap-4 items-start ">
                <div className='border flex justify-center items-center overflow-hidden border-border-muted min-h-14 min-w-14 sm:min-w-20 sm:min-h-20 rounded-full' >
                    {slot.type=='event'?(<SlEvent className='size-6 sm:size-9 text-muted'/>):(<CiUser className='size-6 sm:size-10 text-muted' />)}
                </div>

                <div className='capitalize flex text-xs sm:text-sm flex-col justify-center gap-2 h-full'>
                    {slot.type=='birthday'&&(
                        <div className='flex gap-1'>
                            <p className='text-muted'>Email:</p>
                                {slot.email.length<32?(
                                    <p className='text-wrap'> {slot.email}</p>
                                    ):(
                                    <p className='text-wrap'> { slot.email.slice(0,20)}... </p>
                                )}
                        </div>
                    )}
                    {slot.type=='birthday'&&(
                        <div className='flex gap-1'>
                            <p className='text-muted'>Relationship:</p>
                            {slot.relationship.length<32?(
                                <p className="text-white">
                                    {slot.relationship}
                                </p>
                                ):(
                                <p className="text-white">
                                    { slot.relationship.slice(0,24)}...
                                </p>
                            )}
                        </div>
                    )}
                    <div className="flex gap-1">
                    <p className='text-muted capitalize'>{slot.type} {slot.type=='event'?'Date':''}:</p>
                    <p>
                        {new Date(slot.eventDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})}
                    </p>
                    </div>
                </div>
            </div>
        <div className="flex w-full justify-center items-center bg-primary/20 p-2 text-primary rounded-md">
            <CardCountdown targetDate={new Date(slot.eventDate)} />
        </div>
    </SpotlightBorder>
  )
}
