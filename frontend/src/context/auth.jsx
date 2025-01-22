import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const api = "http://localhost:8000/api/v1"
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: "",
  });
  
  // Set the Authorization token in Axios whenever auth.token changes
  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"]; // Remove the header if no token
    }
  }, [auth.token]);

  // Load token from localStorage
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        token: parseData.token,
      });
    }
  }, []);

  
  return (
    <AuthContext.Provider
      value={{
       api,
        auth,
        setAuth,
        
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming the AuthContext
const useAuth = () => useContext(AuthContext);

export default useAuth;
export { AuthProvider };
