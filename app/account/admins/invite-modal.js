import { Modal } from "flowbite-react"
import { Form, Formik } from "formik"
import { Button, Input } from "../../../components"
import { useMutation } from "../../../util/http-hooks"
import { toast } from "react-hot-toast"



const InviteAdminModal = ({open, onClose=()=>{}, onDone=()=>{}})=>{

  const [invite,{loading}] = useMutation('/admins/auths/invite',{
    onComplete(payload){
        toast.success(payload.message)
        onDone()
    },
    onError(error){
        toast.error(error?.message)
    }
})

    return(
        <Modal show={open} onClose={onClose} size="md" popup >
        <Modal.Header/>
        <Modal.Body>
        <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Invite and admin</h3>
            <Formik
              initialValues={{email:"", fullName:"", password:""}}
              onSubmit={(e)=>{
                invite(e)
              }}>{({values, handleChange, handleSubmit})=>(
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form className="space-y-6">
                <Input 
                  name="fullName" 
                  label="Full Name"
                  value={values.fullName}
                  onChange={handleChange}/>
                <Input 
                  name="email" 
                  type="email" 
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}/>
                <Input 
                  type="password" 
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange} />

                  <Button block onClick={handleSubmit}>{loading ?'Loading...':"Invite Admin"}</Button>
              </Form>
              </div>
            )}</Formik>
  
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default InviteAdminModal