import {createContext} from "react";
import {Step} from "../steps/Steps.tsx";
import {LenderOffer} from "../../types/Api.ts";

export type MultiStepFormContextProps = {
    currentStep: Step;
    steps: Step[];
    currentStepNumber: number;
    handleNext: () => void;
    handlePrevious: () => void;
    clearMultiStepFormState: () => void;
    isLoading: boolean;
    response: LenderOffer[];
}

/**
 * Context for the multi-step form component. Use to read/update the form state and navigate between steps.
 * Shares the current step, current step index, and methods to navigate between steps.
 */
export const MultiStepFormContext = createContext<MultiStepFormContextProps | null>(null);