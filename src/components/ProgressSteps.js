import React from "react";
import { View, Text } from "react-native";
import { t } from "../i18n";

export default function ProgressSteps({ current, total }) {
  return (
    <View
      accessibilityRole="header"
      accessibilityLabel={t("progress")}
      style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700" }}>{t("appTitle")}</Text>
      <Text style={{ marginTop: 6, opacity: 0.8 }}>{t("step", { current, total })}</Text>

      <View style={{ flexDirection: "row", marginTop: 10 }}>
        {Array.from({ length: total }).map((_, i) => {
          const active = i + 1 <= current;
          return (
            <View
              key={i}
              style={{
                flex: 1,
                height: 6,
                borderRadius: 999,
                marginRight: i === total - 1 ? 0 : 8,
                backgroundColor: active ? "#111827" : "#E5E7EB",
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
