import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import Home from "./src/Screen/home/Home";
import Header from "./src/component/Header";
import CreditoTabNavigation from "./src/Screen/credito/TabCredito";
import TabTranferencia from "./src/Screen/Tranferencia/TabTranferencia";
import MasOpciones from "./src/Screen/MasOpciones/Masopciones";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, Image } from "react-native";
import { useContext, useEffect } from "react";
import { SubMenuProvider, SubmenuContext } from "./src/context/SubMenuContex";
import Login from "./src/Screen/Login/Login";
import Registro from "./src/Screen/Registro/Registro";
import TabRegistro from "./src/Screen/Registro/TabRegistro";
import TabCambioPassword from "./src/Screen/CambiarPassword/TabCambioPassword";
import { LoginContext } from "./src/context/Login";
const TabNavegacion = createBottomTabNavigator();
const Stak = createStackNavigator();
import { Octicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ConfirmacionNip from "./src/Screen/NIP/ConfimacionNip";
import ConfirmarCvv from "./src/Screen/CVV/ConfirmarCvv";
import ActivacionExitosa from "./src/Screen/ActivarTarjeta/ActivisacionExitosa";
import ConfimacionActivacion from "./src/Screen/ActivarTarjeta/ConfimacionActivacion";
import { Entypo } from '@expo/vector-icons'; 

export default function Route() {
  const { setModalMenu, modal } = useContext(SubmenuContext);

  return (
    <TabNavegacion.Navigator>
      <TabNavegacion.Screen
        name="inicio"
        component={Home}
        options={{
          headerTitle: () => <Header />,
          tabBarIcon: ({ color, size }) => (
            <Octicons name="home" size={24} color="#152559" />
          ),
          headerTitleAlign: "center",
          title: "INICIO",
        }}
      />

      <TabNavegacion.Screen
        name="CreditoTab"
        component={CreditoTabNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="creditcard" size={24} color="#152559" />
          ),
          headerTitleAlign: "center",

          title: "CREDITO",
        }}
      />

      <TabNavegacion.Screen
        name="TabTraferencia"
        component={TabTranferencia}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="retweet" size={24} color="#152559" />
          ),
          title: "TRANFERENCIA",
        }}
      />

      <TabNavegacion.Screen
        name="Mas"
        component={MasOpciones}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            setModalMenu(!modal);
            console.log("menu");
          },
        }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="plus-square-o" size={24} color="black" />
          ),
          title: "MÁS",
          headerShown: false,
        }}
      />
    </TabNavegacion.Navigator>
  );
}

function NavegacionRourter() {
  return (
    <Stak.Navigator>
      <Stak.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stak.Screen
        name="HOMES"
        component={Route}
        options={{
          headerShown: false,
        }}
      />


      <Stak.Screen
        name="TabPassword"
        component={TabCambioPassword}
        options={{
          headerShown: false,
        }}
      />

      <Stak.Screen
        name="TabRegistro"
        component={TabRegistro}
        options={{
          headerShown: false,
        }}
      />

      <Stak.Screen
        name="ConfirmacionNip"
        component={ConfirmacionNip}
        options={{
          title: "Consulta de NIP",
          headerTitleAlign: "center",
        }}
      />

      <Stak.Screen
        name="ConfirmacionCVV"
        component={ConfirmarCvv}
        options={{
          title: "Consulta de CVV",
          headerTitleAlign: "center",
          headerTintColor: "#D1103A",
          headerTitleStyle: {
            color: "#152559",
          },
        }}
      />
      <Stak.Screen
        name="ConfirmarActivacion"
        component={ConfimacionActivacion}
        options={{
          title: "Activar tarjeta",
          headerTitleAlign: "center",
          headerTintColor: "#D1103A",
          headerTitleStyle: {
            color: "#152559",
          },
        }}
      />

      <Stak.Screen
        name="ActivacionExitosa"
        component={ActivacionExitosa}
        options={{
          headerShown: false,
          headerTitleAlign: "center",
          headerTintColor: "#D1103A",
          headerTitleStyle: {
            color: "#152559",
          },

        }}
      />
    </Stak.Navigator>
  );
}

export { NavegacionRourter };
