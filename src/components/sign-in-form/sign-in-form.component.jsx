import {useContext, useState} from "react";
import {FormInput} from "../form-input/form-input.component";
import {Button} from "../button/button.component";
import "./sign-in-form.styles.scss";
import {signInEmailPassword, signInGoogle} from "../../services/firebase/firebase.service";
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    email: "",
    password: ""
};

export const SignInForm = function () {
    const { setCurrentUser } = useContext(UserContext);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleSubmit = async function (event) {
        event.preventDefault();
        const user = await signInEmailPassword(email, password);
        resetFormFields();
        setCurrentUser(user);
    };

    const handleGoogleSignIn = async function () {
        const user = await signInGoogle();
        setCurrentUser(user);
    };

    return (
        <div className="form">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    inputAttributes={{
                        value: email,
                        type: "email",
                        name: "email",
                        required: true,
                        onChange: handleChange
                    }}
                />
                <FormInput
                    label="Password"
                    inputAttributes={{
                        value: password,
                        type: "password",
                        name: "password",
                        required: true,
                        onChange: handleChange
                    }}
                />
                <div className="btns">
                    <Button
                        buttonAttributes={{
                            type: "submit"
                        }}
                    >Sign In</Button>
                    <Button
                        buttonType="google"
                        buttonAttributes={{
                            onClick: handleGoogleSignIn
                        }}
                    >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};