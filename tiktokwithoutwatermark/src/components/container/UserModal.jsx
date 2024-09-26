import { useState } from "react";
import "./UserModal.css";
import axios from "axios";
import { Oval } from "react-loader-spinner";

function UserModal() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);

  const handleLink = async () => {
    if (!url) {
      alert("TikTok invalid link");
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      url: "https://tiktok-video-no-watermark2.p.rapidapi.com/",
      params: {
        url: url,
        hd: "1",
      },
      headers: {
        "x-rapidapi-key": "7effb6e978msh3787522182c0cf7p185c05jsn320426c6b770",
        "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setDownloadLink(response.data.data.play);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

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
      setDownloadLink(null);
      setUrl("");
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading video", error);
    }
  };

  return (
    <div className="container">
      <div className="modal">
        <p className="inter-heavy">Download your tik tok video</p>
        <p className="inter-light">without watermark, and high quality</p>
        <input
          type="url"
          placeholder="insert the link"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <button onClick={handleLink}>
          Download your video without watermark
        </button>
        {loading ? (
          <Oval
            visible={true}
            height={40}
            width={40}
            color="#D3D3D3"
            secondaryColor="#000000"
            ariaLabel="oval-loading"
            wrapperStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
            wrapperClass=""
          />
        ) : (
          downloadLink && (
            <button onClick={() => downloadVideo(downloadLink)}>
              Click here to download
            </button>
          )
        )}
      </div>
    </div>
  );
}
export default UserModal;
