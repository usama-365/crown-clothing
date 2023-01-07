import {useState} from "react";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

export const SignUpForm = function () {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={() => {
            }}>
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