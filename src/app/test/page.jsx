"use client";
import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Clear previous timer
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); // Delay of 500ms

  useEffect(() => {
    if (debouncedQuery) {
      console.log("Call API with:", debouncedQuery);
      // fetch(`/search?q=${debouncedQuery}`)
    }
  }, [debouncedQuery]);

  return (
    <div className="flex items-center border-1 border-gray-800">
      <input
        className="text-gray-800"
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
