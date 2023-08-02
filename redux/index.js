'use client'

const { Provider } = require("react-redux")
const { store } = require("./store")



const Index = ({children})=>{

    return(
        <Provider store={store}>{children}</Provider>
    )
}

export default Index