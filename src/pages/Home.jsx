import { useState, useEffect } from "react";
import {
  FiSearch,
  FiPlus,
  FiBell,
  FiSettings,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { FaRegStickyNote } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./../stylesheet/Home.css";
import { useNavigate } from "react-router-dom";
export default function NoteAppUI() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userEmail = "hai@gadu.com"
 
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/get-notes?email=${userEmail}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch notes: ${response.status}`);
        }

        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error fetching notes:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // 🔹 Delete a note
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      const response = await fetch(`http://localhost:3001/delete-note/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // Remove the deleted note from UI
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error.message);
      alert("Failed to delete note!");
    }
  };

  // 🔹 Edit a note (Replace alert with a form/modal if needed)
const navigate = useNavigate();

const handleEdit = (note) => {
  navigate("/edit-note", { state: { note } });
};




  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="app-sidebar">
        <div className="app-sidebar-icon">
          <FaRegStickyNote />
        </div>
        <div className="app-sidebar-icon">
          <FiBell />
        </div>
        <div className="app-sidebar-icon">
          <FiSettings />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="app-header">
          <input
            className="search-input"
            type="text"
            placeholder="Search anything..."
          />
          <button className="new-note-btn">
            <FiPlus />
            <Link to="/create-note" className="new-note-link">
              New Note
            </Link>
          </button>
          <button className="new-note-btn collab-note">
            <FiPlus />
            <Link to="/collab-page" className="new-note-collab link">
              Collab Note
            </Link>
          </button>
        </div>

        {/* Notes Grid */}
        <div className="notes-grid">
          {notes.map((note) => (
            <div
              key={note._id}
              className={`note-card ${note.color || "default-color"}`}
            >
              <h3 className="note-title">{note.title}</h3>
              {note.detail && <p className="note-description">{note.detail}</p>}
              {note.date && (
                <p className="note-date">
                  {new Date(note.date).toLocaleDateString()}
                </p>
              )}

              {/* Action Buttons */}
              <div className="note-actions">
                <button className="edit-btn" onClick={() => handleEdit(note)}>
                  <FiEdit style={{ color: "black" }} /> Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(note._id)}
                >
                  <FiTrash2 style={{ color: "red" }} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
