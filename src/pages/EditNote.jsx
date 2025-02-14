import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './../stylesheet/EditNote.css'

const EditNote = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { note } = location.state || {};

    const [title, setTitle] = useState(note?.title || "");
    const [detail, setDetail] = useState(note?.detail || "");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async () => {
        // ... (Your existing handleUpdate function remains unchanged)
    };

    return (
        <div className="edit-note-page"> {/* Main page container */}
            <div className="edit-note-container"> {/* Form container */}
                <h2>Edit Note</h2> {/* Clearer heading */}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New Title"
                    className="edit-note-input" /* Specific class for input */
                />
                <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="Note details..."
                    className="edit-note-textarea" /* Specific class for textarea */
                />
                {error && <p className="error-message">{error}</p>}

                <div className="edit-note-buttons">
                    <button className="mic-button">🎤</button>
                    <button className="summarizer-button">AI Summarizer ✨</button>
                    <button className="save-button" onClick={handleUpdate} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditNote;