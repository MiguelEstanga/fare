import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Titulo from "../../component/Titulo";
import { useState, useContext, useEffect } from "react";
import ModalCodigo from "../../component/ModalCodigo";
import Btn from "../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { RegistroContext } from "../../context/Registrar";
import axios from "axios";
import { ModalAlert } from "../../component/Modal";
function Registro() {
  const navegacion = useNavigation();
  const [seconds, setSeconds] = useState(300);
  const [ok, setOk] = useState(false);
  const [token, setToken] = useState(false);
  const { telefonoC, code } = useContext(RegistroContext);

  const handle_navegacion = () => {
    navegacion.navigate("DatosUsuario");
    console.log("navegacion");
  };

const registro = () => {
  
    const headers = {
      "Content-Type": "application/json",
      "Credenciales": "R2VuZXJpY1VzZXI6RG51LjEyMw==",
    };
    axios
      .post(
        "http://45.32.4.114/wsAppConnect_FR_SB/api/ValidarSMSOnb",
        {
          "Usuario":"9541808934",
          "TokenSMS":code
        },
        {
          headers,
        }
      )
      .then((res) => {
          console.log(res.data)
         if (res.data.CodigoRespuesta=== '0') {
          navegacion.navigate("DatosUsuario");             
        } else {
          setModal(true);
        }
      })
      .finally((res) => {
        //navegacion.navigate("Registro");
      });
  };

  const inputFields = Array.from({ length: 6 }, (_, index) => (
    <TextInput
      key={index}
      style={style.input}
      keyboardType="number-pad"
      maxLength={1}
      value={code[index]}
    />
  ));

  useEffect(() => {
    if(code){
      setOk(true)
    }
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds} `;
  };

  return (
    <View style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <ModalAlert
        modal={token}
        setmodal={setToken}
        mensage={"El codigo expiro"}
      />
      <View>
        <Titulo titulo={"Escribe tu código"} />
      </View>
      <View style={style.containerLeyenda}>
        <Text>
          Captura del código de verificación enviado vía SMS al teléfono
          registrado, el mensaje puede tardar un minuto en llegar:
        </Text>
      </View>
      <View style={{ paddingLeft: 30, marginTop: 10 }}>
        <Text style={{ color: "#152559", fontSize: 16 }}>
          Enviado al teléfono:
        </Text>
      </View>
      <View style={style.code}>
        <Text style={{ fontSize: 30 }}> {telefonoC}</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#152559", fontSize: 16 }}>
          <Text>
            <Image source={require("../../../assets/png/tiempo.png")} />
          </Text>{" "}
          Tú código vence en:
        </Text>
        <Text style={{ fontSize: 16 }}>
          <Text style={{ color: "#D1103A", fontSize: 16, marginTop: 10 }}>
            {formatTime(seconds)}
          </Text>
          minutos
        </Text>
      </View>
      <View>
        <View style={style.containerInput}>
          {ok == false
            ? Array.from({ length: 6 }, (_, index) => (
                <TextInput
                  key={index}
                  style={style.input}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))
            : inputFields}
        </View>
        <ModalCodigo token={code} evneto={setOk} estado={ok} />
      </View>
      <View style={style.reenviar}>
        <Text style={{ fontSize: 14, fontWeight: "900", marginBottom: 10 }}>
          ¿No te llegó el SMS?
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "300", width: 310 }}>
          Si el teléfono no es el correcto, regresa y corrige tu número. Si el
          teléfono es correcto vuelve a enviar tu código:
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontSize: 14,
            fontWeight: "400",
            color: "#636E90",
            borderBottomWidth: 1,
            width: 140,
            borderColor: "#636E90",
          }}
        >
          Enviar nuevo mensaje
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          justifyContentL: "center",
          alignItems: "center",
        }}
      >
        <Btn
          color={"#152559"}
          texto={"Verificando"}
          evento={() => registro() }
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  reenviar: {
    paddingLeft: 30,
  },
  containerLeyenda: {
    paddingLeft: 30,
    marginTop: 10,
    lineHeight: 30,
    color: "#444444",
    fontSize: 16,
    fontWeight: "300",
  },
  code: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#2F3D6B",
    padding: 10,
    margin: 3,
    width: 49,
    height: 84,
    textAlign: "center",
    borderRadius: 4,
    backgroundColor: "rgba(47, 61, 107, .2)",
  },
});
export default Registro;
