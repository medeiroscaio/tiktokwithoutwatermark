import React from "react";
import "./UserModal.css";
import { useTikTokDownloader } from "../../hooks/useTikTokDownloader.jsx";
import { LoaderSpinner } from "../Loader/loaderspinner.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UserModal() {
  const {
    url,
    setUrl,
    loading,
    downloadLinkHd,
    downloadLink,
    fetchVideoLink,
    setDownloadLinkHd,
    setDownloadLink,
    setDownloadLinkMp3,
    downloadLinkMp3,
  } = useTikTokDownloader();

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
        `tiktok_${
          quality === "audio" ? "audio" : "video"
        }_${quality}.${fileExtension}`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setUrl("");
      setDownloadLinkHd(null), setDownloadLink(null), setDownloadLinkMp3(null);
    } catch (error) {
      console.error(`Error downloading ${quality} file`, error);
    }
  };

  return (
    <div className="container">
      <div className="modal">
        <p className="inter-heavy">Download your TikTok video</p>
        <p className="inter-light">without watermark, and in high quality</p>
        <input
          type="url"
          placeholder="Insert the link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={fetchVideoLink}>
          Download your video without watermark
        </button>

        {loading ? (
          <LoaderSpinner />
        ) : (
          <>
            {downloadLinkHd && (
              <button onClick={() => downloadVideo(downloadLinkHd, "HD")}>
                Click here to download HD
              </button>
            )}
            {downloadLink && (
              <button onClick={() => downloadVideo(downloadLink, "SD")}>
                Click here to download SD
              </button>
            )}
            {downloadLinkMp3 && (
              <button onClick={() => downloadVideo(downloadLinkMp3, "audio")}>
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
