import { useEffect, useState } from "react"
import { axiosConfig } from "./config"
import { getToken } from "../../redux/slices/app"
import { useSelector } from "react-redux"



export const useQuery = (url, options)=>{

    const token = useSelector(getToken)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const handleQuery = async()=>{
        setLoading(true)
        try{
            const {data} = await axiosConfig.request({
                method:"GET",
                url,
                headers:{
                    Authorization: `Bearer ${token}`
                },
                ...options
            })

            setData(data)
            if(options?.onComplete){
                options?.onComplete(data)
            }
        }catch(error){
            setError(error)
            if(options?.onError){
                options?.onError(error?.response?.data)
            }
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(url){
            handleQuery()
        }
    },[])

    return{loading, error, data, refetch:handleQuery}
}