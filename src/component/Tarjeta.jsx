import { View , Text, Image} from "react-native";
import { TarjetaContext } from "../context/Tarjeta";
import {useContext}  from "react"
function TarjetaFisica() {
    const {tarjeta} = useContext(TarjetaContext)
    return ( 

        <View
            style={{
                width:349,
                height:219,
                
                marginTop:10,
                marginBottom:10
            }}
        >
            <Image
                style={{
                    width:"100%",
                    height:"100%",
                    resizeMode:"cover"
                }}
                source={ require("../../assets/png/Fisica_tarjeta.png") }
            />
            <Text
                style={{
                    position:"absolute",
                    bottom:20,
                    fontSize:30,
                    left:"10%",
                    color:"#FFFFFF"
                }}
            >
                {tarjeta.Tarjeta}
            </Text>
        </View>
     );
}

export default TarjetaFisica;