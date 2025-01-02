import {useState} from "react";
import {useAuthContext} from "../context/AuthContext";

export const useRegistration = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const authContext = useAuthContext();

    const signup = async ({name, email, password, location, interests, bio}) => {
        setError(null);
        setIsPending(true);

        const errorMessages = {
            "auth/weak-password": "Password should be at least 6 characters.",
            "auth/email-already-in-use": "This email is already registered. Please use a different email.",
            "auth/invalid-email": "The email address is invalid. Please check and try again.",
            "auth/user-not-found": "No user found with this email.",
        };

        try {
            const response = await authContext.registerUserWithEmailAndPassword(email, password);

            if (!response) {
                throw new Error('Could not complete user registration. Please try again');
            }

            await authContext.updateProfileInfo(response.user, {name, location, interests, bio});

            setIsPending(false);
            setError(null);
            await authContext.logout();
            setIsRegistered(true);

        } catch (error) {
            console.log(error.code);
            const errorCode = error.code;
            const errorMessage = errorMessages[errorCode] || "An error occurred. Please try again.";
            setError(errorMessage);
            setIsPending(false);
            setIsRegistered(false);
        }
    }

    return {isRegistered, error, isPending, signup};

}