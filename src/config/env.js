export function getOpenAIApiKey() {
  try {
    if (typeof process !== "undefined" && process?.env?.EXPO_PUBLIC_OPENAI_API_KEY) {
      return process.env.EXPO_PUBLIC_OPENAI_API_KEY;
    }
  } catch (e) {}
  return "";
}
