import {FieldError} from "react-hook-form";
import {HasTestId} from "../../types/types.ts";

export interface ErrorMessageProps extends HasTestId {
    error: FieldError
}

export default function ErrorMessage({error, testId}: ErrorMessageProps) {
    return (
        <span data-testid={testId} className="text-red-500">{`${error.message}`}</span>
    )
}