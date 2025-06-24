import React, { useState } from "react";
import axios from "axios";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  // Add more languages if supported by the API
];

const Dictionary: React.FC = () => {
  const [word, setWord] = useState("");
  const [language, setLanguage] = useState("en");
  const [definitions, setDefinitions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleLookup = async () => {
    setError(null);
    setDefinitions([]);
    setShowAll(false);
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`
      );
      const defs: string[] = [];
      response.data.forEach((entry: any) => {
        entry.meanings.forEach((meaning: any) => {
          meaning.definitions.forEach((def: any) => {
            defs.push(def.definition);
          });
        });
      });
      setDefinitions(defs);
    } catch (err: any) {
      setError("No definitions found.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && word.trim()) {
      e.preventDefault();
      handleLookup();
    }
  };

  const visibleDefinitions = showAll ? definitions : definitions.slice(0, 3);

  return (
    <div>
      {/* <div>
        <label>
          Language:
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            data-testid="language-select"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>
        </label>
      </div> */}

      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Enter word"
        data-testid="word-input"
        style={{ margin: "16px 0", width: "200px" }}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleLookup}
        disabled={!word.trim()}
        data-testid="lookup-btn"
      >
        Lookup
      </button>
      <div style={{ marginTop: 16 }}>
        <strong>Definitions:</strong>
        <ul data-testid="definitions-list">
          {visibleDefinitions.map((def, idx) => (
            <li key={idx}>{def}</li>
          ))}
        </ul>
        {definitions.length > 3 && !showAll && (
          <button
            onClick={() => setShowAll(true)}
            data-testid="view-more-btn"
            style={{ marginTop: 8 }}
          >
            View more
          </button>
        )}
        {definitions.length > 3 && showAll && (
          <button
            onClick={() => setShowAll(false)}
            data-testid="view-less-btn"
            style={{ marginTop: 8 }}
          >
            View less
          </button>
        )}
        {error && (
          <div data-testid="error-msg" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;
