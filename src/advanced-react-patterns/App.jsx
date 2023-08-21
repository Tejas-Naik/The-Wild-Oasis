import Counter from "./Counter";
import "./styles.css";

export default function App() {
  return (
    <div>
      <h1>Compound Component Pattern</h1>

      {/* Prop Explosion */}
      <Counter
        iconIncrease="+"
        iconDecrease="-"
        label="My NOT so flexible counter"
        hideLabel={false}
        hideIncrease={false}
        hideDecrease={false}
      />

      <Counter>
        <Counter.Decrease icon="-" />
        <Counter.Count />
        <Counter.Increase icon="+" />
        <Counter.Label>My Super flexible counter</Counter.Label>
      </Counter>

      <div>
        <Counter>
          <Counter.Label>Counter</Counter.Label>
          <Counter.Decrease icon="◀" />
          <Counter.Count />
          <Counter.Increase icon="▶" />
        </Counter>
      </div>
    </div>
  );
}
