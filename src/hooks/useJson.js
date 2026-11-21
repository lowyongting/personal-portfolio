import { useEffect, useState } from "react";

/** Fetches a JSON file from the public folder, relative to the deploy base. */
export function useJson(fileName) {
  const [state, setState] = useState({ data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${import.meta.env.BASE_URL}${fileName}`, {
      signal: controller.signal,
      // Revalidate so content edits show up without a hard refresh.
      cache: "no-cache",
    })
      .then((res) => {
        if (!res.ok) throw new Error(`${fileName}: ${res.status}`);
        return res.json();
      })
      .then((data) => setState({ data, error: null }))
      .catch((error) => {
        if (error.name !== "AbortError") setState({ data: null, error });
      });
    return () => controller.abort();
  }, [fileName]);

  return state;
}
