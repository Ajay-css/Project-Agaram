import { useEffect, useState } from "react";

export default function TypingText({ text, speed = 20, onComplete }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayed((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        onComplete && onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return <span>{displayed}</span>;
}