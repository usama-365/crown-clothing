import {useContext, useState} from "react";
import {FormInput} from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import {Button} from "../button/button.component";
import {signUpEmailPassword} from "../../services/firebase/firebase.service";
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

export const SignUpForm = function () {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const handleSubmit = async function (event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const user = await signUpEmailPassword(displayName, email, password);
        resetFormFields();
        setCurrentUser(user);
    }

    return (
        <div className="form">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    inputAttributes={{
                        onChange: handleChange,
                        value: displayName,
                        name: "displayName",
                        type: "text"
                    }}
                />
                <FormInput
                    label="Email"
                    inputAttributes={{
                        onChange: handleChange,
                        value: email,
                        name: "email",
                        type: "text"
                    }}
                />
                <FormInput
                    label="Password"
                    inputAttributes={{
                        onChange: handleChange,
                        value: password,
                        name: "password",
                        type: "password"
                    }}
                />
                <FormInput
                    label="Confirm Password"
                    inputAttributes={{
                        onChange: handleChange,
                        value: confirmPassword,
                        name: "confirmPassword",
                        type: "password"
                    }}
                />
                <Button buttonAttributes={{type: 'submit'}}>Sign Up</Button>
            </form>
        </div>
    );
};