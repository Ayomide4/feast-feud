import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import UpArrow from "../../assets/svg/up-arrow";
import { secondary, text } from "../constants/colors";
import { Dropdown } from "react-native-element-dropdown";
import Camera from "../../assets/svg/camera";
import Gallery from "../../assets/svg/gallery";
import Trash from "../../assets/svg/trash";
import React, { SetStateAction } from "react";

interface Props {
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

//TODO:
//- add photo gallery stuff

export default function Modal({ setIsModalOpen }: Props) {
  const data = [
    { label: "Main Dish", value: "Main Dish" },
    { label: "Side/Appetizer", value: "Side/Appetizer" },
    { label: "Dessert", value: "Dessert" },
  ];
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
            <View style={{ marginVertical: 20 }}>
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
                maxHeight={300}
                labelField="label"
                valueField="value"
                data={data}
                placeholder="Select your category"
                placeholderStyle={styles.placeholderStyle}
                onChange={function (item: {
                  label: string;
                  value: string;
                }): void {
                  throw new Error("Function not implemented.");
                }}
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
                  justifyContent: "space-between",
                  width: "80%",
                }}
              >
                <Camera width={50} height={50} />
                <Gallery width={40} height={40} />
                <Trash width={50} height={50} />
              </View>
            </View>
            <View>
              <Pressable
                style={styles.addBtn}
                onPress={() => console.log("created")}
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
});
