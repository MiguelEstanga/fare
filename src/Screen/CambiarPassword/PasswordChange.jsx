import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import Titulo from "../../component/Titulo";
import { useState ,useContext } from "react";
import ModalCodigo from "../../component/ModalCodigo";
import Btn from "../../component/Btn"
import { useNavigation } from "@react-navigation/native";
import InputText from "../../component/InputText";
import { RegistroContext } from "../../context/Registrar";
import axios from "axios";
import { ModalAlert } from "../../component/Modal";
import Loaded from "../../component/Loaded";
function Telefono() {

  const navegacion =  useNavigation()
  const  {setTelefonoRegistro , setCode , setTelefonoC}  =  useContext(RegistroContext)
  const [telefono , setTelefono] = useState('')
    const [modal , setModal] = useState(false)
    const [loaded , setLoaded] = useState(false)
  const handleChange = (text, index) => {
    let newCode = [...code];
    newCode[index] = text;
    setCode(newCode);
  };

  const handle_navegacion = ()=>{
  
    navegacion.navigate("Registro")
    console.log("CodeChangePassword")
    
  }

  const registro = ()=>{
    console.log(telefono)
    setTelefonoC(telefono)
    setLoaded(true)
    const headers = {
      "Content-Type": "application/json",
      Credenciales: "R2VuZXJpY1VzZXI6RG51LjEyMw==",
    };
    axios
      .post(
        "http://45.32.4.114/wsAppConnect_FR_SB/api/EnviarSMSOnb",
        {
            "Usuario": "9541808934",
            "Telefono": telefono
        },
        {
          headers,
        }
      )
      .then((res) => {

      
        if(res.data.CodigoRespuesta === "0"){
          console.log(res.data)
          setCode(res.data.Token)
        }else{
          setModal(true)
        }
      })
      .finally(res => {
        navegacion.navigate("CodeChangePassword")
        setLoaded(false)
      })
  }

  return (
    <View  style={{backgroundColor:"#FFFFFF" , height:"100%"}} >
      <ModalAlert
        modal={modal}
        setmodal={setModal}
        mensage={'Error número incorrecto'}
      />
      {
        loaded === true ?(<Loaded/>):""
      }
        <Titulo
            titulo={'Escribe tu teléfono'}
        />
        <View style={{width:"100%" , alignItems:"center", marginTop:10}} >
            <Text style={style.text} >
            Captura el número de teléfono con el que te registraste en la página de FAREFO.
            </Text>
        </View>
        <View style={{alignItems:"center"}}>
            <InputText
                label={''}
                password={true}
                eventoText={setTelefono}
            />
        </View>
        <View style={{width:"100%" , alignItems:"center" , marginTop:40}} >
            <Btn
                texto={'Continuar'}
                color={'#152559'}
                evento={()=> registro()}
            />
        </View>
    </View>
  );
}

const style = StyleSheet.create({
  text:{
    width:300,
    fontSize:16
  }
});
export default Telefono;
