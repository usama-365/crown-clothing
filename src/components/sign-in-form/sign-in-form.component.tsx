import {ChangeEventHandler, FormEventHandler, useState} from "react";
import {FormInput} from "../form-input/form-input.component";
import {Button, BUTTON_TYPES_CLASS} from "../button/button.component";
import "./sign-in-form.styles.scss";
import {useDispatch} from "react-redux";
import {emailSignInStart, googleSignInStart} from "../../store/user/user.action";

const defaultFormFields = {
    email: "",
    password: ""
};

export const SignInForm = function () {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const dispatch = useDispatch();
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const resetFormFields = () => setFormFields(defaultFormFields);

    const handleSubmit: FormEventHandler<HTMLFormElement> = async function (event) {
        event.preventDefault();
        dispatch(emailSignInStart(email, password));
        resetFormFields();
    };

    const handleGoogleSignIn = async function () {
        dispatch(googleSignInStart());
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
                        buttonType={BUTTON_TYPES_CLASS.google}
                        buttonAttributes={{
                            onClick: handleGoogleSignIn
                        }}
                    >Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};