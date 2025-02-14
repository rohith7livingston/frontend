import React, { useState } from "react";
import { FiMic } from "react-icons/fi";
import "./../stylesheet/CreateNote.css";
import { Link, useNavigate } from "react-router-dom";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const CreateNote = () => {
  const [Title, settitle] = useState("");
  const [detail, setDetail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const navigate = useNavigate();

  const handleSummarize = async () => {
    if (detail.length < 20) {
      setError("Please enter at least 20 characters");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text_to_summarize: detail }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Try to parse error response
        throw new Error(errorData.error || "Network response was not ok"); // Use error message from server, if available
      }

      const summaryResponse = await response.text();
      setDetail(summaryResponse);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setError("Sorry, something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      alert("Speech Recognition API not supported in your browser");
      return;
    }

    if (!listening) {
      recognition.continuous = true;
      recognition.start();
      setListening(true);

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setDetail((prev) => prev + transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setListening(false);
        setError("Speech recognition error. Please check microphone permissions."); // More specific error message
      };

      recognition.onend = () => {
        setListening(false);
      };
    } else {
      recognition.stop();
      setListening(false);
    }
  };

  const handleSave = async () => {
    if (!Title || !detail) {
      setError("Title and Note content are required!");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/save-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: Title,
          email: "hai@gadu.com",
          detail: detail,
        }),
      });

      if (!response.ok) {
         const errorData = await response.json(); // Try to parse error response
        throw new Error(errorData.error || "Failed to save note"); // Use error message from server, if available
      }

      console.log("Note saved:");
      navigate("/home"); // Redirect on successful save
    } catch (error) {
      console.error("Error saving note:", error);
      setError("Error saving note. Please try again."); // More generic error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-note-page">
      <div className="note-creator-container">
        <h2>CREATE NOTES</h2>
      </div>
      <div className="note-creator">
        <input
          type="text"
          placeholder="New Title"
          className="note-title-input"
          onChange={(e) => settitle(e.target.value)}
        />
        <div className="note-buttons">
          <button
            className={`recorder ${listening ? "recording" : ""}`}
            onClick={toggleListening}
          >
            <FiMic size={20} color={listening ? "red" : "#fff"} />
          </button>
          <button className="summarize" onClick={handleSummarize} disabled={isLoading}>
            {isLoading ? "Summarizing..." : "AI Summarizer ✨"} {/* Show loading state */}
          </button>
          <button className="save" onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"} {/* Show loading state */}
          </button>
        </div>
      </div>
      <textarea
        rows={28}
        className="textarea"
        placeholder="Note details..."
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      ></textarea>
      {error && <p className="error">{error}</p>}
      {isLoading && <p className="loading">Loading...</p>}
    </div>
  );
};

export default CreateNote;