import {StepContainer} from "../layout/StepContainer.tsx";
import {LenderOfferSummary} from "../ui/LenderOfferSummary.tsx";
import {useContextOrError} from "../../hooks/UseContextOrError.ts";
import {MultiStepFormContext} from "../form/MultiStepFormContext.tsx";
import {useEffect} from "react";

export default function ReviewOffers() {

    const {response, clearMultiStepFormState} = useContextOrError(MultiStepFormContext);

    // If we successfully navigated to the review step, clear the form state so we can start again
    useEffect(() => {
        clearMultiStepFormState()
    }, [])

    return (
        <StepContainer testId={"reviewOffers"}>
            <div className="relative mb-5 p-4 text-center rounded-lg shadow bg-gray-200 sm:p-5">
                <div data-testid="reviewOffers-successMessage"
                     className="size-16 rounded-full bg-green-100 dark:bg-emerald-600 p-2 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="size-12 text-emerald-200">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                </div>
                <p>Thanks for your application!</p>
                <p>Review the offers below and we will be in touch shortly.</p>
            </div>
            <div className="flex flex-col gap-3">
                {response.map((offer, index) => (
                    <LenderOfferSummary key={`lender-offer-${index}`} lenderOffer={offer} index={index}/>
                ))}
            </div>
        </StepContainer>
    )
        ;
}