import { View, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Home from "../../assets/svg/home";
import Add from "../../assets/svg/add";
import Messages from "../../assets/svg/messages";

//TODO:

export default function NavBar() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#4B4156", "#4A4C60"]}
        style={styles.background}
        end={{ x: 0.05, y: 1 }}
      >
        <View style={styles.iconContainer}>
          <Pressable>
            <Home width={40} height={40} />
          </Pressable>
          <Pressable>
            <Add width={50} height={50} />
          </Pressable>
          <Pressable>
            <Messages width={45} height={50} />
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  iconContainer: {
    width: "90%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
