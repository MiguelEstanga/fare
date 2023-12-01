import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import InputText from "../../component/InputText";
import BtnNavegacion from "../../component/BtnNavegacion";
import Btn from "../../component/Btn";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../context/Login";
import Loaded from "../../component/Loaded";
import { ModalAlert } from "../../component/Modal";
import { TarjetaContext } from "../../context/Tarjeta";

function Login() {
  const navegacion = useNavigation();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { credenciales, setCredenciales } = useContext(LoginContext);
  const { setTarjeta } = useContext(TarjetaContext);
  const [loaded, setLoaded] = useState(false);
  const [textError, setTextError] = useState('')
  useEffect(() => { }, [error, loaded]);

  const Tarjeta = (token) => {
    const headers = {
      "Content-Type": "application/json",
      Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
      Authorization: `Bearer ${token}`,
    };
    axios
      .post(
        "http://45.32.4.114/wsAppConnect_FR_SB/api/ObtenerDatosTarjeta/",
        {
          IDSolicitud: "",
          telefono: "9541808934",
        },
        {
          headers,
        }
      )
      .then((res) => {
        setTarjeta(res.data);
        console.log(res.data);
        console.log("tarjeta");
      });
  };

  const login = () => {


    if (password.length > 0 && usuario.length > 0) {
      setLoaded(true);

      const headers = {
        "Content-Type": "application/json",
        Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
      };
      axios
        .post(
          "http://45.32.4.114/wsAppConnect_FR_SB/api/LogIn/",
          {
            NombreUsuario: usuario.trim(),
            Password: password.trim(),
          },
          {
            headers,
          }
        )
        .then((res) => {
          if (res.status == 200) {
            if (res.data.CodRespuesta === "0000") {
              setCredenciales({ ...res.data, password: password.trim() });
              console.log(res.data);
              Tarjeta(res.Token);
              navegacion.navigate("HOMES");
            } else {
              setError(true);
              console.log(res.DescRespuesta)
              setTextError()
            }

            console.log(res.data);
          }
        })
        .catch((error) => console.log(error))
        .finally((res) => setLoaded(false));
    } else {
      setTarjeta('Los campos no pueden estar vacíos')
      setLoaded(false)
    }
  };

  useEffect(() => { }, []);

  return (

    <View

    >
      {loaded == true ? <Loaded /> : ""}

      <ModalAlert
        modal={error}
        setmodal={setError}
        mensage={
          'Favor de revisar la información. Si es la primera vez que utilizas tu aplicación, regístrate desde el botón "Registrarme"'
        }
      />

      <View style={style.container}>
        <View style={style.marcos}>
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={require("../../../assets/png/marcos.png")}
          />
        </View>
        <ScrollView
          style={{
            
            width: "100%"
          }}
        >
          <View 
            style={{
              flex:1,
        
              height:800,
              justifyContent:"center",
              alignItems:'center'
            }}
          >
            <View style={style.contenformulario}>
              <View style={style.logo}>
                <Image
                  style={{
                    width: "90%",
                    height: "80%",
                    resizeMode: "cover",
                  }}
                  source={require("../../../assets/png/login_farefo.png")}
                />
              </View>
              <View style={style.formulario}>
                <InputText
                  label={"Teléfono"}
                  subtitulo={true}
                  textSubtitulo={
                    "Captura el teléfono con el que se dio de alta tu cuenta"
                  }
                  placeholder={"Texto"}
                  password={false}
                  initPassword={false}
                  eventoText={setUsuario}
                />

                <View style={{ marginTop: 50 }}>
                  <InputText
                    label={"Contraseña"}
                    subtitulo={false}
                    password={true}
                    initPassword={true}
                    eventoText={setPassword}
                  />
                </View>
                <View style={style.fogotpassword}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                  >
                    <View>
                      <Image
                        source={require("../../../assets/png/candadito.png")}
                      />
                    </View>
                    <Text
                      onPress={() => navegacion.navigate("TabPassword")}
                      style={{ borderBottomWidth: 1 }}
                    >
                      Olvidé mi contraseña
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{ width: "95", height: 40, margin: 30 }}>
                  <Btn texto={"Entrar"} color={"#152559"} evento={() => login()} />
                </View>
                <View style={style.registro}>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Image source={require("../../../assets/png/usuario.png")} />
                    </View>
                    <Text
                      onPress={() => {
                        navegacion.navigate("TabRegistro");
                      }}
                      style={{
                        borderColor: "#D1103A",
                        borderBottomWidth: 1,
                        color: "#D1103A",
                        fontSize: 16,
                      }}
                    >
                      Registrarme
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>

  );
}

const style = StyleSheet.create({
  registro: {
    marginTop: 30,
  },
  fogotpassword: {
    width: "92%",
    marginTop: 30,
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  marcos: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  contenformulario: {
   
    height: 500,
    width: "90%",
  },
  logo: {
    width: "95%",
    height: 72,
    justifyContent: "center",
    alignItems: "center"
  },
  formulario: {
    marginTop: 20,
    height: 300,
    alignItems: "center",
  },
});
export default Login;
