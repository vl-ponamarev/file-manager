// при передаче в компонент с onClick других компонентов через import --->>>> при клике эти компоненты БУДУТ ререндериться
// при передаче в компонент с onClick других компонентов через props --->>>> при клике эти компоненты НЕ БУДУТ ререндериться

import React, { useState, ReactNode } from "react";
import "./styles.css";

const VerySlowComponent = () => {
  console.log("Very slow component re-renders");
  return <div>Very slow component</div>;
};

const AnotherSlowComponent = () => {
  console.log("Another slow component re-renders");
  return <div>Another slow component</div>;
};

const FullComponent = () => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <h3>component with everything</h3>
      <p>Click this component - "slow" component will re-render</p>
      <p>Re-render count: {state}</p>
      <VerySlowComponent />
      <p>Something</p>
      <AnotherSlowComponent />
    </div>
  );
};

▶️const ComponentWithClick = ({
  left,
  right
}: {
  left: ReactNode;
  right: ReactNode;
}) => {
  const [state, setState] = useState(1);

  const onClick = () => {
    setState(state + 1);
  };

  return (
    <div onClick={onClick} className="click-block">
      <p>Re-render count: {state}</p>
      {left}
      <p>Something</p>
      {right}
    </div>
  );
};

const SplitComponent = () => {
  const left = (
    <>
      <h3>component with slow components passed as props</h3>
      <p>Click the block - "slow" components will NOT re-render</p>

      <VerySlowComponent />
    </>
  );

  const right = <AnotherSlowComponent />;

  return (
    <>
      <ComponentWithClick left={left} right={right} />
    </>
  );
};

const App = () => {
  return (
    <>
      <h2>Open console, click a button</h2>
      <p>Re-render should be logged on every click</p>

      <FullComponent />
      <hr />
      <hr />
      <SplitComponent />
    </>
  );
};

export default App;
