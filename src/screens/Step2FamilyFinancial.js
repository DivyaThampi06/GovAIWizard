import React, { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import { t } from "../i18n";
import { validateStep2 } from "../utils/validation";

export default function Step2FamilyFinancial({ draft, onChange, onBack, onNext }) {
  const [errors, setErrors] = useState({});

  function setField(key, value) {
    onChange({ ...draft, step2: { ...draft.step2, [key]: value } });
  }

  function next() {
    const e = validateStep2(draft.step2);
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}>{t("familyFinancial")}</Text>

        <SelectField
          labelKey="maritalStatus"
          value={draft.step2.maritalStatus}
          onSelect={(v) => setField("maritalStatus", v)}
          errorKey={errors.maritalStatus}
          options={[
            { value: "single", label: t("maritalStatus") + " - Single" },
            { value: "married", label: t("maritalStatus") + " - Married" },
            { value: "divorced", label: t("maritalStatus") + " - Divorced" },
            { value: "widowed", label: t("maritalStatus") + " - Widowed" },
          ]}
        />

        <TextField
          labelKey="dependents"
          value={draft.step2.dependents}
          onChangeText={(v) => setField("dependents", v)}
          errorKey={errors.dependents}
          keyboardType="number-pad"
        />

        <SelectField
          labelKey="employmentStatus"
          value={draft.step2.employmentStatus}
          onSelect={(v) => setField("employmentStatus", v)}
          errorKey={errors.employmentStatus}
          options={[
            { value: "employed", label: "Employed" },
            { value: "unemployed", label: "Unemployed" },
            { value: "self", label: "Self-employed" },
            { value: "retired", label: "Retired" },
          ]}
        />

        <TextField
          labelKey="monthlyIncome"
          value={draft.step2.monthlyIncome}
          onChangeText={(v) => setField("monthlyIncome", v)}
          errorKey={errors.monthlyIncome}
          keyboardType="numeric"
        />

        <SelectField
          labelKey="housingStatus"
          value={draft.step2.housingStatus}
          onSelect={(v) => setField("housingStatus", v)}
          errorKey={errors.housingStatus}
          options={[
            { value: "rent", label: "Rent" },
            { value: "own", label: "Own" },
            { value: "family", label: "With family" },
            { value: "other", label: "Other" },
          ]}
        />

        <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
          <Pressable onPress={onBack} accessibilityRole="button" style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#E5E7EB" }}>
            <Text style={{ color: "#111827", textAlign: "center", fontWeight: "800" }}>{t("back")}</Text>
          </Pressable>
          <Pressable onPress={next} accessibilityRole="button" style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#111827" }}>
            <Text style={{ color: "white", textAlign: "center", fontWeight: "800" }}>{t("next")}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
