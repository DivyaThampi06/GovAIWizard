import React, { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import TextField from "../components/TextField";
import SelectField from "../components/SelectField";
import LangToggle from "../components/LangToggle";
import { t } from "../i18n";
import { validateStep1 } from "../utils/validation";

export default function Step1Personal({ draft, onChange, onNext, lang, onChangeLang }) {

  const [errors, setErrors] = useState({});

  function setField(key, value) {
    onChange({ ...draft, step1: { ...draft.step1, [key]: value } });
  }

  function next() {
    const e = validateStep1(draft.step1);
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
       <LangToggle lang={lang} onSelect={onChangeLang} />

        <Text style={{ fontSize: 16, fontWeight: "700", marginTop: 12, marginBottom: 10 }}>{t("personalInfo")}</Text>

        <TextField labelKey="name" value={draft.step1.name} onChangeText={(v) => setField("name", v)} errorKey={errors.name} />
        <TextField labelKey="nationalId" value={draft.step1.nationalId} onChangeText={(v) => setField("nationalId", v)} errorKey={errors.nationalId} />
        <TextField labelKey="dob" value={draft.step1.dob} onChangeText={(v) => setField("dob", v)} errorKey={errors.dob} placeholder="1990-01-31" />

        <SelectField
          labelKey="gender"
          value={draft.step1.gender}
          onSelect={(v) => setField("gender", v)}
          errorKey={errors.gender}
          options={[
            { value: "male", label: t("genderMale") },
            { value: "female", label: t("genderFemale") },
            { value: "other", label: t("genderOther") },
          ]}
        />

        <TextField labelKey="address" value={draft.step1.address} onChangeText={(v) => setField("address", v)} errorKey={errors.address} />
        <TextField labelKey="city" value={draft.step1.city} onChangeText={(v) => setField("city", v)} errorKey={errors.city} />
        <TextField labelKey="state" value={draft.step1.state} onChangeText={(v) => setField("state", v)} errorKey={errors.state} />
        <TextField labelKey="country" value={draft.step1.country} onChangeText={(v) => setField("country", v)} errorKey={errors.country} />
        <TextField labelKey="phone" value={draft.step1.phone} onChangeText={(v) => setField("phone", v)} errorKey={errors.phone} keyboardType="phone-pad" />
        <TextField labelKey="email" value={draft.step1.email} onChangeText={(v) => setField("email", v)} errorKey={errors.email} keyboardType="email-address" />

        <Pressable
          onPress={next}
          accessibilityRole="button"
          style={{ marginTop: 8, padding: 14, borderRadius: 12, backgroundColor: "#111827" }}
        >
          <Text style={{ color: "white", textAlign: "center", fontWeight: "800" }}>{t("next")}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
