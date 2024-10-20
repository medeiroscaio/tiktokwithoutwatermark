import { useCallback, useState } from "react";

export const useClipboardPaste = () => {
  const [pastedText, setPastedText] = useState("");
  const pasteFromCliboard = useCallback(async () => {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText();
      setPastedText(text);
    } else {
      console("Clipboard API not available");
    }
  }, []);
  return [pastedText, pasteFromCliboard];
};

export default useClipboardPaste;
