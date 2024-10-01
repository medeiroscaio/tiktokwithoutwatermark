import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useTikTokDownloader = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLinkHd, setDownloadLinkHd] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [downloadLinkMp3, setDownloadLinkMp3] = useState(null);
  const [error, setError] = useState(null);

  const notifyError = (message) => toast.error(message);

  const isValidTikTokUrl = (url) => {
    const tiktokUrlPattern =
      /^(https?:\/\/)?(www\.)?(tiktok\.com\/)(@[A-Za-z0-9._-]+\/video\/\d+)(\?.*)?$/;
    return tiktokUrlPattern.test(url);
  };

  const fetchVideoLink = async () => {
    if (!url) {
      notifyError("Please enter a TikTok video URL.");
      return;
    }

    if (!isValidTikTokUrl(url)) {
      notifyError(
        "TikTok link is invalid. Please enter a valid TikTok video URL."
      );
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
      setDownloadLinkHd(response.data.data.hdplay);
      setDownloadLink(response.data.data.play);
      setDownloadLinkMp3(response.data.data.music);
    } catch (error) {
      notifyError("Failed to fetch the video. Try again later.");
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    url,
    setUrl,
    loading,
    downloadLinkHd,
    downloadLink,
    fetchVideoLink,
    error,
    downloadLinkMp3,
    setDownloadLink,
    setDownloadLinkHd,
    setDownloadLinkMp3,
  };
};
