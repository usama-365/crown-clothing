import './button.styles.scss';

const BUTTON_TYPES_CLASS = {
    google: 'btn--google',
    inverted: 'btn--inverted'
};

export const Button = function ({children, buttonType, buttonAttributes}) {
    return (
        <button {...buttonAttributes} className={`btn ${BUTTON_TYPES_CLASS[buttonType]}`}>{children}</button>
    );
};