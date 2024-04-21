import { useState } from "react";
import styles from './dialog.module.scss'

export default function AudioRecorder({ onRecordingComplete }) {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        let audioChunks = [];

        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        recorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          onRecordingComplete(audioBlob);
          audioChunks = [];
        };

        recorder.start();
        setMediaRecorder(recorder);
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing the microphone", error);
      }
    } else {
      alert("Microphone access is not supported by your browser.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className={styles.dialog__record}>
      {isRecording ? (
        <button onClick={stopRecording} id="button_1">
          <svg
            fill="#35CA14"
            width="5.5rem"
            height="5.5rem"
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 35.1016 28.0000 L 35.1016 11.2656 C 35.1016 6.9297 32.1719 3.7187 28 3.7187 C 23.8281 3.7187 20.8984 6.9297 20.8984 11.2656 L 20.8984 28.0000 C 20.8984 32.3125 23.8281 35.5469 28 35.5469 C 32.1719 35.5469 35.1016 32.3125 35.1016 28.0000 Z M 17.0547 48.7422 C 16.1172 48.7422 15.2969 49.5859 15.2969 50.5234 C 15.2969 51.4609 16.1172 52.2813 17.0547 52.2813 L 38.9453 52.2813 C 39.8828 52.2813 40.7031 51.4609 40.7031 50.5234 C 40.7031 49.5859 39.8828 48.7422 38.9453 48.7422 L 29.7578 48.7422 L 29.7578 43.6094 C 38.2890 42.8594 43.9375 36.5547 43.9375 27.9766 L 43.9375 22.4687 C 43.9375 21.5547 43.1172 20.7578 42.2031 20.7578 C 41.2890 20.7578 40.4922 21.5547 40.4922 22.4687 L 40.4922 27.9766 C 40.4922 35.125 35.3359 40.375 28 40.375 C 20.6641 40.375 15.5078 35.125 15.5078 27.9766 L 15.5078 22.4687 C 15.5078 21.5547 14.7110 20.7578 13.7969 20.7578 C 12.8828 20.7578 12.0625 21.5547 12.0625 22.4687 L 12.0625 27.9766 C 12.0625 36.5547 17.7110 42.8594 26.2188 43.6094 L 26.2188 48.7422 Z" />
          </svg>
        </button>
      ) : (
        <button onClick={startRecording} id="button_1">
          <svg
            fill="#000000"
            width="5.5rem"
            height="5.5rem"
            viewBox="0 0 56 56"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 35.1016 28.0000 L 35.1016 11.2656 C 35.1016 6.9297 32.1719 3.7187 28 3.7187 C 23.8281 3.7187 20.8984 6.9297 20.8984 11.2656 L 20.8984 28.0000 C 20.8984 32.3125 23.8281 35.5469 28 35.5469 C 32.1719 35.5469 35.1016 32.3125 35.1016 28.0000 Z M 17.0547 48.7422 C 16.1172 48.7422 15.2969 49.5859 15.2969 50.5234 C 15.2969 51.4609 16.1172 52.2813 17.0547 52.2813 L 38.9453 52.2813 C 39.8828 52.2813 40.7031 51.4609 40.7031 50.5234 C 40.7031 49.5859 39.8828 48.7422 38.9453 48.7422 L 29.7578 48.7422 L 29.7578 43.6094 C 38.2890 42.8594 43.9375 36.5547 43.9375 27.9766 L 43.9375 22.4687 C 43.9375 21.5547 43.1172 20.7578 42.2031 20.7578 C 41.2890 20.7578 40.4922 21.5547 40.4922 22.4687 L 40.4922 27.9766 C 40.4922 35.125 35.3359 40.375 28 40.375 C 20.6641 40.375 15.5078 35.125 15.5078 27.9766 L 15.5078 22.4687 C 15.5078 21.5547 14.7110 20.7578 13.7969 20.7578 C 12.8828 20.7578 12.0625 21.5547 12.0625 22.4687 L 12.0625 27.9766 C 12.0625 36.5547 17.7110 42.8594 26.2188 43.6094 L 26.2188 48.7422 Z" />
          </svg>
        </button>
      )}
    </div>
  );
}