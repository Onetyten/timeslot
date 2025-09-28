import storage from 'redux-persist/lib/storage'
import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import userReducer from '../state/userSlice'
import tokenReducer from '../state/tokenSlice'


const persistConfig={
    key:'root',
    version:1,
    storage,
    whitelist:['user','token']
}

const reducer = combineReducers({
    user:userReducer,
    token:tokenReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })
})


export const persistor = persistStore(store)

export type RootState = ReturnType< typeof store.getState>
export type AppDispatch = typeof store.dispatch