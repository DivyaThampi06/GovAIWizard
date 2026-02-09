const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export async function helpMeWrite({ apiKey, promptContext, language, timeoutMs = 15000 }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    if (!apiKey) {
      throw new Error("missing_api_key");
    }

    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
      
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              language === "ar"
                ? "مساعدة المواطنين في صياغة أوصاف واضحة ومحترمة وموجزة لطلبات الدعم الاجتماعي الحكومية."
                : "Assist citizens in drafting clear, respectful, and concise descriptions for government social support applications.",
          },
          { role: "user", content: promptContext },
        ],
        temperature: 0.4,
      }),
    });

   
    const raw = await res.text();
    let json = null;
    try { json = raw ? JSON.parse(raw) : null; } catch {  }

    if (!res.ok) {
      const msg =
        json?.error?.message ||
        json?.message ||
        raw ||
        `HTTP ${res.status}`;
      throw new Error(`openai_http_${res.status}: ${msg}`);
    }

    const text = json?.choices?.[0]?.message?.content?.trim?.() ?? "";
    if (!text) throw new Error("empty_ai_response");
    return text;
  } catch (e) {
    if (e?.name === "AbortError") throw new Error("timeout");
    throw e;
  } finally {
    clearTimeout(timer);
  }
}
