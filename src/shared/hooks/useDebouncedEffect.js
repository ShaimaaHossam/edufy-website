import { useEffect, useRef } from "react";

/**
 * Custom hook to debounce running of given effect
 * @param {Function} effect - imperative and possibly effectful function
 * @param {Array} deps - the effect deps array literal, keep order
 * @param {number} timeout - delaying time in ms
 * @param {boolean} skipFirstRun - boolean flag to skip run on mount
 * @param {boolean} skipFirstDelay - boolean flag to skip first delay on mount
 */
function useDebouncedEffect(
  effect,
  deps,
  timeout,
  skipFirstRun,
  skipFirstDelay
) {
  const effectRef = useRef(effect);
  const timeoutRef = useRef(timeout);

  const skipFirstRunRef = useRef(skipFirstRun);
  const skipFirstDelayRef = useRef(skipFirstDelay);

  useEffect(() => {
    effectRef.current = effect;
  }, [effect]);

  useEffect(() => {
    // if effect needs to skip first run
    if (skipFirstRunRef.current) {
      skipFirstRunRef.current = false;
      return;
    }

    // if effect needs first run without delay
    if (skipFirstDelayRef.current) {
      effectRef.current();

      skipFirstDelay.current = false;
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
