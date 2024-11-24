import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { bg, primary, secondary, text } from "../constants/colors";

//TODO: after click on text input, permnanetly shifts everything up
export default function CodeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require("../../assets/bg-blob.png")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        style={styles.mainContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          style={styles.img}
          source={require("../../assets/blob3.png")}
          blurRadius={20}
        />
        <View>
          <View style={{ padding: 40, paddingTop: 60 }}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 30,
                color: "#000",
                opacity: 0.5,
              }}
            >
              Which Dish Will End on Top? Join the Fun and Find Out!
            </Text>

            <View style={{ marginBottom: 100 }}>
              <Text style={{ fontSize: 60, color: "#ECE6F3" }}>Enter</Text>
              <Text style={{ fontSize: 60, color: "#ECE6F3" }}>The</Text>
              <Text style={{ fontSize: 60, color: "#ECE6F3" }}>Party</Text>
              <Text style={{ fontSize: 60, color: "#ECE6F3" }}>Code</Text>
            </View>
            <View>
              <TextInput
                style={[styles.input, styles.shadowProp]}
                placeholder="Enter Code Here"
                placeholderTextColor={bg}
                returnKeyType="done"
              ></TextInput>
              <Pressable
                style={[styles.button, styles.shadowProp]}
                onPress={() => navigation.navigate("Party")}
              >
                <Text style={{ fontWeight: "500", color: text, fontSize: 16 }}>
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F3649",
  },
  input: {
    borderRadius: 15,
    paddingLeft: 20,
    backgroundColor: primary,
    height: 60,
    marginBottom: 20,
  },
  button: {
    borderRadius: 25,
    backgroundColor: secondary,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    flex: 1, // Expands to cover the whole screen
    resizeMode: "cover", // Ensures image scales correctly
  },
  img: {
    position: "absolute",
    right: 0,
    zIndex: 0,
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
