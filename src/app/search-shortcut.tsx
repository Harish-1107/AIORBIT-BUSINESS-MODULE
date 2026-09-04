"use client";

import { useEffect } from "react";

export default function SearchShortcut() {
  useEffect(() => {
    const focusSearch = () => {
      const input = document.querySelector<HTMLInputElement>(
        'input[placeholder="Search AI tools, functions, or workflows"]',
      );
      input?.focus();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        focusSearch();
        return;
      }

      if (
        event.key === "Enter" &&
        event.target instanceof HTMLInputElement &&
        event.target.matches('input[placeholder="Search AI tools, functions, or workflows"]')
      ) {
        event.preventDefault();
        document.getElementById("directory")?.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}
