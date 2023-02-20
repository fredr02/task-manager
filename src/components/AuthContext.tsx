import { User } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

type AuthContextWrapperProps = {
  children: JSX.Element;
};
const AuthContext = createContext<User | null>(null);
const AuthContextWrapper = ({ children }: AuthContextWrapperProps) => {
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        navigate('/');
      } else {
        console.log('signed out');
        navigate('/login');
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthContextWrapper;
export { AuthContext };
