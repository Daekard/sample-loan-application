"use client";

import {LoanTermOptions, LoanTypes} from "../../schema/LoanDetailsSchema.ts";
import {useFormContext} from "react-hook-form";
import Input from "../ui/Input.tsx";
import Select from "../ui/Select.tsx";
import {useContextOrError} from "../../hooks/UseContextOrError.ts";
import {StepContainer} from "../layout/StepContainer.tsx";
import {FormSchemaData} from "../../schema/FormSchema.ts";
import {MultiStepFormContext} from "../form/MultiStepFormContext.tsx";

export default function LoanDetails() {

    const {
        register,
        formState: {errors}
    } = useFormContext<FormSchemaData>();

    const {handleNext, handlePrevious, isLoading} = useContextOrError(MultiStepFormContext)

    const testId = "loanDetails";

    return (
        <StepContainer onNextHandler={handleNext} onPreviousHandler={handlePrevious} footerDisabled={isLoading}
                       testId={testId}>
            <div className="flex flex-col gap-4">
                <Input
                    label="Approximate Purchase Price ($)"
                    type="number"
                    placeholder="2000"
                    error={errors.loanDetails?.amount}
                    {...register("loanDetails.amount")}
                    inputMode={"numeric"}
                    testId={`${testId}-amount`}
                />
                <Input
                    label="Deposit ($)"
                    type="number"
                    placeholder="0"
                    error={errors.loanDetails?.deposit}
                    {...register("loanDetails.deposit")}
                    testId={`${testId}-deposit`}
                />
                <Select
                    label={"Loan Purpose"}
                    options={LoanTypes}
                    error={errors.loanDetails?.loanType}
                    {...register("loanDetails.loanType")}
                    testId={`${testId}-loanType`}
                />
                <Select
                    label={"Loan Term"}
                    options={LoanTermOptions}
                    error={errors.loanDetails?.loanTerm}
                    {...register("loanDetails.loanTerm")}
                    testId={`${testId}-loanTerm`}
                />
            </div>
        </StepContainer>
    );
}