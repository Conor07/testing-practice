import React from "react";
import TestComponent from "../components/Counter";

type HomeProps = {};

const Home: React.FC<HomeProps> = ({}) => {
  return (
    <div className="HomePage">
      <h1>Home</h1>

      <TestComponent initialCount={0} />
    </div>
  );
};

export default Home;
