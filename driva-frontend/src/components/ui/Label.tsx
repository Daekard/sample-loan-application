import {HasTestId} from "../../types/types.ts";

export interface LabelProps extends HasTestId {
    label: string;
}

export function Label({label, testId}: LabelProps) {
    return (
        <label data-testid={testId} className="block mb-2 text-gray-600 text-lg font-medium">{label}</label>
    );
}