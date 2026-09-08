"use client";

if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    // Filter out hydration mismatch errors caused by browser extensions
    // that inject 'bis_skin_checked' into the DOM.
    if (
      args.some(
        (arg) => typeof arg === "string" && arg.includes("bis_skin_checked")
      )
    ) {
      return;
    }
    
    // Some general hydration mismatch warnings that might not include the attribute explicitly 
    // in the first string but in subsequent arguments.
    if (
      typeof args[0] === "string" &&
      args[0].includes("Warning: Prop `%s` did not match.") &&
      args.some((arg) => typeof arg === "string" && arg.includes("bis_skin_checked"))
    ) {
      return;
    }

    originalError(...args);
  };
}

export default function HydrationFix() {
  return null;
}
