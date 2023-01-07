import {SignUpForm} from "../../components/sign-up-form/sign-up-form.component";
import {SignInForm} from "../../components/sign-in-form/sign-in-form.component";
import './sign-in.styles.scss'

export const SignIn = function () {
    return (
        <div className="forms">
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
};