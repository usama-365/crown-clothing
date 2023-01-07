import {signInWithGooglePopup, createUserDocumentFromAuth} from "../../services/firebase/firebase.service";

export const SignIn = function () {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        createUserDocumentFromAuth(response.user);
    };
    return (
        <>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </>
    );
};