import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize user state from local storage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the profile data only if the user is not already set from local storage
    if (!user) {
      axios.get('/profile')
        .then(({ data }) => {
          setUser(data);
          localStorage.setItem('user', JSON.stringify(data));
        })
        .catch(err => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    axios.get('/getusers')
      .then(response => setUsers(response.data))
      .catch(err => console.log(err));
  }, []);

  const logout = () => {
    // Optionally, notify the backend to invalidate the session/token
    axios.post('/logout')
      .then(() => {
        // Clear user state
        setUser(null);
        // Remove user from local storage
        localStorage.removeItem('user');
      })
      .catch(err => console.log(err));
  };

  return (
    <UserContext.Provider value={{ user, setUser, users, setUsers, logout }}>
      {children}
    </UserContext.Provider>
  );
}
