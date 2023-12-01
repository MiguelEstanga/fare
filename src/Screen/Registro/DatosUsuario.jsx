import { View, Text } from "react-native";
import Titulo from "../../component/Titulo";
import Table from "../../component/Table";
import Btn from "../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { RegistroContext } from "../../context/Registrar";
import axios from "axios";
function DatosUsuario() {
    const navegacion  = useNavigation()
    const {data , setData , telefonoC} = useContext(RegistroContext)
    const handle_navegacion = ()=>{
      if(data !=null ){
        navegacion.navigate("Password")
        
      }
    }
    const Tarjeta = () => {
      const headers = {
        "Content-Type": "application/json",
        "Credenciales": "R2VuZXJpY1VzZXI6RG51LjEyMw==",
      };
      axios
        .post(
          "http://45.32.4.114/wsAppConnect_FR_SB/api/ObtenerDatosTarjeta/",
          {
            IDSolicitud: "",
            telefono:telefonoC,
          },
          {
            headers,
          }
        )
        .then((res) => {
            setData({...res.data})
            console.log(data)
        });
    };

    useEffect(() => {
        Tarjeta()
    } , [])

  return (
    <View style={{backgroundColor:'#FFFFFF' , height:"100%"}}>
      <View>
        <Titulo titulo={"Confirmación de usuario"} />
      </View>
      <View style={{paddingLeft:30}} >
        <Text style={{width:296 , fontSize:16 , marginTop:10}} >
        Verifica tus datos, si hay algún error comunícate con FAREFO vía
        WhatsApp al teléfono: 55 7122 6559.
        </Text>
      </View>
      <View style={{marginTop:20}} >
            <Table
                color={'#FFFFFF'}
                titulo={'Nombre:'}
                info={data.Nombre}
            />
             <Table
                color={'#E5E7ED'}
                titulo={'Teléfono:'}
                info={data.Telefono}
            />
             <Table
                color={'#FFFFFF'}
                titulo={'Correo Electrónico:'}
                info={data.Correo}
            />
      </View>
      <View style={{justifyContent:"center" , alignItems:"center" , marginTop:50}} >
        <Btn
            texto={'Continuar'}
            color={"#152559"}
            evento={handle_navegacion}
        />
      </View>
     
    </View>
  );
}

export default DatosUsuario;
