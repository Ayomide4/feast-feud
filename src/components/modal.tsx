import { View, Text, StyleSheet, Pressable, Alert, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import UpArrow from "../../assets/svg/up-arrow";
import { secondary, text } from "../constants/colors";
import { Dropdown } from "react-native-element-dropdown";
import Camera from "../../assets/svg/camera";
import Gallery from "../../assets/svg/gallery";
import Trash from "../../assets/svg/trash";
import React, { SetStateAction, useState } from "react";
import * as ImagePicker from "expo-image-picker";

interface Props {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

interface Dish {
  dishName: string;
  category: string;
  dishImage: string;
}

//TODO:
//- add feedback on button press
//- add preview of card?
//- add dish  to firebase

export default function Modal({ setIsModalOpen }: Props) {
  const [dish, setDish] = useState<Dish>({
    dishName: "",
    category: "",
    dishImage: "",
  });
  const data = [
    { label: "Main Dish", value: "Main Dish" },
    { label: "Side/Appetizer", value: "Side/Appetizer" },
    { label: "Dessert", value: "Dessert" },
  ];

  const handleChangeText = (property: keyof Dish, text: string) => {
    setDish((prev: Dish) => ({
      ...prev,
      [property]: text,
    }));
  };

  const handleOpenCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required to take a photo.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChangeText("dishImage", result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      handleChangeText("dishImage", result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        height: "120%",
        alignItems: "center",
      }}
    >
      <View style={styles.modalBackground}></View>
      <View style={styles.modalContainer}>
        <View style={styles.formContainer}>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Pressable
              style={styles.backBtn}
              onPress={() => setIsModalOpen(false)}
            >
              <UpArrow rotationDeg={270} color={text} width={30} height={30} />
            </Pressable>
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Add Your Dish
              </Text>

              <Text>The dish with the best reviews gets a prize!</Text>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Dish Name
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter dish name..."
                placeholderTextColor="#000"
                onChangeText={(text) => handleChangeText("dishName", text)}
                value={dish.dishName}
                returnKeyType="done"
              />
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 10,
                }}
              >
                Dish Category
              </Text>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.inputSearch}
                itemContainerStyle={{
                  backgroundColor: "#E8E8FB",
                }}
                activeColor={secondary}
                maxHeight={300}
                labelField="label"
                valueField="value"
                data={data}
                placeholder="Select your category"
                placeholderStyle={styles.placeholderStyle}
                value={dish.category}
                onChange={(item) => handleChangeText("category", item.value)}
              />
            </View>
            <View style={{ marginBottom: 50 }}>
              <Text
                style={{ marginBottom: 20, fontWeight: "bold", fontSize: 16 }}
              >
                Add a picture of your dish
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Pressable
                  style={styles.btnBackground}
                  onPress={handleOpenCamera}
                >
                  <Camera width={50} height={50} />
                </Pressable>

                <Pressable style={styles.btnBackground} onPress={pickImage}>
                  <Gallery width={40} height={40} />
                </Pressable>
                <Pressable
                  style={styles.btnBackground}
                  onPress={() => handleChangeText("dishImage", "")}
                >
                  <Trash width={50} height={50} />
                </Pressable>
              </View>
            </View>

            <View>
              <Pressable
                style={styles.addBtn}
                onPress={() => Alert.alert(JSON.stringify(dish))}
                accessibilityLabel="Press this to add your dish to the items in the party"
              >
                <Text style={{ color: text }}>Add Dish</Text>
              </Pressable>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setIsModalOpen(false)}
                accessibilityLabel="Cancel adding this item"
              >
                <Text>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen

    backgroundColor: "black",
    opacity: 0.9,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
  },

  modalContainer: {
    position: "absolute",
    backgroundColor: "#E8E8FB",
    width: "90%",
    height: 600,
    opacity: 1,
    top: 100,
    borderRadius: 10,
  },

  formContainer: {
    margin: 20,
    paddingVertical: 10,
    flex: 1,
    borderColor: "black",
  },

  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
  },
  addBtn: {
    borderRadius: 5,
    backgroundColor: secondary,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cancelBtn: {
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  inputSearch: {
    backgroundColor: "#E8E8FB",
  },
  backBtn: {
    borderRadius: 100,
    backgroundColor: secondary,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnBackground: {
    borderRadius: 10,
    backgroundColor: "#D8D8EC",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
