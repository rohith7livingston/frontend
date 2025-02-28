import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login'
import Home from './pages/Home'
import CreateNote from './pages/CreateNote'
import Voice from './components/Voice';
import EditNote from './pages/EditNote';
import './App.css'
import CollabPage from './pages/CollabPage';
import CollabEditor from './pages/CollabEditor'
function App() {
  return (
    <main id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={< Login/>} />
          <Route path="/" element={< Home />} />
          <Route path="/create-note" element={< CreateNote/>} />
          <Route path="/voice" element={< Voice/>} />
          <Route path="/edit-note" element={<EditNote />} />
          <Route path="/collab-page" element={<CollabPage/>}/>
          <Route path="/collab-editor/:noteId" element={<CollabEditor />} />
          </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
