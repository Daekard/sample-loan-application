import {HasTestId} from "../../types/types.ts";

export type ButtonType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends HasTestId {
    type: ButtonType;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}

export function Button({type, onClick, disabled, className, children, testId}: ButtonProps) {
    const classNames = 'text-white font-bold py-2 px-4 rounded bg-emerald-600 '
        + (disabled ? 'opacity-20 cursor-wait ' : 'focus:bg-emerald-800 hover:bg-emerald-800 cursor-pointer ')
        + (className ? className : '');
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classNames}
            data-testid={testId}
        >
            {children}
        </button>
    )
}