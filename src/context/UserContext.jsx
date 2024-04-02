/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setuser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setuser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setuser(null);

    localStorage.removeItem("user");
  };

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key == "user") {
        setuser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
