import {useState} from "react";
import {getOrCreateUserDocument, signUpWithEmailAndPassword} from "../../services/firebase/firebase.service";
import {FormInput} from "../form-input/form-input.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

export const SignUpForm = function () {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async function (event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const {user} = await signUpWithEmailAndPassword(email, password);
            await getOrCreateUserDocument(user, {displayName});
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/email-already-in-use":
                    alert("Cannot create user, email already exists");
                    break;
                default:
                    alert(`User creation encountered an error: ${error}`);
                    break;
            }
        }
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};