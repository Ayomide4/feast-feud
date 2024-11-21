import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import Review from "../components/review";

const Test: React.FC = () => {
  // ref for bottom sheet
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // state to control bottom sheet
  const [isOpen, setIsOpen] = useState(false);

  // variables
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    setIsOpen(index !== -1);
  }, []);

  useEffect(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
          >
            <BottomSheetView style={styles.modalContent}>
              <Text style={styles.modalText}>Bottom Sheet Content</Text>
              <BottomSheetTextInput
                placeholder="Enter text"
                style={styles.textInput}
              />
            </BottomSheetView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  swipeArea: {
    width: "100%",
    height: 100,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  swipeText: {
    color: "white",
    fontSize: 18,
  },
  modalContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalText: {
    fontSize: 16,
    color: "black",
    marginBottom: 16,
  },
  textInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default Test;
