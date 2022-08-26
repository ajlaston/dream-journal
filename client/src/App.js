import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DContext } from './DreamContext';
import Navbar from './component/Navbar';
import Auth from './routes/Auth';
import ProtectedRoute from './component/ProtectedRoute';
import Home from './routes/Home';
import CreateDream from './routes/CreateDream';

function App() {

  const { user, token} = React.useContext(DContext);

  return (
    <div className="App">
      {token && <Navbar />}
      <Routes>
        <Route path='/' element={token ? <Navigate to='/home' /> : <Auth />} />

        <Route
          path='/home'
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Home user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/createdream'
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <CreateDream />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
