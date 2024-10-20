import { useCallback } from "react";

export const useClipboardPaste = () => {
  const pasteFromClipboard = useCallback(async () => {
    if (navigator.clipboard) {
      const text = await navigator.clipboard.readText();
      return text;
    } else {
      console.log("API do Clipboard não está disponível");
      return "";
    }
  }, []);

  return pasteFromClipboard;
};
