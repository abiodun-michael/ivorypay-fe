import { useState } from "react"
import { axiosConfig } from "./config"
import { useSelector } from "react-redux"
import { getToken } from "../../redux/slices/app"




export const useMutation = (url, options={})=>{

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const token = useSelector(getToken)

    const handleQuery = (inputObj={})=>{
        setLoading(true)
        return new Promise(async(resolve, reject)=>{
            try{

                const {data} = await axiosConfig.request({
                    method:"POST",
                    url,
                    headers:{
                        Authorization: `Bearer ${token}`
                    },
                    ...options,
                    data:inputObj
                })
    
                setData(data)
    
                if(options.onComplete){
                    options.onComplete(data)
                }

                resolve(data)
            }catch(error){
                if(error?.response?.data){
                    setError(error?.response?.data)
                reject(error?.response?.data)
                if(options.onError){
                    options.onError(error?.response?.data)
                }
                }
            }finally{
                setLoading(false)
            }
        })
    }

    return [handleQuery,{loading, error, data}]
}