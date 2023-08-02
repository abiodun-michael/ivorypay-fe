import moment from "moment"
import { Toggle } from "../../../components"

const AdminList = ({data=[]})=>{

    return(
        <div className="relative overflow-x-auto">
        
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Created At
                </th>
                <th scope="col" className="px-6 py-3">
                    ...
                </th>
            </tr>
        </thead>
        <tbody>
            {
                data?.map(({fullName, email, id, createdAt, isRevoked})=>(
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={id}>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {fullName}
                    </th>
                    <td className="px-6 py-4">
                        {email}
                    </td>
                    <td className="px-6 py-4">
                        {moment(createdAt).format('DD MMM, YYYY')}
                    </td>
                    <td className="px-6 py-4">
                    <Toggle
                    value={!isRevoked}
                        onChange={()=>setId(id)}
                    />
            
                    </td>
                </tr>
                ))
            }
        
        </tbody>
    </table>
    </div>
    )
}

export default AdminList