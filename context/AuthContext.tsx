"use client";

import { useEffect, useState, useContext, ReactNode } from "react";
import { createContext } from "react";
import { auth } from "../firebase";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";

interface AuthContextType {
    user: User | null;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const signup = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
    };

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    return (
        <authContext.Provider value={{ user, signup, logout, signIn }}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}