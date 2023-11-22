import { ReactNode, createContext, useState } from "react";
import PropertyList from "./PropertyList";
import CreateProperty from "./CreateProperty";

type AgencyPropertyContextType = {
    position:number[],
    setPosition:(position:number[])=>void
}

export const AgencyPropertyContext = createContext<AgencyPropertyContextType>({
    position:[10,20],
    setPosition:(position:number[])=>{}
})


type AgencyPropertyProviderProps = {
    children:ReactNode
}
export const PNavbar = () => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <div className="d-flex flex-row-reverse bg-white  p-2 border-bottom">
            <CreateProperty />
        </div>
    )
}


const AgencyPropertyProvider = ({children}:AgencyPropertyProviderProps)=>{
    const [position, setPosition] = useState<number[]>([])
    return(
        <AgencyPropertyContext.Provider value={{position, setPosition}}>
            {children}
        </AgencyPropertyContext.Provider>
    )
}

const AgencyPropertyApp = () => {    
    return (
        <AgencyPropertyProvider>
            <PNavbar />
            <PropertyList></PropertyList>
        </AgencyPropertyProvider>
    )
}
export default AgencyPropertyApp