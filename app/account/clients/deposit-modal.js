import { Modal } from "flowbite-react"
import { Form, Formik } from "formik"
import { Button, Input } from "../../../components"
import { useMutation } from "../../../util/http-hooks"
import { toast } from "react-hot-toast"



const DepositModal = ({open, onClose=()=>{}, onDone=()=>{}})=>{

  const [deposit,{loading}] = useMutation('/users/wallets/deposit',{
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Deposit Money</h3>
            <Formik
              initialValues={{amount:0}}
              onSubmit={(e)=>{
                deposit(e)
              }}>{({values, handleChange, handleSubmit})=>(
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <Form className="space-y-6">
                <Input 
                  name="amount" 
                  label="Amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}/>

                  <Button block onClick={handleSubmit}>{loading ?'Loading...':"Deposit"}</Button>
              </Form>
              </div>
            )}</Formik>
  
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default DepositModal