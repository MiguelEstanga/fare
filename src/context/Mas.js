import { createContext, useState } from "react";

 export const MasContext = createContext()
function MAS({
    children
}) {
    const [option , setOption] = useState('perfil')
    return ( <MasContext.Provider
        value={{
            option,
            setOption
        }}
    >
        {children}
    </MasContext.Provider> );
}

export default MAS;