import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RecordingComponent from "./components/RecordingComponent";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioPermission, setAudioPermission] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);

  const handleLogin = (email, name) => {
    // Simulate API call to log in user and set loggedIn state
    setLoggedIn(true);
  };

  const handleStartRecording = () => {
    // Start recording logic
    setRecording(true);
  };

  const handleStopRecording = () => {
    // Stop recording logic
    setRecording(false);
  };

  const handleStartAudioRecording = () => {
    // Start audio recording logic
    setIsRecordingAudio(true);
  };

  const handleStopAudioRecording = () => {
    // Stop audio recording logic
    setIsRecordingAudio(false);
  };

  return (
    <div className="app-container">
      {!loggedIn ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <div>
          <RecordingComponent
            recording={recording}
            audioPermission={audioPermission}
            isRecordingAudio={isRecordingAudio}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onStartAudioRecording={handleStartAudioRecording}
            onStopAudioRecording={handleStopAudioRecording}
          />
        </div>
      )}
    </div>
  );
}

export default App;
