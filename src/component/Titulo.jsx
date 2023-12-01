import { View, Text } from "react-native";

function Titulo({titulo}) {
    return ( <View
        style={{
            width:"100%",
            paddingLeft:30,
        }}
    >
        <Text
            style={{
                color:"#152559",
                fontSize:24,
                fontWeight:'500'
            }}
        >
            {titulo}
        </Text>
    </View> );
}

export default Titulo;