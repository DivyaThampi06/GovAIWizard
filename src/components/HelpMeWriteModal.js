import React, { useEffect, useState } from "react";
import { Modal, View, Text, TextInput, Pressable, ActivityIndicator } from "react-native";
import { t, getLang } from "../i18n";
import { helpMeWrite } from "../services/openai";

export default function HelpMeWriteModal({ visible, onClose, apiKey, fieldLabelKey, context, onAccept }) {
const [loading, setLoading] = useState(false);
const [text, setText] = useState("");
const [errorMsg, setErrorMsg] = useState("");



  async function generate() {
    setLoading(true);
   setErrorMsg("");

    try {
      const language = getLang();
      const promptContext =
        language === "ar"
          ? `ساعدني في كتابة نص قصير وواضح ومحترم لهذا الحقل: ${t(fieldLabelKey)}.\n\nسياق المستخدم:\n${context}`
          : `Help me write a short, clear, respectful text for this field: ${t(fieldLabelKey)}.\n\nUser context:\n${context}`;

      const out = await helpMeWrite({ apiKey, promptContext, language });
      setText(out);
  } catch (e) {
  const msg = e?.message || String(e);
  console.log("OpenAI error:", msg);
  setErrorMsg(msg);
} finally {
  setLoading(false);
}




  }

  useEffect(() => {
    if (visible) {
      setText("");
      generate();
    } else {
      setLoading(false);
    setErrorMsg("");

      setText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" }}>
        <View style={{ backgroundColor: "white", padding: 16, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "700" }}>{t("aiSuggestion")}</Text>
          <Text style={{ marginTop: 4, opacity: 0.8 }}>{t(fieldLabelKey)}</Text>

          {loading ? (
            <View style={{ paddingVertical: 24, alignItems: "center" }}>
              <ActivityIndicator />
              <Text style={{ marginTop: 10 }}>{t("generating")}</Text>
            </View>
          ) : !!errorMsg  ? (
            <View style={{ paddingVertical: 16 }}>
             <Text style={{ color: "#B91C1C" }}>{t("aiError")}</Text>
{!!errorMsg && (
  <Text style={{ marginTop: 8, color: "#6B7280" }}>
    Debug: {errorMsg}
  </Text>
)}

              <Pressable
                onPress={generate}
                accessibilityRole="button"
                style={{ marginTop: 12, padding: 12, borderRadius: 10, backgroundColor: "#111827" }}
              >
                <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>{t("retry")}</Text>
              </Pressable>
            </View>
          ) : (
            <View style={{ marginTop: 12 }}>
              <TextInput
                value={text}
                onChangeText={setText}
                multiline
                style={{
                  borderWidth: 1,
                  borderColor: "#D1D5DB",
                  borderRadius: 10,
                  padding: 12,
                  minHeight: 140,
                  fontSize: 16,
                  textAlignVertical: "top",
                }}
                accessibilityLabel={t("aiSuggestion")}
              />

              <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
                <Pressable
                  onPress={() => onAccept(text)}
                  accessibilityRole="button"
                  style={{ flex: 1, padding: 12, borderRadius: 10, backgroundColor: "#111827" }}
                >
                  <Text style={{ color: "white", fontWeight: "700", textAlign: "center" }}>{t("accept")}</Text>
                </Pressable>
                <Pressable
                  onPress={onClose}
                  accessibilityRole="button"
                  style={{ flex: 1, padding: 12, borderRadius: 10, backgroundColor: "#E5E7EB" }}
                >
                  <Text style={{ color: "#111827", fontWeight: "700", textAlign: "center" }}>{t("discard")}</Text>
                </Pressable>
              </View>
            </View>
          )}

          <Pressable onPress={onClose} accessibilityRole="button" style={{ marginTop: 10, padding: 8 }}>
            <Text style={{ textAlign: "center", opacity: 0.7 }}>✕</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
