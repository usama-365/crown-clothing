import "./form-input.styles.scss";

export const FormInput = function ({label, inputAttributes}) {
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