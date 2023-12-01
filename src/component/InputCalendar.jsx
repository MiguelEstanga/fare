import DatePicker from "react-native-modern-datepicker";
import { Modal, StyleSheet, TouchableOpacity, View , Text } from "react-native";
import { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons'; 

function InputCalendar({fecha, label}) {
  const [date, setDate] = useState(fecha);
  const [open , setOpen] = useState(false)

  const handle_get_data = (dateprop) => {
    setOpen(!open)
    setDate(dateprop);
  };

  useEffect(()=>{
    console.log(date)
    console.log(open)
  } , [open ,date])

  return (
    <View style={{width:"100%"}} >
        <Text style={{fontSize:14 , color:"#152559", fontWeight:"500" }} >
            {label}
        </Text>
      <TouchableOpacity 
        style={style.calendar}
        onPress={() => {setOpen(!open)}}
    >
        <Text style={{color:"#707070"}} >
             {date}
        </Text>
        <Text onPress={() => setOpen(!open) } >
             <Feather name="calendar" size={17} color="#707070" />
        </Text>
      
    </TouchableOpacity>
      <View
        style={{
          width: "90%",
          height: 400,
        }}
      >
        <Modal visible={open} transparent={true} animationType="slide" >
          <DatePicker
            mode="calendar"
            onDateChange={handle_get_data}
            selected={date}
            style={{
              position: "absolute",
              width: "90%",
             
              borderColor: "#2F3D6B",
           
              borderWidth: 1,
              right: 21,

              bottom: 51,
              borderRadius: 4,
            }}
          />
        </Modal>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  calendar: {
    width: "100%",
    borderWidth: 1,
    height: 40,
    borderColor: "#2F3D6B",
    borderRadius: 4,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  },

});
export default InputCalendar;
