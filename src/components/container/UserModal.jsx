import React from "react";
import "./UserModal.css";
import { useTikTokDownloader } from "../../hooks/useTikTokDownloader.jsx";
import { LoaderSpinner } from "../Loader/loaderspinner.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UserModal() {
  const { url, setUrl, loading, downloadLink, fetchVideoLink } =
    useTikTokDownloader();

  const downloadVideo = async (downloadLink) => {
    try {
      const response = await axios.get(downloadLink, {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "video/mp4" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "tiktok_video.mp4");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setUrl("");
    } catch (error) {
      console.error("Error downloading video", error);
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
          downloadLink && (
            <button onClick={() => downloadVideo(downloadLink)}>
              Click here to download
            </button>
          )
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserModal;
