import React from "react";
import { BaseToast, ErrorToast } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const toastConfig = {
  customError: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "#E10000",
        borderLeftColor: "#E10000",
        paddingVertical: 10,
        paddingLeft: 15,
        minHeight: 40,
        flexDirection: "row",
        alignItems: "center",
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      renderLeadingIcon={() => (
        <Ionicons name="alert-circle" size={20} color="#fff" />
      )}
      text1Style={{
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 6,
        padding: 0,
      }}
      text2Style={{
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
        marginLeft: 6,
        padding: 0,
      }}
    />
  ),

  customSuccess: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#1DAA2D",
        borderLeftColor: "#1DAA2D",
        paddingVertical: 10,
        paddingLeft: 15,
        minHeight: 40,
        flexDirection: "row",
        alignItems: "center",
      }}
      contentContainerStyle={{
        paddingHorizontal: 0,
      }}
      renderLeadingIcon={() => (
        <Ionicons name="checkmark-circle" size={20} color="#fff" />
      )}
      text1Style={{
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 6,
        padding: 0,
      }}
    />
  ),
};

export default toastConfig;
