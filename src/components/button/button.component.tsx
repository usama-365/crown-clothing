import './button.styles.scss';
import {ButtonHTMLAttributes, ReactNode} from "react";

export enum BUTTON_TYPES_CLASS {
    default = 'btn--default',
    google = 'btn--google',
    inverted = 'btn--inverted'
}

export type ButtonPropsType = {
    buttonType?: BUTTON_TYPES_CLASS,
    buttonAttributes: ButtonHTMLAttributes<HTMLButtonElement>,
    children: ReactNode
}

export const Button = function ({
                                    children,
                                    buttonType = BUTTON_TYPES_CLASS.default,
                                    buttonAttributes
                                }: ButtonPropsType) {
    return (

        <button {...buttonAttributes} className={`btn ${buttonType}`}>{children}</button>
    );
};