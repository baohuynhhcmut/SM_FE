import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token,setToken] = useState(null)
    const [cart,setCart] = useState([])

    // const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    
    
    const login = (userToken,idUser) => {
      setToken(userToken);
      localStorage.setItem("token", userToken);
      localStorage.setItem("id", idUser);
      setIsAuthenticated(true);
    };
  
    const logout = () => {
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("id")
        // navigate("/login")
    };
    
    const checkAuth = () =>{
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
        }
    }

    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout,token,checkAuth,cart,setCart }}>
        {children}
      </AuthContext.Provider>
    );
};
  
export const useAuth = () => useContext(AuthContext)