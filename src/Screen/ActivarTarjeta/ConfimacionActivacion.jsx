import { View, Text, Modal, TextInput } from "react-native";
import Titulo from "../../component/Titulo";
import InputText from "../../component/InputText";
import Btn from "../../component/Btn";
import { useState , useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { LoginContext } from "../../context/Login";
import { ModalAlert } from "../../component/Modal";
function ConfimacionActivacion() {
    const [password , setPassword] = useState("")
    const {credenciales} = useContext(LoginContext)
    const [modal , setModal ] = useState(false)
  useEffect(()=>{console.log(password)} , [password])
   const navegacion =  useNavigation()

   const confirmar = () =>{
    console.log(password)
      if(credenciales.password.trim() === password.trim()){
        console.log(200)
        navegacion.navigate('ActivacionExitosa')

      }else{
        setModal(true)
      }
   }
  return (
    <View  style={{height:"100%" , backgroundColor:"#FFFFFF"}} >
      <ModalAlert
          modal={modal}
          setmodal={setModal}
          mensage={'El ID no coincide, vuelve a escribirla o comunícate con tu administrador FAREFO, vía WhatsApp al teléfono: 55 7122 6559'}
      />
      <View
        style={{
          width: "100%",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            color: "#444444",
            textAlign: "justify",

            width: "90%",
          }}
        >
Para poder activar tu tarjeta escribe la contraseña con la cual te diste de alta en la aplicación.        </Text>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <InputText
            label={'Contraseña'}
            placeholder={'******'}
            password={true}
            initPassword={true}
            eventoText={setPassword  }
        />
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 70,
        }}
      >
        <Btn
          color={"#152559"}
          texto={"Continuar"}
          evento={() => {confirmar()}}
          
        />
      </View>
    </View>
  );
}

export default ConfimacionActivacion;
