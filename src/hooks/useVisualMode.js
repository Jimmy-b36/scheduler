import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  //function to transition to a new mode
  function transition(newMode, replace = false) {
    let newHistory = [...history];
    if (replace) {
      //replace the current mode with the new mode
      newHistory.splice(-1, 1, newMode);
      //set the new history
      setHistory(newHistory);
    } else {
      //add the new mode to the history
      newHistory.push(newMode);
      //set the new history
      setHistory(newHistory);
    }
    setMode(newMode);
  }

  //function to go back to the previous mode
  function back() {
    let newHistory = [...history];
    //remove the last mode from the history if there is more than one
    if (history.length > 1) {
      newHistory.pop();
      setHistory(newHistory);
    }
    //set the new mode to the last mode in the history
    setMode(newHistory[newHistory.length - 1]);
  }

  return {
    mode,
    transition,
    back,
  };
};

export default useVisualMode;
