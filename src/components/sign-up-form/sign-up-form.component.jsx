import {useState} from "react";
import {getOrCreateUserDocument, signUpWithEmailAndPassword} from "../../services/firebase/firebase.service";

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
                case 'auth/email-already-in-use':
                    alert('Cannot create user, email already exists');
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
                <label>Display Name</label>
                <input name="displayName" type="text" onChange={handleChange} value={displayName} required/>
                <label>Email</label>
                <input name="email" type="text" onChange={handleChange} value={email} required/>
                <label>Password</label>
                <input name="password" type="password" onChange={handleChange} value={password} required/>
                <label>Confirm Password</label>
                <input name="confirmPassword" type="password" onChange={handleChange} value={confirmPassword} required/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};