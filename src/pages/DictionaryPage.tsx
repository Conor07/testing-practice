import React from "react";
import Dictionary from "../components/Dictionary";

type DictionaryPageProps = {};

const DictionaryPage: React.FC<DictionaryPageProps> = ({}) => {
  return (
    <div className="DictionaryPage Page">
      <h2>Dictionary</h2>

      <Dictionary />
    </div>
  );
};

export default DictionaryPage;
