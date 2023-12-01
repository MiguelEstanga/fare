import { Text, View } from "react-native";
import BtnNavegacion from "../../component/BtnNavegacion";
import Btn from "../../component/Btn";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useContext } from "react";
import { NipContext } from "../../context/NIP";

function NIP() {
  const navgacion = useNavigation();
  const {nip} = useContext(NipContext)
  const handel_cerrar = () => {
    navgacion.navigate("CreditoTab");
  };
  return (
    <View>
      {nip ? (
          <Text style={{ fontSize: 117, color: "#152559", textAlign: "center" }}>
          {nip  }
        </Text>
      ):(
        <Text style={{
          textAlign:"center",
          marginTop:30,
          marginBottom:30,
          fontSize:20
        }} >
          No se pudo generar tu nip
        </Text>
      )
      }
      
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Btn
          texto={"Cerrar"}
          color={"#D1103A"}
          evento={() => navgacion.navigate("HOMES") }
        />
      </View>
    </View>
  );
}

export default NIP;
