'use client'

import { useEffect, useState } from "react"
import { setPageTitle } from "../../../redux/slices/app"
import { useDispatch } from "react-redux"
import { useMutation, useQuery } from "../../../util/http-hooks"
import InviteAdminModal from "./invite-modal"
import { Button, Toggle } from "../../../components"
import { toast } from "react-hot-toast"
import { Spinner } from "flowbite-react"
import AdminList from "./admin-list"



const Page = ()=>{
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")

    const dispatch = useDispatch()



    const {loading, data, refetch} = useQuery('/admins')

    const [updateStatus] = useMutation(`/admins/auths/${id}/status`,{
        method:"PUT",
        onComplete(payload){
            toast.success(payload.message)
            setId("")
        },
        onError(error){
            toast.error(error.message)
        }
    })

 


    useEffect(()=>{
        dispatch(setPageTitle("Admins"))
    },[])

    useEffect(()=>{
        if(id){
            updateStatus()
        }
    },[id])

    return(
        <>
        {
            loading ? <Spinner aria-label="Default status example" />:
        
            <>
            <div style={{display:"flex", justifyContent:"end", marginBottom:20}}><Button onClick={()=>setOpen(true)}>New Admin</Button></div>
            <AdminList data={data} />
            </>
}
    <InviteAdminModal open={open} onClose={()=>setOpen(false)} onDone={()=>{
        setOpen(false)
        refetch()
    }}/>
    </>

    )
}

export default Page