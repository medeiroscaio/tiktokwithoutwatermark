import { useState } from "react";
import "./UserModal.css";

function UserModal() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

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
        <button>Download your video without watermark</button>
      </div>
    </div>
  );
}
export default UserModal;
