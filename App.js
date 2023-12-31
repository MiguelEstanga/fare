import { Modal, StyleSheet, Text, View } from "react-native";

import { SubMenuProvider } from "./src/context/SubMenuContex";
import Index from "./src/Screen/index";
import LoginProvier from "./src/context/Login";
import { NavigationContainer } from "@react-navigation/native";
import TarjetaProvider from "./src/context/Tarjeta";
import NIP from "./src/context/NIP";
import CVVProvider from "./src/context/CVV";
import Registro from "./src/context/Registrar";
import MAS, { MasContext } from "./src/context/Mas";

export default function App() {
  return (
    <NavigationContainer>
      <SubMenuProvider>
        <LoginProvier>
          <TarjetaProvider>
            <NIP>
              <CVVProvider>
                <MAS>
                  <Registro>
                    <Index />
                  </Registro>
                </MAS>
              </CVVProvider>
            </NIP>
          </TarjetaProvider>
        </LoginProvier>
      </SubMenuProvider>
    </NavigationContainer>
  );
}
