import WelcomeScreen from "./screens/WelcomeScreen";
import CodeScreen from "./screens/CodeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PartyScreen from "./screens/PartyScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./context/AuthContext";


const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const initializeAppSettings = async () => {
      // await AsyncStorage.clear(); // Uncomment to app storage
      try {
        const isFirstLaunch = await AsyncStorage.getItem("isFirstLaunch");
        if (isFirstLaunch === null) {
          await AsyncStorage.setItem("isFirstLaunch", "true");
        }
      } catch (error) {
        console.error("Failed to initialize app settings:", error);
      }
    };

    initializeAppSettings();
  }, []);
  
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
