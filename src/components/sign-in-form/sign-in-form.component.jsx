import {useState} from "react";
import {FormInput} from "../form-input/form-input.component";
import {Button} from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: "",
    password: ""
};

export const SignInForm = function () {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="form">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form>
                <FormInput
                    label="Email"
                    inputAttributes={{
                        value: email,
                        type: "email",
                        name: "email",
                        onChange: handleChange
                    }}
                />
                <FormInput
                    label="Password"
                    inputAttributes={{
                        value: password,
                        type: "password",
                        name: "password",
                        onChange: handleChange
                    }}
                />
                <div className="btns">
                    <Button >Sign In</Button>
                    <Button buttonType="google">Google Sign In</Button>
                </div>
            </form>
        </div>

    )
}