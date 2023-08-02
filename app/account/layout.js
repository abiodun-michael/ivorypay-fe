'use client'

import { useEffect } from "react"
import { setToken } from "../../redux/slices/app"
import { useDispatch } from "react-redux"
import { string } from "../../util/constants"

const Layout = ({children})=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        const token = localStorage.getItem(string.TOKEN)
        dispatch(setToken(token))
    },[])


    return children
}

export default Layout