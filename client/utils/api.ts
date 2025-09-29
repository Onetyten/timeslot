/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { store } from './store'
import { clearUser } from '../state/userSlice'
import { clearToken, setToken } from '../state/tokenSlice'


const baseURL =
     // @ts-ignore
  import.meta.env.MODE === "development"?"http://localhost:3210": ""; 

const api = axios.create({
  baseURL,
});
declare module 'axios' {
  export interface AxiosRequestConfig {
    _retry?: boolean
  }
}

api.interceptors.request.use((config)=>{
    const state = store.getState()
    const token = state.token.token
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})


let is_Refreshing = false
let failedQueues:any[] = []

const processQueue = (error:any,token:string | null = null)=>{
    failedQueues.forEach(prom=>{
        if (token){
            prom.resolve(token)
        }
        else{
            prom.reject(error)
        }
    })
    failedQueues =[]
}

api.interceptors.response.use(
    response=>response,
    async(error) => {
        const originalRequest = error.config
        if (error.response?.data?.code == "TOKEN_EXPIRED" && !originalRequest._retry){
            if (is_Refreshing){
                return new Promise((resolve,reject)=>{
                    failedQueues.push({
                        resolve:(token:string)=>{
                            originalRequest.headers["Authorization"] = `Bearer ${token}`
                            resolve(api(originalRequest))
                        },
                        reject:(err:any)=>reject(err)
                    })
                })
            }
            is_Refreshing = true
            originalRequest._retry = true

            try {

                const res = await axios.post(`${baseURL}/user/token/session`,{ refreshToken: store.getState().user.user?.refreshToken })
                const newToken = res.data.token
                store.dispatch(setToken(newToken))
                processQueue(null,newToken)
                originalRequest.headers["Authorization"] =`Bearer ${newToken}`
                return api(originalRequest)
            }
            catch (error) {
                processQueue(error,null)
                store.dispatch(clearUser())
                store.dispatch(clearToken())
                return Promise.reject(error)
            }
            finally{
                is_Refreshing = false
            }
        }
        return Promise.reject(error)
    }
)

export default api