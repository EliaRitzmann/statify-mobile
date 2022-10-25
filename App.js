import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { UserAuthContextProvider } from "./context/AuthContext";
import Index from "./Index";

export default function App() {
  return (
    <UserAuthContextProvider>
      <NavigationContainer>
        <StatusBar barStyle={"dark-content"}></StatusBar>
        <Index></Index>
      </NavigationContainer>
    </UserAuthContextProvider>
  );
}
