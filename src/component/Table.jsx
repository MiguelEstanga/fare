import { View , Text, StyleSheet} from "react-native";

function Table({
    color,
    titulo,
    info
}) {
    return ( <View
        style={{
            backgroundColor:color,
            flexDirection:'row',
            height:34,
            width:"100%",
            marginTop:5,
            alignItems:"center"
        }}
    >
        <View style={style.conten} >
            <Text style={style.titulo} >
                {titulo}
            </Text>
        </View>
        <View style={style.conten} >
            <Text style={style.info} >
               {info}
            </Text>
        </View>
    </View> );
}

const style = StyleSheet.create({
    conten:{
        width:"50%",
      
    },
    titulo:{
        color:"#152559",
        fontSize:14,
        fontWeight:'600',
        paddingLeft:30,
        textAlign:'left'
    },
    info:{
        color:"#444444",
        fontSize:14,
        fontWeight:'400',
        textAlign:'left'
    }
})
export default Table;