
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from './Dashboard'
import Auth from './Auth'
import ToastContainer from './components/ToastContainer'
import {Provider} from 'react-redux' 
import {persistor, store} from '../utils/store'
import { PersistGate } from 'redux-persist/integration/react'


function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <ToastContainer/>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/auth' element={<Auth/>}/>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}
export default App
