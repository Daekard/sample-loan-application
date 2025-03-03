import {FieldError} from "react-hook-form";
import {SelectOption, HasTestId} from "../../types/types.ts";
import ErrorMessage from "./ErrorMessage.tsx";
import {Label} from "./Label.tsx";
import {SelectHTMLAttributes} from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, HasTestId {
    label: string;
    options: SelectOption[],
    error: FieldError | undefined
}

function Select({label, options, error, testId, ...props}: SelectProps) {
    return (
        <div data-testid={testId}>
            <Label label={label} testId={`${testId}-label`}/>
            <select data-testid={`${testId}-select`} {...props}
                    className={"shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" + (error ? " border-red-500" : "")}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.label}</option>
                ))}
            </select>
            {error && <ErrorMessage error={error} testId={`${testId}-errorMessage`}/>}
        </div>
    );
}

export default Select;