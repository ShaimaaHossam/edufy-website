import { useEffect, useRef } from "react";

/**
 * Custom hook to debounce running of given effect
 * @param {Function} effect - imperative and possibly effectful function
 * @param {number} timeout - delaying time in ms
 * @param {boolean} runFirst - boolean flag to run first time without delay
 * @param {Array} deps - the effect deps array literal, keep order
 */
function useDebouncedEffect(effect, timeout, runFirst, deps) {
  const effectRef = useRef(effect);
  const timeoutRef = useRef(timeout);
  const runFirstRef = useRef(runFirst);

  // when effect changes, update the effect ref
  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    // if effect needs first run without delay
    if (runFirstRef.current) {
      // run immidiately
      effectRef.current();
      // set runFirstRef flag to false
      runFirstRef.current = false;

      return;
    }

    const timeoutID = setTimeout(() => effectRef.current(), timeoutRef.current);

    // cleanup
    return () => {
      // clear the timeout before effect runs again
      clearTimeout(timeoutID);
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, deps);
}

export default useDebouncedEffect;
