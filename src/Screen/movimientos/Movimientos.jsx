import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TarjetaFisica from "../../component/Tarjeta";
import { useState } from "react";
import InputCalendar from "../../component/InputCalendar";

function Movimientos() {
  const fecha = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <ScrollView>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TarjetaFisica />
      </View>
      <View style={style.formulario}>
        <Text
          style={{
            fontSize: 26,
            color: "#D62B50",
            paddingLeft: 15,
            marginBottom: 15,
          }}
        >
          Movimientos
        </Text>
      </View>

      <View style={style.formularioCalenndar}>
        <View style={{ width: "50%", height: 40 }}>
          <InputCalendar fecha={fecha()} label={'Fecha inicio'} />
        </View>
        <View style={{ width: "50%", height: 40 }}>
          <InputCalendar fecha={fecha()} label={"Fecha fin"} />
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity style={style.btn}>
          <Text style={{ color: "#FFFFFF", fontSize: 14 }}>
            Consulta Movimientos
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent:"center"  , alignItems:"center" , marginTop:30}} >
        <Text  style={{
            color:"#152559",
            fontSize:19,
            textAlign:"center",
          
            width:180,
            fontWeight:'500'
        }} >No hay movimientos para este periodo</Text>
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  btn: {
    width: "90%",
    height: 39,
    backgroundColor: "#2F3D6B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  calendar: {
    width: "50%",

    height: 40,
    borderRadius: 4,
  },
  formularioCalenndar: {
    flexDirection: "row",
    height: 70,
    paddingLeft: 15,
    paddingRight: 15,
    gap: 5,
  },
});
export default Movimientos;
