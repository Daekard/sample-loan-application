import {FormSchema, FormSchemaData} from "../../schema/FormSchema.ts";
import {FormProvider, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {loadFromSessionStorage} from "../../lib/utils.ts";
import {MultiStepFormContext, MultiStepFormContextProps} from "./MultiStepFormContext.tsx";
import {Step} from "../steps/Steps.tsx";
import MultiStepProgressTracker from "../layout/MultiStepProgressTracker.tsx";
import {LenderOffer} from "../../types/Api.ts";
import {getLenderOffers} from "../../api/lender-offer-api.ts";

export interface MultiStepFormProps {
    steps: Step[];
}

export type MultiStepFormState = {
    stepNumber: number;
    formData: FormSchemaData | null;
}

/**
 * Renders a multi-step form component that manages the state of the form across multiple steps.
 * @param steps
 * @constructor
 */
export function MultiStepForm({steps}: MultiStepFormProps) {

    const sessionStorageKey = 'driva-application-state';

    // Initialize the state from the session storage if it exists. This preserves state on refresh.
    // A state management library would be easier to use
    function initializeState() {
        const storedState = loadFromSessionStorage<MultiStepFormState>(sessionStorageKey);
        return storedState || {
            stepNumber: 0,
            formData: null
        }
    }

    const [multiStepFormState, setMultiStepFormState] = useState<MultiStepFormState>(initializeState());
    const [currentStepNumber, setCurrentStepNumber] = useState(multiStepFormState.stepNumber)
    const [response, setResponse] = useState<LenderOffer[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const currentStep = steps[currentStepNumber];

    const methods = useForm<FormSchemaData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            loanDetails: {
                amount: 15000,
                deposit: 0
            }
        }
    });

    useEffect(() => {
        // If the form state exists in the session storage, restore the form data and the current step
        if (multiStepFormState && currentStepNumber !== steps.length - 1) {
            sessionStorage.setItem(sessionStorageKey, JSON.stringify(multiStepFormState));
            if (multiStepFormState.formData) {
                methods.reset(multiStepFormState.formData);
            }
        }
    }, [multiStepFormState]);

    const updateFormState = (stepNumber: number) => {
        const formData = methods.getValues();
        setMultiStepFormState({
            stepNumber: stepNumber,
            formData: formData
        });
    }

    // Clear the form state from the form context and session storage after submission
    const clearMultiStepFormState = () => {
        methods.reset()
        window.sessionStorage.removeItem(sessionStorageKey)
    }

    // Handle the next button click which will validate the form and proceed to the next step
    // If the next step is the last step, submit the data and set the response in the context
    const handleNext = async () => {
        // If the current step has a path corresponding to the `FormSchema`, validate the form
        if (currentStep.path) {
            const isFormValidated = await methods.trigger(currentStep.path);

            if (!isFormValidated) {
                return
            }
        }

        const nextStep = currentStepNumber + 1;

        // If the next step is the last, submit the data and set the response in the context
        if (nextStep === steps.length - 1) {
            setIsLoading(true);
            const {personalDetails, loanDetails} = methods.getValues();
            return getLenderOffers({applicant: personalDetails, loanDetails: loanDetails}).then(response => {
                setResponse(response);
                setIsLoading(false);
                updateFormState(nextStep);
                setCurrentStepNumber(nextStep);
            }).catch((error) => {
                setIsLoading(false);
                console.error(error);
            });
        } else {
            updateFormState(nextStep);
            setCurrentStepNumber(nextStep);
        }
    }

    const handlePrevious = () => {
        const previousStep = currentStepNumber - 1;
        updateFormState(previousStep);
        setCurrentStepNumber(previousStep);
    }

    const contextProps: MultiStepFormContextProps = {
        currentStep: steps[currentStepNumber],
        currentStepNumber: currentStepNumber,
        steps,
        handleNext,
        handlePrevious,
        clearMultiStepFormState,
        isLoading,
        response
    }

    return (
        <MultiStepFormContext.Provider value={contextProps}>
            <FormProvider {...methods}>
                <div className="w-[700px] mx-auto text-gray-500 bg-white rounded px-8 pt-8 pb-8">
                    <MultiStepProgressTracker/>
                    <form>
                        <h1 className="text-4xl font-bold py-4" data-testid="formHeading">{currentStep.title}</h1>
                        {currentStep.component}
                    </form>
                </div>
            </FormProvider>
        </MultiStepFormContext.Provider>
    );
}