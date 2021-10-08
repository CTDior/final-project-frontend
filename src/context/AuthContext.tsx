import { User } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../firebaseConfig';



export interface AuthContextModel {
    user: User|null; // null when not logged in
}
const defaultValue: AuthContextModel = {
    user: null
};

const AuthContext = createContext(defaultValue);


export const AuthContextProvider = ({children}: {children: ReactNode}) => {
    const [ user, setUser ] = useState<User|null>(null);
    
    useEffect(() => { // useEffect to only register once at start
        return auth.onAuthStateChanged(newUser => {
            setUser(newUser);
        });
    }, []);
    
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};