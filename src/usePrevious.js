import { useEffect, useRef } from "react";

/**
 * Hook, that returns the last used value.
 */

// componentDidUpdate
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
