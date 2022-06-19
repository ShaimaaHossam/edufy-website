import { useContext, useEffect, useRef } from "react";

import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";

/**
 * Blocks all navigation attempts when first arg is true,
 * and unblocks when first arg change to false
 *
 * @param  shouldBlock
 * @param  onBlocked
 */
function useNavigationBlocker(shouldBlock, onBlocked) {
  const { navigator } = useContext(NavigationContext);

  const onBlockedRef = useRef(onBlocked);
  useEffect(() => {
    if (!shouldBlock) return;

    let retry;
    const unblock = navigator.block((tx) => {
      onBlockedRef.current();

      retry = () => tx.retry();
    });

    return () => {
      unblock();
      !!retry && retry();
    };
  }, [navigator, shouldBlock]);
}

export default useNavigationBlocker;
