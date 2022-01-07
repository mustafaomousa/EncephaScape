import { useEffect, useState } from "react";
import { fetch } from "../store/csrf";

const useCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      await fetch("/api/categories").then((response) => {
        if (response.ok) {
          return setCategories(response.data.categories);
        }
      });
    })();
  }, []);

  return categories;
};

export default useCategories;
