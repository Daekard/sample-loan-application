import {FieldError} from "react-hook-form";
import {InputHTMLAttributes} from "react";
import {restrictNumberInput} from "../../lib/utils.ts";
import ErrorMessage from "./ErrorMessage.tsx";
import {Label} from "./Label.tsx";
import {HasTestId} from "../../types/types.ts";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, HasTestId {
    label: string;
    type: string;
    placeholder: string;
    error?: FieldError;
}

function Input({label, type, placeholder, error, testId, ...props}: InputProps) {
    return (
        <div data-testid={testId}>
            <Label label={label} testId={`${testId}-label`}/>
            <input
                className={"border rounded w-full py-2 px-3 text-gray-700 mb-3" + (error ? " border-red-500" : "")}
                type={type}
                placeholder={placeholder}
                {...props}
                {...(type === 'number') ? {onKeyDown: restrictNumberInput} : {}}
                data-testid={`${testId}-input`}
            />
            {error && <ErrorMessage error={error} testId={`${testId}-errorMessage`}/>}
        </div>
    );
}

export default Input;