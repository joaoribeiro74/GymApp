import { View, Text } from "react-native";
import React from "react";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "#1DAA2D", paddingVertical: 10, minHeight: 70 }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        justifyContent: "center",
        alignSelf: "center",
      }}
      text1Style={{
        fontSize: 17,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: "500",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "#E10000", paddingVertical: 10, minHeight: 70 }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        justifyContent: "center",
        alignSelf: "center",
        flex: 1,
      }}
      text1Style={{
        fontSize: 17,
        fontWeight: "bold",
      }}
      text2Style={{
        fontSize: 11,
        fontWeight: "500",
        flexWrap: "wrap",
      }}
    />
  ),

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
