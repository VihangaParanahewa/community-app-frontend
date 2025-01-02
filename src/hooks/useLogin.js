import {useState} from "react";
import {useAuthContext} from "../context/AuthContext";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false);

    const authContext = useAuthContext();

    const login = async ({email, password}) => {
        setError(null);
        setIsPending(true);

        const errorMessages = {
            "auth/invalid-credential": "Invalid Credentials. Please check and try again."
        };

        try {
            const response = await authContext.loginUserWithEmailAndPassword(email, password);

            if (!response) {
                throw new Error('Could not complete user login. Please try again');
            }

            const userInfo = await response.user;
            const accessToken = await userInfo.accessToken;
            await localStorage.setItem('auth_token', accessToken);

            setIsPending(false);
            setError(null);
            setIsSignIn(true);

        } catch (error) {
            console.log(error.code);
            const errorCode = error.code;
            const errorMessage = errorMessages[errorCode] || "An error occurred. Please try again.";
            setError(errorMessage);
            setIsPending(false);
        }
    }

    return {isSignIn, error, isPending, login};

}