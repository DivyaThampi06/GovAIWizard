import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import en from "./en.json";
import ar from "./ar.json";

const strings = { en, ar };
let lang = (Localization.getLocales()[0]?.languageCode === "ar" ? "ar" : "en");

export function getLang() {
  return lang;
}

export function setLang(next) {
  lang = next;
  const shouldRTL = lang === "ar";
  if (I18nManager.isRTL !== shouldRTL) {
    I18nManager.allowRTL(shouldRTL);
    I18nManager.forceRTL(shouldRTL);
  }
}

export function t(key, vars) {
  const dict = strings[lang] || strings.en;
  let text = dict[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.split(`{${k}}`).join(String(v));
    });
  }
  return text;
}
