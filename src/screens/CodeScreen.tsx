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
        <View>
          <View style={{ padding: 40, paddingTop: 60 }}>
            <Text style={{ fontSize: 20, marginBottom: 30 }}>
              Which Dish Will End on Top? Join the Fun and Find Out!
            </Text>
            <Image
              style={styles.img}
              source={require("../../assets/blob.png")}
              blurRadius={20}
            />
            <View style={{ marginBottom: 100 }}>
              <Text style={{ fontSize: 60 }}>Enter</Text>
              <Text style={{ fontSize: 60 }}>The</Text>
              <Text style={{ fontSize: 60 }}>Party</Text>
              <Text style={{ fontSize: 60 }}>Code</Text>
            </View>
            <View>
              <TextInput
                style={[styles.input, styles.shadowProp]}
                placeholder="Enter Code Here"
              ></TextInput>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Party")}
              >
                <Text
                  style={{ fontWeight: "500", color: "#fff", fontSize: 16 }}
                >
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
    paddingTop: 40, // Optional: Adjust padding if needed
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 20,
    backgroundColor: "#fff",
    height: 60,
    marginBottom: 20,
  },
  button: {
    borderRadius: 25,
    backgroundColor: "#6120F3",
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
    zIndex: -1,
  },

  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
