import {createContext, useState, useEffect, useContext} from 'react';
import {firebaseAuth, firestore} from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import {createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
            setCurrentUser(user ?? null);
        })
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log("Current user updated:", currentUser);
    }, [currentUser]);


    const registerUserWithEmailAndPassword = async (email, password) => {
       return await createUserWithEmailAndPassword(firebaseAuth, email, password);
    }

    const updateProfileInfo = async (user, {name, location, interests, bio}) => {
        try {
            await updateProfile(user, {displayName: name});

            // Store additional attributes in Firestore
            const userDocRef = doc(firestore, "users", user.uid); // "users" collection

            await setDoc(userDocRef, {
                location,
                interests,
                bio,
            });
            console.log("User profile and additional info updated successfully!");

        } catch (error) {
            console.error("Error updating profile info:", error);
            throw new Error("Error updating profile info:");
        }
    }

    const loginUserWithEmailAndPassword = async (email, password) => {
        return await signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const logout = async () => {
        await firebaseAuth.signOut();
    }

    return (
        <AuthContext.Provider value={{
            currentUser,
            registerUserWithEmailAndPassword,
            updateProfileInfo,
            loginUserWithEmailAndPassword,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}