import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
  Animated,
} from "react-native";
import { bg, secondary, text } from "../constants/colors";
import Profile from "../../assets/svg/profile";

interface Props {
  dish: Dish;
  scale?: number;
  offsetX?: number;
  zIndex?: number;
}

export default function Card({
  dish,
  scale = 1,
  offsetX = 0,
  zIndex = 1,
}: Props) {
  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ scale }, { translateX: offsetX }],
          zIndex: zIndex, // Ensure stacking order
          position: "absolute",
          left: 10,
          top: 0,
          marginTop: 20,
        },
      ]}
    >
      <View style={styles.cardTitle}>
        {dish.profileImg ? (
          <Image
            style={styles.profileImg}
            source={{ uri: dish.user?.profileImg }}
          />
        ) : (
          <View
            style={{
              borderRadius: 100,
              width: 40,
              height: 40,
              backgroundColor: bg,
              marginHorizontal: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Profile fill="#ECE6F3" width={20} height={20} />
          </View>
        )}
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>
          {dish.dishName}
        </Text>
      </View>
      <Image
        style={styles.img}
        source={{ uri: dish.dishImage }}
        resizeMode="cover"
      />
      <View style={styles.tag}>
        <Text style={{ fontWeight: "bold" }}>{dish.category}</Text>
      </View>
    </Animated.View>
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
    position: "relative",
    backgroundColor: "#E8E8FB",
    borderRadius: 20,
    paddingHorizontal: 7,
    shadowColor: "#171717",
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    height: 500,
    width: "90%",
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
    bottom: 40,
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
