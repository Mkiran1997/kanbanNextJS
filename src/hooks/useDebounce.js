import { useMemo } from "react";
import { debounce } from "lodash";

const useDebounce = (callbackFunction, duration) => {
  return useMemo(
    () => debounce(callbackFunction, duration),
    [callbackFunction, duration]
  );
};

export default useDebounce;
