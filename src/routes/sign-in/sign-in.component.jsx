import {signInWithGooglePopup} from "../../services/firebase/firebase.service";

export const SignIn = function () {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    };
    return (
        <>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </>
    );
};