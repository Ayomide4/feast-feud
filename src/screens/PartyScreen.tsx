import { Image, View, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PartyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ color: "#fff" }}>Ayo's Friendsgiving</Text>
      </View>
      <View style={styles.input}>
        <TextInput placeholder="Search here..." />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#3F3649",
    width: "100%",
    height: "100%",
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 20,
    backgroundColor: "#E8E8FB",
    width: "80%",
    height: 30,
    marginBottom: 20,
  },
});
