import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import '../stylesheet/CollabEditor.css'; // Ensure this path is correct

const socket = io('http://localhost:3001');

const CollabEditor = () => {
  const { noteId } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    socket.emit('joinNote', noteId);

    socket.on('joinedRoom', (noteId) => {
      console.log(`Successfully joined room: ${noteId}`);
    });

    socket.on('noteUpdate', (newContent) => {
      console.log(`Received update: ${newContent}`);
      setContent(newContent);
    });

    return () => {
      socket.off('joinedRoom');
      socket.off('noteUpdate');
    };
  }, [noteId]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    socket.emit('updateNote', { noteId, content: e.target.value });
  };

  return (
    <div id="collaborative-editor-container">
      <h1>Collaborative Editor</h1>
      <div id="editor-content">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Start typing to collaborate..."
        />
      </div>
    </div>
  );
};

export default CollabEditor;
