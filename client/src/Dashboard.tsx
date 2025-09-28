import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../utils/store'
import NavBar from './components/navBar'
import NewSlotForm from './components/NewSlotForm'



const slotTypes = ['birthday','event']


export default function Dashboard() {
    const navigate = useNavigate()
    const user = useSelector((state:RootState)=>state.user.user)
    const token = useSelector((state:RootState)=>state.token.token)
    const [displayedSlotIndex,setDisplayedSlotIndex] = useState(0)
    const [showAddForm,setShowAddForm] = useState(false)

    useEffect(()=>{
      if (!token || !user){
        navigate('/auth')
      }
    },[])


  return (
        <main className='w-screen min-h-screen bg-background flex items-center flex-col gap-4 text-border-muted'>
            <NavBar slotTypes={slotTypes} setShowAddForm={setShowAddForm} displayedSlotIndex={displayedSlotIndex} setDisplayedSlotIndex={setDisplayedSlotIndex} />
            
            {showAddForm&&<NewSlotForm setShowAddForm={setShowAddForm} slotTypes={slotTypes} displayedSlotIndex={displayedSlotIndex} setDisplayedSlotIndex={setDisplayedSlotIndex} />}
        </main> 
  )
}
