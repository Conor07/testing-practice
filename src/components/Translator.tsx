import React, { useState } from "react";
import axios from "axios";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  // Add more languages as needed
];

const Translator: React.FC = () => {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState<string>("");
  const [sourceLang, setSourceLang] = useState<string>("en");
  const [targetLang, setTargetLang] = useState<string>("es");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleTranslate = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.post(
        "https://libretranslate.com/translate",
        {
          q: text,
          source: sourceLang,
          target: targetLang,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && !response.data.error) {
        setTranslation(response.data.translatedText);
        setError(null);
      } else {
        setTranslation("");
        setError("Translation failed. Please try again.");
      }
    } catch (error) {
      setError("Translation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <label>
          Source Language:
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            data-testid="source-lang"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 16 }}>
          Target Language:
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            data-testid="target-lang"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
        rows={4}
        cols={40}
        style={{ display: "block", margin: "16px 0" }}
      />

      <button onClick={handleTranslate} disabled={!text.trim()}>
        Translate
      </button>

      {error && (
        <div
          style={{ color: "red", marginTop: 16 }}
          data-testid="error-message"
        >
          {error}
        </div>
      )}

      {loading && <div data-testid="loading-message">Translating...</div>}

      <div style={{ marginTop: 16 }}>
        <strong>Translation:</strong>
        <div data-testid="translation-result">{translation}</div>
      </div>
    </div>
  );
};

export default Translator;
