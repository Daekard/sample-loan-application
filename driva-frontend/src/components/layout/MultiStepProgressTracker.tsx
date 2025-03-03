import {useContextOrError} from "../../hooks/UseContextOrError.ts";
import {MultiStepFormContext} from "../form/MultiStepFormContext.tsx";

/**
 * Component to display the progress of a multi-step form.
 * Uses the shared context to determine the current step and the steps that have been completed.
 * //Todo: add buttons for navigating between steps if time permits
 */
export default function MultiStepProgressTracker() {
    const {steps, currentStepNumber} = useContextOrError(MultiStepFormContext)
    return (
        <div className='mb-14 items-center'>
            <div className='w-full'>
                <div className='relative flex justify-between'>
                    {steps.map((step) => {
                        const stepNumber = steps.indexOf(step)
                        const isStepCompleted = currentStepNumber > stepNumber
                        const isCurrentStep = currentStepNumber === stepNumber

                        return (
                            <div key={stepNumber} className='relative' data-testid={`progress-${step.title}`}>
                                <div
                                    className={`flex size-16 items-center justify-center rounded-full border-2  ${
                                        isStepCompleted || isCurrentStep
                                            ? 'bg-emerald-600 border-emerald-600 text-white'
                                            : 'bg-white text-gray-400 border-grey-400'
                                    }`}
                                >
                                    <span className="text-lg font-bold">{stepNumber + 1}</span>
                                </div>
                                <div className="text-center text-gray-600 absolute text-sm font-medium">
                                    {step.title}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
