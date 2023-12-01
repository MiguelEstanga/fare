import { View, Text, Modal, TextInput } from "react-native";
import Titulo from "../../component/Titulo";
import InputText from "../../component/InputText";
import Btn from "../../component/Btn";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { TarjetaContext } from "../../context/Tarjeta";
import { LoginContext } from "../../context/Login";
import { ModalAlert } from "../../component/Modal";
import { NipContext } from "../../context/NIP";
import axios from "axios";
import Loaded from "../../component/Loaded";
function ConfirmacionNip() {
  const [password, setPassword] = useState("");
  const { credenciales } = useContext(LoginContext);
  const {setNip}  = useContext(NipContext)
   const {tarjeta} = useContext(TarjetaContext)
  const [modal, setModal] = useState(false);
  const navegacion = useNavigation();

  const nip_consulta = () => {
    if (credenciales.password === password) {
      console.log(tarjeta.Tarjeta);
      const headers = {
        "Authorization": `Bearer ${credenciales.Token}`,
      };

      axios
        .post(
          "http://45.32.4.114/wsAppConnect_FR_SB/api/ConsultaNIP/",
          {
            "IDSolicitud":"1",
            "Tarjeta":tarjeta.Tarjeta,
            "MedioAcceso":"",
            "TipoMedioAcceso":""
          },
          {
            headers,
          }
        )
        .then((res) => {
            console.log(res.data)
            setNip(res.data.NIP)
        }).finally(res => {
          navegacion.navigate('NIP')
        })
      
    } else {
        setModal(true)
        
    }
  };

  
  return (
    <View>
    
        <ModalAlert
          modal={modal}
          setmodal={setModal}
          mensage={
            "Por el momento no podemos generar tu NIP, dirígete con tu administrador para que pueda proporcionártelo."
          }
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
            fontWeight: "300",
            color: "#444444",
            textAlign: "justify",

            width: "90%",
          }}
        >
          Para poder visualizar tu NIP escribe la contraseña con la cual te
          diste de alta en la aplicación.
        </Text>
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
          label={"Contraseña"}
          placeholder={"******"}
          password={true}
          eventoText={setPassword}
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
          evento={() => nip_consulta()}
        />
      </View>
    </View>
  );
}

export default ConfirmacionNip;
