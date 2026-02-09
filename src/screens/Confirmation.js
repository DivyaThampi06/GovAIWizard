import React from "react";
import { View, Text, Pressable } from "react-native";
import { t } from "../i18n";

export default function Confirmation({ referenceId, onDone }) {
  return (
    <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "800", marginBottom: 10 }}>{t("confirmationTitle")}</Text>
      <Text style={{ fontSize: 16, opacity: 0.85 }}>{t("confirmationBody")}</Text>

      {referenceId ? (
        <Text style={{ marginTop: 10, fontSize: 16, fontWeight: "700" }}>{t("referenceId", { id: referenceId })}</Text>
      ) : null}

      <Pressable
        onPress={onDone}
        accessibilityRole="button"
        style={{ marginTop: 20, padding: 14, borderRadius: 12, backgroundColor: "#111827" }}
      >
        <Text style={{ color: "white", textAlign: "center", fontWeight: "800" }}>{t("done")}</Text>
      </Pressable>
    </View>
  );
}
