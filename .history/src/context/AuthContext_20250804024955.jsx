import { useState } from "react";
import { AuthContext } from "./authcontext";
import api from '../api/axios';
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }) {
    const [user , setUser] = useState(null);
    const navigate = useNavigate();

    const Login = async (email, password) => {
        try{
            const res = await api.post('/login/', { email, password });
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);
                setUser({email});
                return true;

        } catch (err) {
            console.log(err);
        }
};

   const Register = async (email, password , re_password , first_name, last_name) => {
       try{
           await api.post('/register/', { email, password , re_password , first_name , last_name });
           const res = await api.post('/login/', { email, password });
           localStorage.setItem("access", res.data.access);
           localStorage.setItem("refresh", res.data.refresh);
           navigate('/profile');
           setUser({email});
       }
       catch (error)
        {
              console.log(error.response.data);
       }
   }

   const Logout = () => {
       localStorage.removeItem('access');
       localStorage.removeItem('refresh');
       setUser(null);
   }
   return (
       <AuthContext.Provider value={{user, Login, Register, Logout }}>
           {children}
       </AuthContext.Provider>
   );
}

