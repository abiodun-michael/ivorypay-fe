'use client'

import { useEffect, useState } from "react"
import { setPageTitle } from "../../../../redux/slices/app"
import { useDispatch } from "react-redux"
import { useQuery, useMutation } from "../../../../util/http-hooks"
import { Button } from "../../../../components"
import InviteUserModal from "./invite-user-modal"
import {toast} from 'react-hot-toast'
import { Spinner } from 'flowbite-react';
import UserList from "./user.list"

const Page = ()=>{
    const [open, setOpen] = useState(false)
    const [id, setId] = useState("")

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setPageTitle("Users"))
    },[])

    const {loading, data, refetch} = useQuery('/users')

    const [updateStatus] = useMutation(`/users/auths/${id}/status`,{
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
        if(id){
            updateStatus()
        }
    },[id])

    return(
        <>
        <InviteUserModal open={open} onClose={()=>setOpen(false)} onDone={()=>{
        setOpen(false)
        refetch()
            }}/>
            {
            loading ? <Spinner aria-label="Default status example" /> :
                <>
                <div style={{display:"flex", justifyContent:"end", marginBottom:20}}><Button onClick={()=>setOpen(true)}>New User</Button></div>
                <UserList data={data}/>
            </>
}
</>
    )
}

export default Page