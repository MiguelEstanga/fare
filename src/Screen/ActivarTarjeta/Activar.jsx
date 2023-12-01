import { Text, View, StyleSheet, Image, ScrollView } from "react-native";
import Titulo from "../../component/Titulo";
import InputText from "../../component/InputText";
import Btn from "../../component/Btn";
import Confirmacion from "../../component/Confirmacion";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import TarjetaProvider, { TarjetaContext } from "../../context/Tarjeta";

function Activar() {
  const [modal, setModal] = useState(false);
  const [loaded , setLoaded] = useState(false)
  const [tarjetaInput , setTatrjeta] = useState("")
  const {tarjeta } = useContext(TarjetaContext)
  const navegacion = useNavigation()
  useEffect(() => {}, [modal]);

  const activar = ()=>{
    if(tarjeta.Tarjeta === tarjetaInput.trim()){
       navegacion.navigate('ConfirmarActivacion')
      console.log(tarjeta)
    }else{
      console.log("no conside")
    }
   /// console.log(tarjeta)
   
  }

  return (
    <ScrollView style={{ backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Titulo titulo={"Escribe el ID de tu tarjeta"} />
        <View style={style.contenLeyecnda}>
          <Text style={style.leyenda}>
            Captura el número que está impreso en la etiqueta en el anverso de
            tu tarjeta
          </Text>
        </View>

        <View style={style.tarjeta}>
          <Image
            source={require("../../../assets/png/ActivarTarjeta.png")}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "cover",
            }}
          />
        </View>
        <View style={{ height: 100 }}>
          <InputText 
            label={"ID de tarjeta"}
            eventoText={setTatrjeta} 
            password={true}
            
          />
        </View>
      </View>
      <View style={style.btnContainer}>
        <Btn 
          color={"#152559"} 
          texto={"Continuar"} 
          evento={()=> activar()}
        />
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  contenLeyecnda: {
    paddingLeft: 30,
    marginTop: 20,
    width: "100%",
  },
  leyenda: {
    color: "#444444",
    fontWeight: "400",
    fontSize: 16,
  },
  tarjeta: {
    width: "90%",
    height: 387,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Activar;
