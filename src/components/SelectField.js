import React from "react";
import { View, Text, Pressable } from "react-native";
import { t } from "../i18n";

export default function SelectField({ labelKey, value, options, onSelect, errorKey }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 6 }}>{t(labelKey)}</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => onSelect(opt.value)}
              accessibilityRole="button"
              accessibilityLabel={`${t(labelKey)}: ${opt.label}`}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: selected ? "#111827" : "#D1D5DB",
                backgroundColor: selected ? "#111827" : "white",
              }}
            >
              <Text style={{ color: selected ? "white" : "#111827", fontWeight: "600" }}>{opt.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {!!errorKey && (
        <Text style={{ marginTop: 6, color: "#DC2626" }}>
          {errorKey === "required" ? t("required") : t("invalidNumber")}
        </Text>
      )}
    </View>
  );
}
