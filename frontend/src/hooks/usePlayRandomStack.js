import { useEffect, useState } from "react";
import { fetch } from "../store/csrf";

const usePlayRandomStack = () => {
  const [randomStackId, setRandomStackId] = useState(null);

  useEffect(() => {
    (async () => {
      await fetch("/api/stacks/features/random").then((response) => {
        return setRandomStackId(response.data.stackId);
      });
    })();
  }, []);

  return randomStackId;
};

export default usePlayRandomStack;
