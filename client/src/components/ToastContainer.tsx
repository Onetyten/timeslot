
import {Toaster} from 'react-hot-toast'


export default function ToastContainer() {
  return (
    <Toaster toastOptions={{
        duration:3000,
        style:{
          background:'#171717',
          color:'#ffffff',
          borderWidth:'1px',
          borderColor:'#3ECF8E',
          fontFamily:'Inconsolata, monospace',
          fontSize:'14px',
          borderRadius:'0px'
        }
      }}/>
  )
}
