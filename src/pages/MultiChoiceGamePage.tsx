import React from "react";
import MultiChoiceGame from "../components/MultiChoiceGame";

type MultiChoiceGamePageProps = {};

const MultiChoiceGamePage: React.FC<MultiChoiceGamePageProps> = ({}) => {
  return (
    <div className="MultiChoiceGamePage Page">
      <h1>Multi Choice Game</h1>

      <MultiChoiceGame />
    </div>
  );
};

export default MultiChoiceGamePage;
