import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Options from "./Options";
import Profile from "./Perfil";
import { Preguntas } from "./Preguntas";
import { Reporte } from "./Reporte";
import { useContext } from "react";
import { MasContext } from "../../context/Mas";

function MasOpciones() {
    const Tab = createNativeStackNavigator()
    const { options }  =  useContext(MasContext)
    return (  

        <Tab.Navigator>
            
            <Tab.Screen
                name="Perfil"
                component={Profile}
                options={{
                   title:"Perfil",
                   headerTitleAlign:"center",
                   headerTintColor:"#152559"
                }}
            />

            <Tab.Screen
                name="Preguntas"
                component={Preguntas}
                options={{
                    headerTitleAlign:"center",
                    headerTintColor:"#152559"
                }}
            />
            <Tab.Screen
                name="Reporte"
                component={Reporte}
                
                    options={{
                        headerTitleAlign:"center",
                        headerTintColor:"#152559",
                        title:'Reporte por Robo o extravío'
                    }}
                
            />
        </Tab.Navigator>
    );
}

export default MasOpciones;