import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";

type StyledButtonProps = {
  title?: string;
  children?: React.ReactNode;
  variant?: "default" | "custom";
} & TouchableOpacityProps;

export default function StyledButton({
  title,
  children,
  variant = "default",
  ...props
}: StyledButtonProps) {
  const defaultStyle = "bg-[#323232] px-20 py-4 rounded-[8]";
  const customStyle =
    "bg-[#323232] mx-auto w-full py-4 rounded-[8] flex-row items-center justify-center gap-2";

  return (
    <TouchableOpacity
      {...props}
      className={`${variant === "custom" ? customStyle : defaultStyle} mx-auto`}
    >
      {children ? (
        children
      ) : (
        <Text className="text-white text-center font-bold">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
