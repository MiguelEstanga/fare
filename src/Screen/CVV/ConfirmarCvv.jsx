import { View, Text, Modal, TextInput } from "react-native";
import Titulo from "../../component/Titulo";
import InputText from "../../component/InputText";
import Btn from "../../component/Btn";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { LoginContext } from "../../context/Login";
import { TarjetaContext } from "../../context/Tarjeta";
import { ModalAlert } from "../../component/Modal";
import axios from "axios";
import { CvvContext } from "../../context/CVV";

function ConfirmarCvv() {
  const [password, setPassword] = useState("");
  const {credenciales} = useContext(LoginContext)
   const {  tarjeta  } = useContext(TarjetaContext)
    const {setCvv} = useContext(CvvContext)
   const [modal , setModal]  = useState(false)
  useEffect(() => {
    console.log(password);
  }, [password]);
  const navegacion = useNavigation();

  const generar_cvv = () => {
    console.log(password)
    if (credenciales.password === password) {
      
      const headers = {
        Authorization: `Bearer ${credenciales.Token}`,
      };

      axios
        .post(
          "http://45.32.4.114/wsAppConnect_FR_SB/api/GeneraCVV2Dinamico/",
          {
            IDSolicitud: "1",
            Tarjeta: tarjeta.Tarjeta,
            MedioAcceso: "",
            TipoMedioAcceso: "",
          },
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res.data);
          setCvv(res.data.CodigoValidacion);
          console.log(res.data.DescRespuesta)
        })
        .finally((res) => {
          navegacion.navigate("CreditoTab")
        });
    } else {
      setModal(true);
    }
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <ModalAlert
        modal={modal}
        setmodal={setModal}
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
          Para poder visualizar tu CVV escribe la contraseña con la cual te
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
          eventoText={ setPassword }
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
          evento={() =>  generar_cvv()}
        />
      </View>
    </View>
  );
}

export default ConfirmarCvv;
