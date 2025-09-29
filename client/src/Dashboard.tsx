import { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../utils/store'
import NavBar from './components/navBar'
import NewSlotForm from './components/NewSlotForm'
import SlotGrid from './components/SlotGrid'
import axios from 'axios'
import toast from 'react-hot-toast'
import api from '../utils/api'
import type { slotType } from '../types/types'



const slotTypes = ['birthday','event']


export default function Dashboard() {
    const navigate = useNavigate()
    const [slotList,setSlotList] = useState<slotType[]>([])
    const [slotLoading,setSlotLoading] = useState(false)
    const user = useSelector((state:RootState)=>state.user.user)
    const token = useSelector((state:RootState)=>state.token.token)
    const [displayedSlotIndex,setDisplayedSlotIndex] = useState(0)
    const [showAddForm,setShowAddForm] = useState(false)

    async function fetchSlots () {
        if (!token || !user){
          navigate('/auth')
        }
        setSlotLoading(true)
        try {
          const res = await api.get('/slot/fetch')
          if (res.data.success == false){
              return setSlotList([])
          }
          setSlotList(res.data.data)
        }
        catch (error) {
          if (axios.isAxiosError(error)){
              toast(error.response?.data.message)
              console.log(error.response?.data.message)
          }
        }
        finally{
          setSlotLoading(false)
        }
    }
    useEffect(()=>{
    fetchSlots()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[navigate, token, user])


  return (
        <main className='w-screen min-h-screen bg-background flex items-center flex-col gap-4 text-border-muted'>
            <NavBar slotTypes={slotTypes} setShowAddForm={setShowAddForm} displayedSlotIndex={displayedSlotIndex} setDisplayedSlotIndex={setDisplayedSlotIndex} />
            <SlotGrid slotList={slotList} slotTypes ={slotTypes} displayedSlotIndex={displayedSlotIndex} setSlotList={setSlotList} slotLoading={slotLoading} />
            {showAddForm&&<NewSlotForm setShowAddForm={setShowAddForm} slotTypes={slotTypes} setSlotList={setSlotList} displayedSlotIndex={displayedSlotIndex} setDisplayedSlotIndex={setDisplayedSlotIndex} />}
        </main> 
  )
}
