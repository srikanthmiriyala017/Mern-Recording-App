import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl as faRecordVinylSolid } from "@fortawesome/pro-solid-svg-icons";
import { faRecordVinyl as faRecordVinylThin } from "@fortawesome/pro-thin-svg-icons";

import "./RecordingComponent.css"

const RecordingComponent = () => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState(null);

  const startRecording = async () => {
    try {
      const constraints = { video: true, audio: true };
      const userStream = await navigator.mediaDevices.getUserMedia(constraints);
      const recorder = new MediaRecorder(userStream);
      const chunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const blobUrl = URL.createObjectURL(blob);
        setRecordedBlobUrl(blobUrl);
        setRecordedChunks([]);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      <h2>Recording Component</h2>
      {!recording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      {recordedBlobUrl && (
        <div>
          <video controls src={recordedBlobUrl} />
          <a href={recordedBlobUrl} download="recorded-video.webm">
            Save Recorded Video
          </a>
        </div>
      )}
    </div>
  );
};

export default RecordingComponent;
