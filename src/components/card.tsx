import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import { text } from "../constants/colors";

export default function Card() {
  return (
    <View style={styles.card}>
      <View style={styles.cardTitle}>
        <Image
          style={styles.profileImg}
          source={require("../../assets/me.jpg")}
        />
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          Ayo's Mac & Cheese
        </Text>
      </View>
      <Image style={styles.img} source={require("../../assets/mac.png")} />
      <View style={styles.tag}>
        <Text style={{ fontWeight: "bold" }}>Main Dish</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    width: "100%",
  },
  card: {
    backgroundColor: "#E8E8FB",
    borderRadius: 20,
    paddingHorizontal: 7,
    height: "85%",
    width: "95%",
    shadowColor: "#171717",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    position: "relative",
  },
  img: {
    height: "85%",
    width: "95%",
    resizeMode: "cover",
    alignSelf: "center",
    borderRadius: 20,
  },
  tag: {
    position: "absolute",
    left: 30,
    bottom: 30,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: text,
    opacity: 0.9,
  },
  profileImg: {
    resizeMode: "cover",
    borderRadius: "50%",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
});
