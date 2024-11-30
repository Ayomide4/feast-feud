import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { secondary, text } from "../constants/colors";

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: secondary, backgroundColor: "#E8E8FB" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
};
