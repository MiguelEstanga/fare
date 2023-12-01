import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import Table from "../../component/Table";
import TarjetaFisica from "../../component/Tarjeta";
import Btn from "../../component/Btn";
import { useEffect, useState, useContext } from "react";
import Confirmacion from "../../component/Confirmacion";
import { useNavigation } from "@react-navigation/native";
import { TarjetaContext } from "../../context/Tarjeta";
import { LoginContext } from "../../context/Login";
import Loaded from "../../component/Loaded";
import { NipContext } from "../../context/NIP";
import { CvvContext } from "../../context/CVV";

function Informacion() {
  const navegacion = useNavigation();
  const [activar, setActivar] = useState(false);
  const [confimacion, setConfirmacion] = useState(false);
  const { tarjeta } = useContext(TarjetaContext);
  const { credenciales } = useContext(LoginContext);
  const [bolqueo, setBloqueo] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [contador, setContador] = useState(180);
  const { cvv ,  setCvv} = useContext(CvvContext);
  const boqueo_y_desbloqueo = (mode) => {
    const bloqueo =
      mode == true
        ? "http://45.32.4.114/wsAppConnect_FR_SB/api/BloquearTarjeta"
        : "http://45.32.4.114/wsAppConnect_FR_SB/api/DesbloquearTarjeta";
    setLoaded(true);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credenciales.Token}`,
    };
    axios
      .post(
        bloqueo,
        {
          IDSolicitud: "",
          Tarjeta: tarjeta.Tarjeta,
          MedioAcceso: "",
          TipoMedioAcceso: "",
          MotivoBloqueo: "002",
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error))
      .finally((res) => setLoaded(false));
  };

  const funcionAEjecutar = () => {
    setCvv(null)
  };

  useEffect(() => {
    console.log("cvv");
    console.log(cvv);
    if (cvv != null) {
      const intervalo = setInterval(() => {
        setContador((contador) => contador - 1);
      }, 1000);
      console.log(contador)
      return () => clearInterval(intervalo);
    }
  }, [confimacion, activar, loaded, cvv]);

  useEffect(() => {
    if (cvv != null) {
      if (contador === 0) {
        funcionAEjecutar();
      }
    }
  }, [contador]);

  return (
    <ScrollView>
      {loaded == true ? <Loaded /> : ""}
      <View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TarjetaFisica />
        </View>
        <View style={style.h1}>
          <Text style={{ color: "#D62B50", fontSize: 26, fontWeight: "400" }}>
            Tarjeta Física
          </Text>
        </View>
        <Table titulo={"Nombre:"} info={tarjeta.Nombre} />
        <Table
          titulo={"Número del cliente"}
          info={tarjeta.NumeroCliente}
          color={"#B1B6C8"}
        />
        <Table titulo={"Centro de costo"} info={tarjeta.NombreCentroDeCosto} />
        <Table
          titulo={"Tarjeta física"}
          info={tarjeta.Tarjeta}
          color={"#B1B6C8"}
        />
        <Table titulo={"Vigencia"} info={tarjeta.FechaVigencia} />

        <View style={style.consulta}>
          <View style={style.text_generar}>
            <Text style={style.titulo__}>Consulta de NIP</Text>
            <Text style={style.text}>Para compras en establecimientos</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
            }}
          >
            <TouchableOpacity
              style={style.btn}
              onPress={() => navegacion.navigate("ConfirmacionNip")}
            >
              <Text style={{ color: "#FFFFFF" }}>Consultar</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={style.consulta}>
          <View style={style.text_generar}>
            <Text style={style.titulo__}>Generar CVV</Text>
            <Text style={style.text}>Para compras en líneas</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
            }}
          >
            {cvv == null ? (
              <TouchableOpacity
                style={style.btn}
                onPress={() => navegacion.navigate("ConfirmacionCVV")}
              >
                <Text style={{ color: "#FFFFFF" }}>Generar</Text>
              </TouchableOpacity>
            ) : (
              <Text>{cvv}</Text>
            )}
          </View>
        </View>

        <View style={style.consulta}>
          <View style={style.text_generar}>
            <Text style={style.titulo__}>Bloqueo de tarjeta</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "30%",
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              {bolqueo == false ? (
                <TouchableOpacity
                  onPress={() => {
                    boqueo_y_desbloqueo(false);
                    setBloqueo(true);
                  }}
                >
                  <Image
                    source={require("../../../assets/png/activarOff.png")}
                  />
                  <Text style={{ color: "#444444", fontSize: 12 }}>
                    Desbloqueada
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    boqueo_y_desbloqueo(true);
                    setBloqueo(false);
                  }}
                >
                  <Image source={require("../../../assets/png/boqueada.png")} />
                  <Text style={{ color: "#444444", fontSize: 12 }}>
                    Bloqueada
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Image source={require("../../../assets/png/leyenda.png")} />
        </View>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  text_generar: {
    width: "63%",
  },
  btn: {
    width: 120,
    height: 28,
    backgroundColor: "#D1103A",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    height: 39,
    justifyContent: "center",
    paddingLeft: 30,
  },
  consulta: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
  },
  titulo__: {
    color: "#152559",
    fontSize: 12,
    fontWeight: "500",
    paddingLeft: 30,
  },
  text: {
    paddingLeft: 30,
    color: "#444444",
    fontSize: 12,
    fontWeight: "400",
  },
});
export default Informacion;
