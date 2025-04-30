import React from "react";
import TestComponent from "../components/TestComponent";

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div className="HomePage">
      <h1>Home</h1>

      <TestComponent />
    </div>
  );
};

export default Home;
