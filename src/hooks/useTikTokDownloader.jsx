import { useReducer, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  url: "",
  loading: false,
  downloadLinkHd: null,
  downloadLink: null,
  downloadLinkMp3: null,
  error: null,
  uniqueId: null,
  downloadButton: true,
};

// FUNCTION FOR HANDLE THE ACTIONS
const downloaderReducer = (state, action) => {
  // CURRENT STATE AND THE NEW STATE (ACTION.PAYLOAD)
  switch (action.type) {
    case "SET_URL":
      return { ...state, url: action.payload };
    case "RESET_URL":
      return { ...state, url: "" };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_DOWNLOAD_LINKS":
      return {
        ...state,
        downloadLinkHd: action.payload.hd,
        downloadLink: action.payload.sd,
        downloadLinkMp3: action.payload.mp3,
        uniqueId: action.payload.uniqueId,
      };
    case "SET_DOWNLOAD_BUTTON":
      return {
        ...state,
        downloadButton: action.payload,
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export const useTikTokDownloader = () => {
  // INITIALIZE USEREDUCER
  // INITIALSTATE: STATE, DISPATCH: ACTION
  // START TO USE "STATE.THING" TO ACCESS THE CURRENT STATE
  const [state, dispatch] = useReducer(downloaderReducer, initialState);

  const notifyError = (message) => toast.error(message);

  const tiktokUrlPattern = useMemo(
    () => [
      /^(https?:\/\/)?(www\.)?(tiktok\.com\/)(@[A-Za-z0-9._-]+\/video\/\d+)(\?.*)?$/,
      /^(https?:\/\/)?(vm\.tiktok\.com\/\w+\/?)(\?.*)?$/,
    ],
    []
  );

  const isValidTikTokUrl = (url) =>
    tiktokUrlPattern.some((pattern) => pattern.test(url));

  const fetchVideoLink = async () => {
    // ACCESS THE CURRENT URL STATE
    if (!state.url) {
      notifyError("Please enter a TikTok video URL.");
      return;
    }

    if (!isValidTikTokUrl(state.url)) {
      notifyError(
        "TikTok link is invalid. Please enter a valid TikTok video URL."
      );
      return;
    }
    // USE DISPATCH TO DEFINE THE TYPE AND THE PAYLOAD TO UPDATE
    dispatch({ type: "SET_DOWNLOAD_BUTTON", payload: false });
    dispatch({ type: "SET_LOADING", payload: true });

    const options = {
      method: "GET",
      url: "https://tiktok-video-no-watermark2.p.rapidapi.com/",
      params: {
        url: state.url,
        hd: "1",
      },
      headers: {
        "x-rapidapi-key": "7effb6e978msh3787522182c0cf7p185c05jsn320426c6b770",
        "x-rapidapi-host": "tiktok-video-no-watermark2.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      dispatch({
        type: "SET_DOWNLOAD_LINKS",
        payload: {
          hd: response.data.data.hdplay,
          sd: response.data.data.play,
          mp3: response.data.data.music,
          uniqueId: response.data.data.author.unique_id,
        },
      });
    } catch (error) {
      notifyError("Failed to fetch the video. Try again later.");
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return {
    state,
    dispatch,
    fetchVideoLink,
  };
};
