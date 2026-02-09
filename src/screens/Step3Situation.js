import React, { useMemo, useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import TextField from "../components/TextField";
import HelpMeWriteModal from "../components/HelpMeWriteModal";
import { t, getLang } from "../i18n";
import { validateStep3 } from "../utils/validation";
import { getOpenAIApiKey } from "../config/env";
import { submitApplicationMock } from "../services/mockSubmit";

export default function Step3Situation({ draft, onChange, onBack, onSubmit }) {
  const [errors, setErrors] = useState({});
  const [aiField, setAiField] = useState(null); // key of step3
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState(null);

  // const apiKey = process.env.EXPO_PUBLIC_OPENAI_API_KEY || "";
  const apiKey = getOpenAIApiKey();


  function setField(key, value) {
    onChange({ ...draft, step3: { ...draft.step3, [key]: value } });
  }

  const context = useMemo(() => {
    
    const s1 = draft.step1;
    const s2 = draft.step2;
    return `Name: ${s1.name}\nCity: ${s1.city}, ${s1.country}\nEmployment: ${s2.employmentStatus}\nIncome: ${s2.monthlyIncome}\nDependents: ${s2.dependents}`;
  }, [draft]);

  async function submit() {
    const e = validateStep3(draft.step3);
    setErrors(e);
    if (Object.keys(e).length !== 0) return;

    setSubmitting(true);
    try {
      const res = await submitApplicationMock(draft);
      setReferenceId(res.referenceId);
      onSubmit(res.referenceId);
    } finally {
      setSubmitting(false);
    }
  }

  function aiButton(fieldKey, labelKey) {
    return (
      <Pressable
        onPress={() => setAiField(fieldKey)}
        accessibilityRole="button"
        style={{ alignSelf: "flex-start", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 999, backgroundColor: "#E5E7EB", marginBottom: 10 }}
      >
        <Text style={{ fontWeight: "800" }}>{t("helpMeWrite")}</Text>
      </Pressable>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 10 }}>{t("situations")}</Text>

        {aiButton("currentFinancialSituation", "currentFinancialSituation")}
        <TextField
          labelKey="currentFinancialSituation"
          value={draft.step3.currentFinancialSituation}
          onChangeText={(v) => setField("currentFinancialSituation", v)}
          errorKey={errors.currentFinancialSituation}
          multiline
          numberOfLines={4}
        />

        {aiButton("employmentCircumstances", "employmentCircumstances")}
        <TextField
          labelKey="employmentCircumstances"
          value={draft.step3.employmentCircumstances}
          onChangeText={(v) => setField("employmentCircumstances", v)}
          errorKey={errors.employmentCircumstances}
          multiline
          numberOfLines={4}
        />

        {aiButton("reasonForApplying", "reasonForApplying")}
        <TextField
          labelKey="reasonForApplying"
          value={draft.step3.reasonForApplying}
          onChangeText={(v) => setField("reasonForApplying", v)}
          errorKey={errors.reasonForApplying}
          multiline
          numberOfLines={4}
        />

        {!apiKey ? (
          <Text style={{ color: "#B91C1C", marginTop: 6 }}>
            Missing OpenAI API key. Add EXPO_PUBLIC_OPENAI_API_KEY in .env to enable “Help Me Write”.
          </Text>
        ) : null}

        <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
          <Pressable onPress={onBack} accessibilityRole="button" style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#E5E7EB" }}>
            <Text style={{ color: "#111827", textAlign: "center", fontWeight: "800" }}>{t("back")}</Text>
          </Pressable>
          <Pressable
            onPress={submit}
            disabled={submitting}
            accessibilityRole="button"
            style={{ flex: 1, padding: 14, borderRadius: 12, backgroundColor: submitting ? "#6B7280" : "#111827" }}
          >
            <Text style={{ color: "white", textAlign: "center", fontWeight: "800" }}>{t("submit")}</Text>
          </Pressable>
        </View>
      </ScrollView>

      <HelpMeWriteModal
        visible={!!aiField}
        onClose={() => setAiField(null)}
        apiKey={apiKey}
        fieldLabelKey={aiField || "currentFinancialSituation"}
        context={context}
        onAccept={(txt) => {
          if (aiField) setField(aiField, txt);
          setAiField(null);
        }}
      />
    </KeyboardAvoidingView>
  );
}
