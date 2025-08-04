import { useState } from "react";
import { AuthContext } from "./authcontext";
import axios from '../api/axios';

export default function AuthProvider({ children }) {
    const [user , setUser] = useState(null);

    const Login = async (email, password) => {
        try{
            const res = await axios.post('/login/', { email, password });
            if (res.data?.access) {
                localStorage.setItem('access', res.data.access);
                localStorage.setItem('refresh', res.data.refresh);
                setUser({email});
                return true;
            }
            else {
                return false;
            }
        } catch (err) {
            console.log(err);
        }
};

   const Register = async (email, password , re_password , first_name, last_name) => {
       try{
           await axios.post('/register/', { email, password , re_password , first_name , last_name });
           return 'success';
       }
       catch (error)
        {
           return error;
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

