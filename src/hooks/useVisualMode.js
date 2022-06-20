import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    let newHistory = [...history];
    if (replace) {
      newHistory.splice(-1, 1, newMode);
      setHistory(newHistory);
    } else {
      newHistory.push(newMode);
      setHistory(newHistory);
    }
    setMode(newMode);
  }

  function back() {
    let newHistory = [...history];
    if (history.length > 1) {
      newHistory.pop();
      setHistory(newHistory);
    }
    setMode(newHistory[newHistory.length - 1]);
  }

  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;
