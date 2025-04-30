import React, { useState } from "react";

type CounterProps = {
  initialCount: number;
};

const Counter: React.FC<CounterProps> = ({ initialCount }) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);

  const decrement = () => setCount(count - 1);

  const reset = () => setCount(0);

  const switchSigns = () => setCount(count * -1);

  return (
    <div className="Counter">
      <h2>Count</h2>

      <p data-test-id="count">{count}</p>

      <button onClick={increment}>Increment</button>

      <button onClick={decrement}>Decrement</button>

      <button onClick={reset}>Reset</button>

      <button onClick={switchSigns}>Switch Signs</button>
    </div>
  );
};

export default Counter;
