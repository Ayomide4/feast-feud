import { StyleSheet } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import CodeScreen from "./screens/CodeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PartyScreen from "./screens/PartyScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Modal from "./components/modal";
import Login from "./screens/Login";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Enter Code"
            component={CodeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Party"
            component={PartyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
