import React from "react";
import Translator from "../components/Translator";

type TranslatorPageProps = {};

const TranslatorPage: React.FC<TranslatorPageProps> = ({}) => {
  return (
    <div className="TranslatorPage Page">
      <h2>Translator</h2>

      <Translator />
    </div>
  );
};

export default TranslatorPage;
