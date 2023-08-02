'use client'

import { useEffect, useState } from "react"
import {Button} from '../../../components'
import DepositModal from "./deposit-modal"
import WithdrawModal from "./withdraw-modal"
import TransferModal from "./transfer-modal"
import { useQuery } from "../../../util/http-hooks"
import { Spinner } from "flowbite-react"


const Page=()=>{

    const [openDeposit, setOpenDeposit] = useState(false)
    const [openWithdraw, setOpenWithdraw] = useState(false)
    const [openTransfer, setOpenTransfer] = useState(false)

    // const dispatch = useDispatch()

    useEffect(()=>{
        // dispatch(setPageTitle("Dashboard"))
    },[])

    const {data, refetch, loading} = useQuery('/users/wallets/me')

    return(
        <>
        {
            loading ? <Spinner aria-label="Default status example" />:
        
        <div>
            <h1 className="text-base font-bold tracking-tight text-gray-900 sm:text-4xl">
              NGN {data?.balance?.toLocaleString()}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Wallet Balance
            </p>

            <div className="flex gap-20 my-4">
             <Button onClick={()=>setOpenDeposit(true)}>Deposit</Button>
             <Button onClick={()=>setOpenTransfer(true)}>Transfer</Button>
             <Button onClick={()=>setOpenWithdraw(true)}>Withdraw</Button>

            </div>
        </div>
    }

        <DepositModal open={openDeposit} onClose={()=>setOpenDeposit(false)} onDone={()=>{
            setOpenDeposit(false)
            refetch()
        }}/>

        <WithdrawModal open={openWithdraw} onClose={()=>setOpenWithdraw(false)} onDone={()=>{
            setOpenWithdraw(false)
            refetch()
        }}/>

        <TransferModal open={openTransfer} onClose={()=>setOpenTransfer(false)} onDone={()=>{
            setOpenTransfer(false)
            refetch()
        }}/>

        </>
    )
}

export default Page