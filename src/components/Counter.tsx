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

      <p data-testid="count">{count}</p>

      <button onClick={increment} data-testid="increment">
        Increment
      </button>

      <button onClick={decrement} data-testid="decrement">
        Decrement
      </button>

      <button onClick={reset} data-testid="reset">
        Reset
      </button>

      <button onClick={switchSigns} data-testid="switch-signs">
        Switch Signs
      </button>
    </div>
  );
};

export default Counter;
