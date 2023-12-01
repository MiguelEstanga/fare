import { createContext , useState} from "react";

 export const CvvContext = createContext()


function CVVProvider({children}) {
    const [cvv , setCvv] = useState(null)
    return ( 
        <CvvContext.Provider
            value={{
                cvv,
                setCvv
            }}
        >
            {children}
        </CvvContext.Provider>

     );
}

export default CVVProvider;