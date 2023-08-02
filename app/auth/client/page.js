'use client'

import { Form, Formik } from "formik"
import { Button, Input } from "../../../components"
import { useMutation } from "../../../util/http-hooks"
import { toast } from "react-hot-toast"
import { string } from "../../../util/constants"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setToken } from "../../../redux/slices/app"



const Page = ()=>{

    const dispatch = useDispatch()

    const router= useRouter()
    const [login,{loading}] = useMutation('/users/auths/login',{
        onComplete(payload){
            localStorage.setItem(string.TOKEN, payload.token)
            dispatch(setToken(payload.token))
            toast.success(payload.message)
            router.replace('/account/clients')
        },
        onError(error){
            toast.error(error.message)
        }
    })

    return(
        <>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your client account</h2>
        </div>

        <Formik
            onSubmit={(e)=>{
                login(e)
            }}
            initialValues={{email:'', password:''}}>
                {({values, handleChange, handleSubmit})=>(
             <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form className="space-y-6">
                    <Input 
                        label="Email Address" 
                        type="email" required
                        name="email"
                        onChange={handleChange}
                        value={values.email}/>

                    <Input type="password" 
                        name="password" 
                        label="Password"
                        onChange={handleChange}
                        value={values.password}/>
                    <Button block onClick={handleSubmit}>{loading ? 'Loading...':"Sign In"}</Button>
                </Form>
            </div>
        )}</Formik>
        </>
    )
}

export default Page