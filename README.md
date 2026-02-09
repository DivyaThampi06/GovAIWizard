# GovAI Wizard (React Native + Expo)

This project implements a **3-step application wizard** with:
- Step-based validation and a progress indicator
- Auto-save draft to local device storage (AsyncStorage)
- AI “Help Me Write” for the 3 text areas in Step 3 (OpenAI Chat Completions)
- English/Arabic localization + RTL support for Arabic
- Accessibility labels and keyboard-aware screens
- Mock submission + confirmation screen

## 1) Install
```bash
npm install
```

## 2) Configure OpenAI API key (for assessment)
Create a `.env` file in the project root:
```bash
EXPO_PUBLIC_OPENAI_API_KEY=YOUR_KEY_HERE
```


## 3) Run
```bash
npm start
# or
npm run android
npm run ios
```

## 4) Language / RTL demo
Use the **EN / العربية** toggle in the header.  
When switching to Arabic, RTL is applied 

## 5) Architecture notes
- `src/i18n`: lightweight translation helper
- `src/storage`: save/load/clear draft
- `src/services/openai`: OpenAI call with timeout + graceful errors
- `src/screens`: Step 1/2/3 + Confirmation
- `src/components`: reusable inputs, progres, AI modal
- `src/config`: environmental configuration helper
