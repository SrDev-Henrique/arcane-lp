import React, { createContext, useState } from "react";

interface TransitionContextProps {
  completed: boolean;
  toggleCompleted: (value: boolean) => void;
}

const TransitionContext = createContext<TransitionContextProps>({
  completed: false,
  toggleCompleted: () => {},
});

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = (value: boolean) => {
    setCompleted(value);
  };

  return (
    <TransitionContext.Provider value={{ completed, toggleCompleted }}>
      {children}
    </TransitionContext.Provider>
  );
};

export default TransitionContext;
