import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ProgressSteps from "./src/components/ProgressSteps";
import Step1Personal from "./src/screens/Step1Personal";
import Step2FamilyFinancial from "./src/screens/Step2FamilyFinancial";
import Step3Situation from "./src/screens/Step3Situation";
import Confirmation from "./src/screens/Confirmation";
import { DEFAULT_DRAFT } from "./src/types/application";
import { loadDraft, saveDraft, clearDraft } from "./src/storage/draft";
import { getLang, setLang } from "./src/i18n";


export default function App() {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState(DEFAULT_DRAFT);
  const [referenceId, setReferenceId] = useState(null);


  const [langState, setLangState] = useState(getLang());


function changeLanguage(next) {
  setLang(next);       
  setLangState(next);   
}



  useEffect(() => {
    let alive = true;
    loadDraft()
      .then((d) => { if (alive && d) setDraft(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    saveDraft(draft).catch(() => {});
  }, [draft]);

  return (
    <SafeAreaProvider>
      {/* key makes sure layout re-renders properly */}
     <View style={{ flex: 1 }} key={langState}>

        {step !== 4 ? <ProgressSteps current={step} total={3} /> : null}

        {step === 1 ? (
         <Step1Personal
  draft={draft}
  onChange={setDraft}
  onNext={() => setStep(2)}
  lang={langState}
  onChangeLang={changeLanguage}
/>

        ) : null}

        {step === 2 ? (
          <Step2FamilyFinancial
            draft={draft}
            onChange={setDraft}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        ) : null}

        {step === 3 ? (
          <Step3Situation
            draft={draft}
            onChange={setDraft}
            onBack={() => setStep(2)}
            onSubmit={(ref) => {
              setReferenceId(ref);
              setStep(4);
            }}
          />
        ) : null}

        {step === 4 ? (
          <Confirmation
            referenceId={referenceId}
            onDone={async () => {
              await clearDraft();
              setDraft(DEFAULT_DRAFT);
              setReferenceId(null);
              setStep(1);
            }}
          />
        ) : null}
      </View>
    </SafeAreaProvider>
  );
}
