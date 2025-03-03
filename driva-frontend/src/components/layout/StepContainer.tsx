import {Footer} from "./Footer.tsx";
import {HasTestId} from "../../types/types.ts";

export interface StepContainerProps extends HasTestId {
    children: React.ReactNode;
    onNextHandler?: () => void;
    onPreviousHandler?: () => void;
    footerDisabled?: boolean;
}

export function StepContainer({
    children,
    onNextHandler,
    onPreviousHandler,
    footerDisabled,
    testId
}: StepContainerProps) {
    return (
        <div data-testid={testId}>
            {children}
            <Footer
                onPreviousHandler={onPreviousHandler}
                onNextHandler={onNextHandler}
                testId={`${testId}-footer`}
                disabled={footerDisabled}
            />
        </div>
    );
}