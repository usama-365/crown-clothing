import {getOrCreateUserDocument, signInWithGooglePopup} from "../../services/firebase/firebase.service";
import {SignUpForm} from "../../components/sign-up-form/sign-up-form.component";

export const SignIn = function () {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await getOrCreateUserDocument(response.user);
    };
    return (
        <>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
            <SignUpForm/>
        </>
    );
};