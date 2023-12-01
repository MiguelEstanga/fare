import { createContext, useContext } from "react";
import { NavegacionRourter } from "../../router";
import { SubMenuProvider, SubmenuContext } from "../context/SubMenuContex";
import { View , StyleSheet, TouchableOpacity, Image} from "react-native";
import MenuModal from "../component/MenuModal";
import { LoginContext } from "../context/Login";
import { useNavigation } from "@react-navigation/native";
function Index() {
  const {modal} = useContext(SubmenuContext)
  

 
  return (
    <>
      <NavegacionRourter />
      {modal== true ? (<MenuModal/>) : '' }
    </>
  );
}


export default Index;
