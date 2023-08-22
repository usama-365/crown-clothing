import "./form-input.styles.scss";
import {InputHTMLAttributes} from "react";

export type FormInputPropTypes = {
    label: string,
    inputAttributes: InputHTMLAttributes<HTMLInputElement> & { value: string }
}

export const FormInput = function ({label, inputAttributes}: FormInputPropTypes) {
    return (
        <div className="form__group">
            <input className="form__input" {...inputAttributes} />
            {label && (
                <label className={`form__label ${inputAttributes.value.length && "form__label--shrunk"}`}>
                    {label}
                </label>
            )}
        </div>
    );
};