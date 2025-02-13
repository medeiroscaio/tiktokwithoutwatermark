import React from "react";
import "./UserModal.css";
import { useTikTokDownloader } from "../../hooks/useTikTokDownloader.jsx";
import { LoaderSpinner } from "../Loader/loaderspinner.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { MdContentPaste } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { useClipboardPaste } from "../../hooks/useClipboardPaste.jsx";
import { useTheme } from "../../hooks/ThemeContext.jsx";
import { ButtonToggle } from "../ButtonToggle/buttontoggle.jsx";

function UserModal() {
  const { state, dispatch, fetchVideoLink } = useTikTokDownloader();
  const pasteFromClipboard = useClipboardPaste();
  const { theme, toggleTheme } = useTheme();

  const downloadVideo = async (downloadLink, quality) => {
    try {
      const response = await axios.get(downloadLink, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: quality === "audio" ? "audio/mp3" : "video/mp4",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      const fileExtension = quality === "audio" ? "mp3" : "mp4";
      link.setAttribute(
        "download",
        `tiktok_${quality === "audio" ? "audio" : "video"}_${
          state.uniqueId
        }_${quality}.${fileExtension}`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      dispatch({ type: "RESET" });
    } catch (error) {
      console.error(`Error downloading ${quality} file`, error);
    }
  };

  return (
    <div className={`container ${theme}`}>
      <div className={`modal ${theme}`}>
        <div className="toggle-button">
          <ButtonToggle />
        </div>
        <p className="inter-heavy">Download your TikTok video</p>
        <p className="inter-light">without watermark, and high quality</p>
        <div className="input-wrapper">
          <input
            className={`${theme}`}
            type="url"
            placeholder="Insert the link"
            value={state.url}
            onChange={(e) =>
              dispatch({ type: "SET_URL", payload: e.target.value })
            }
          />

          {state.url ? (
            <button
              onClick={() => {
                dispatch({ type: "RESET_URL" });
              }}
              className={`action-button ${theme}`}
            >
              <MdClear />
            </button>
          ) : (
            <button
              onClick={async () => {
                const text = await pasteFromClipboard();
                dispatch({ type: "SET_URL", payload: text });
              }}
              className={`action-button ${theme}`}
            >
              <MdContentPaste />
            </button>
          )}
        </div>
        {state.downloadButton ? (
          <button
            className={`download-button ${theme}`}
            onClick={() => {
              fetchVideoLink();
            }}
          >
            Download your video without watermark
          </button>
        ) : null}
        {state.loading ? (
          <LoaderSpinner />
        ) : (
          <>
            {state.downloadLinkHd && (
              <button
                className={`download-button ${theme}`}
                onClick={() => downloadVideo(state.downloadLinkHd, "HD")}
              >
                Click here to download HD
              </button>
            )}
            {state.downloadLink && (
              <button
                className={`download-button ${theme}`}
                onClick={() => downloadVideo(state.downloadLink, "SD")}
              >
                Click here to download SD
              </button>
            )}
            {state.downloadLinkMp3 && (
              <button
                className={`download-button ${theme}`}
                onClick={() => downloadVideo(state.downloadLinkMp3, "audio")}
              >
                Click here to download audio video
              </button>
            )}
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserModal;
