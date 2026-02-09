import React from "react";
import { View, Text, TextInput } from "react-native";
import { t } from "../i18n";

export default function TextField({
  labelKey,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  errorKey,
  multiline,
  numberOfLines,
  accessibilityHint,
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 6 }}>{t(labelKey)}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
        autoCorrect={keyboardType === "email-address" ? false : true}

        style={{
          borderWidth: 1,
          borderColor: errorKey ? "#DC2626" : "#D1D5DB",
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: multiline ? 10 : 12,
          fontSize: 16,
        }}
        accessibilityLabel={t(labelKey)}
        accessibilityHint={accessibilityHint}
      />
      {!!errorKey && (
        <Text style={{ marginTop: 6, color: "#DC2626" }}>
          {errorKey === "required" ? t("required") : errorKey === "invalid_email" ? t("invalidEmail") : t("invalidNumber")}
        </Text>
      )}
    </View>
  );
}
