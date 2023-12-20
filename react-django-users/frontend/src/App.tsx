import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import RequireGuest from './components/RequireGuest';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import AccountEdit from './pages/AccountEdit';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route index element={<RequireAuth><Dashboard /></RequireAuth>}/>
        <Route path='login' element={<RequireGuest><Login /></RequireGuest>} />
        <Route path='register' element={<RequireGuest><Register /></RequireGuest>} />
        <Route path='account' element={<RequireAuth><Account /></RequireAuth>} />
        <Route path='account/edit' element={<RequireAuth><AccountEdit /></RequireAuth>} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
