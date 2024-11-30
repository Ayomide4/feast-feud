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
import Toast from "react-native-toast-message";
import { toastConfig } from "./utils/toastConfig";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    initializeAppSettings();
  }, []);

  /**
   * Initializes the app settings by checking if it is the first launch of the app.
   * If it is the first launch, it sets the "isFirstLaunch" flag in AsyncStorage.
   *
   * @async
   * @function initializeAppSettings
   * @returns {Promise<void>} A promise that resolves when the initialization is complete.
   * @throws Will log an error message to the console if there is a failure during initialization.
   */
  const initializeAppSettings = async (): Promise<void> => {
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
      <Toast config={toastConfig} />
    </AuthProvider>
  );
}
