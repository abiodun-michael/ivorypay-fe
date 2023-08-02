import { ToggleSwitch } from "flowbite-react"
import { useEffect, useState } from "react"



const Toggle = ({value, onChange=()=>{},...rest})=>{
    const [state, setState] = useState(false)

    useEffect(()=>{
        setState(value)
    },[])

    const handleChange = ()=>{
        onChange(!state)
        setState(!state)
    }

    return(
        <ToggleSwitch checked={state} onChange={handleChange} {...rest}/>
    )
}

export default Toggle