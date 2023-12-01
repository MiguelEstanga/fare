import { View, Text, Switch } from "react-native";
import Titulo from "../../component/Titulo";
import InputText from "../../component/InputText";
import { useContext, useState } from "react";
import Checkbox from "expo-checkbox";
import Btn from "../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { ModalAlert } from "../../component/Modal";
import axios from "axios";
import { RegistroContext } from "../../context/Registrar";
function CrearPassword() {
  const [isCarecter, setICaracter] = useState(false);
  const [isEspecial, setIsEspecial] = useState(false);
  const [isNumero, setIsNumero] = useState(false);
  const [isMayuscula, setIsMayuscula] = useState(false);
  const [isIgual, setIsIgual] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usuarioExiste, setUsuarioExiste] = useState(false);
  const [modal, setModal] = useState(false);
  const { data } = useContext(RegistroContext);
  const navegacion = useNavigation();

  const registrar = () => {
    if (
      isCarecter == true &&
     
      isNumero == true &&
      isEspecial == true
    ) {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(
          "http://45.32.4.114/wsAppConnect_FR_SB/api/RegistrarUsuario/",
          {
            Nombre: data.Nombre,
            PrimerApellido: data.ApellidoPaterno,
            SegundoApellido: data.ApellidoMaterno,
            NombreUsuario: "9541808934",
            Password: password,
            Movil: data.Telefono,
            Email: data.Correo,
          },
          {
            headers,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.CodRespuesta === "0002") {
            setUsuarioExiste(true);
          }

          if (res.data.CodRespuesta === "0000") {
            navegacion.navigate("registroexitoso");
          }
        });
    } else {
      setModal(true);
    }
  };

  const chequeo = (password) => {
    if (password === confirmPassword) {
      setIsIgual(true);
    } else {
      setIsIgual(false);
    }
    setConfirmPassword(password);
  };
  const checkPassword = (password) => {
    console.log(confirmPassword);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
      password
    );
    const hasUppercase = password.toLowerCase() !== password;
    const hasLowercase = password.toUpperCase() !== password;
    const has7Characters = password.length >= 7;

    setIsNumero(hasNumber);
    setIsEspecial(hasSpecialChar);
    setIsMayuscula(hasUppercase && hasLowercase);
    setICaracter(has7Characters);
    if (password === confirmPassword) {
      setIsIgual(true);
    } else {
      setIsIgual(false);
    }
    setPassword(password);
  };
  return (
    <View>
      <ModalAlert
        modal={modal}
        setmodal={setModal}
        mensage={"No cumples las condiciones"}
      />

      <ModalAlert
        modal={usuarioExiste}
        setmodal={setUsuarioExiste}
        mensage={"El nombre de usuario ya existe"}
      />
      <View>
        <Titulo titulo={"Crea tu contraseña"} />
      </View>
      <View style={{ alignItems: "center", width: "100%", borderEndWidth: 1 }}>
        <View>
          <InputText
            password={true}
            label={"Contraseña"}
            eventoText={checkPassword}
          />

          <View
            style={{
              marginTop: 20,
              gap: 10,
              marginLeft: 40,

              width: 220,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Checkbox color={"#152559"} value={isCarecter} />
              <Text
                style={{
                  fontSize: 12,
                  color: "#152559",
                }}
              >
                Al menos 7 caracteres
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Checkbox color={"#152559"} value={isMayuscula} />
              <Text
                style={{
                  fontSize: 12,
                  color: "#152559",
                }}
              >
                Uso de mayúsculas y minúsculas
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Checkbox color={"#152559"} value={isNumero} />
              <Text
                style={{
                  fontSize: 12,
                  color: "#152559",
                }}
              >
                Al menos un número
              </Text>
            </View>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Checkbox color={"#152559"} value={isEspecial} />
              <Text
                style={{
                  fontSize: 12,
                  color: "#152559",
                }}
              >
                Al menos un carácter especial (#!%&/*)
              </Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <InputText
            password={true}
            label={"Confirmar Contraseña"}
            eventoText={chequeo}
          />
          <View
            style={{
              marginTop: 20,
              gap: 10,
              marginLeft: 40,

              width: 220,
            }}
          >
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Checkbox
                color={"#152559"}
                value={isIgual}
                onValueChange={setIsIgual}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#152559",
                }}
              >
                Coincide con la contraseña
              </Text>
            </View>
            <View style={{ marginTop: 30 }}>
              <Btn
                color={"#152559"}
                texto={"Continuar"}
                evento={() => registrar()}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default CrearPassword;
