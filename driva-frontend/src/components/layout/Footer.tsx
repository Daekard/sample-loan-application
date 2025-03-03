import {Button} from "../ui/Button.tsx";
import {HasTestId} from "../../types/types.ts";

export interface FooterProps extends HasTestId {
    onPreviousHandler?: () => void;
    onNextHandler?: () => void;
    disabled?: boolean;
}

/**
 * Footer component for the multi-step form. Contains buttons to navigate between steps.
 */
export function Footer({onPreviousHandler, onNextHandler, disabled, testId}: FooterProps) {
    return (
        <footer data-testid={testId} className="flow-root">
            {onPreviousHandler &&
                <Button type={"button"}
                        onClick={onPreviousHandler}
                        disabled={disabled}
                        className={"float-left"}
                        children={"Previous"}
                        testId={`${testId}-previous`}/>
            }
            {onNextHandler &&
                <Button type={"button"}
                        onClick={onNextHandler}
                        disabled={disabled}
                        className={"float-right"}
                        children={"Next"}
                        testId={`${testId}-next`}/>}
        </footer>
    );
}