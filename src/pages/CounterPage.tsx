import React from "react";
import Counter from "../components/Counter";

type CounterPageProps = {};

const CounterPage: React.FC<CounterPageProps> = ({}) => {
  return (
    <div className="Page">
      <h1>Counter</h1>

      <Counter initialCount={0} />
    </div>
  );
};

export default CounterPage;
