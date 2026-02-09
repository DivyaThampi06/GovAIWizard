import React from "react";
import { View, Text, Pressable } from "react-native";

export default function LangToggle({ lang, onSelect }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 8 }}>
      <Pressable
        onPress={() => onSelect("en")}
        accessibilityRole="button"
        style={{
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 999,
          backgroundColor: lang === "en" ? "#111827" : "#E5E7EB",
        }}
      >
        <Text style={{ color: lang === "en" ? "white" : "#111827", fontWeight: "700" }}>EN</Text>
      </Pressable>

      <Pressable
        onPress={() => onSelect("ar")}
        accessibilityRole="button"
        style={{
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 999,
          backgroundColor: lang === "ar" ? "#111827" : "#E5E7EB",
        }}
      >
        <Text style={{ color: lang === "ar" ? "white" : "#111827", fontWeight: "700" }}>العربية</Text>
      </Pressable>
    </View>
  );
}
