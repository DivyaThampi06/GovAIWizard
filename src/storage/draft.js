import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "gov_ai_application_draft_v1";

export async function loadDraft() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveDraft(draft) {
  await AsyncStorage.setItem(KEY, JSON.stringify(draft));
}

export async function clearDraft() {
  await AsyncStorage.removeItem(KEY);
}
