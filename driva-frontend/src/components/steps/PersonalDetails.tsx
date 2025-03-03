"use client";

import {EmploymentStatus} from "../../schema/PersonalDetailsSchema.ts";
import {useFormContext} from "react-hook-form";
import Input from "../ui/Input.tsx";
import Select from "../ui/Select.tsx";
import {useState} from "react";
import {FormSchemaData} from "../../schema/FormSchema.ts";
import {useContextOrError} from "../../hooks/UseContextOrError.ts";
import {StepContainer} from "../layout/StepContainer.tsx";
import {MultiStepFormContext} from "../form/MultiStepFormContext.tsx";

/**
 * Renders the PersonalDetails component, which is a form step for collecting personal details from the user.
 * This includes fields for first name, last name, email, employment status, and employer name.
 * The employer name field is conditionally displayed based on the selected employment status.
 */
export default function PersonalDetails() {
    const {
        register,
        formState: {errors},
        setValue,
    } = useFormContext<FormSchemaData>();

    const {handleNext} = useContextOrError(MultiStepFormContext)

    const [showEmployerNameField, setShowEmployerNameField] = useState(true);

    const testId = "personalDetails";

    /**
     * Simple handler to hide and clear the employer name field when the user selects a different employment status
     */
    const handleEmploymentStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isEmployedSelected = e.target.value === "EMPLOYED";
        if (!isEmployedSelected) setValue("personalDetails.employerName", "")
        setShowEmployerNameField(isEmployedSelected)
    }

    return (
        <StepContainer onNextHandler={handleNext} testId={testId}>
            <div className="flex flex-col gap-4">
                <fieldset>
                    <Input
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        error={errors.personalDetails?.firstName}
                        {...register("personalDetails.firstName")}
                        testId={`${testId}-firstName`}
                    />
                    <Input
                        label="Last Name"
                        type="text"
                        placeholder="Last name"
                        error={errors.personalDetails?.lastName}
                        {...register("personalDetails.lastName")}
                        testId={`${testId}-lastName`}
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Email Address"
                        error={errors.personalDetails?.email}
                        {...register("personalDetails.email")}
                        testId={`${testId}-email`}
                    />
                    <Select
                        label="Employment Status"
                        options={EmploymentStatus}
                        error={errors.personalDetails?.employmentStatus}
                        {...register("personalDetails.employmentStatus", {
                            onChange: handleEmploymentStatus
                        })}
                        testId={`${testId}-employmentStatus`}
                    />
                    {showEmployerNameField ?
                        <Input
                            label="Employer Name"
                            type="text"
                            placeholder="Employer Name"
                            error={errors.personalDetails?.employerName}
                            {...register("personalDetails.employerName")}
                            testId={`${testId}-employerName`}
                        />
                        : null
                    }
                </fieldset>
            </div>
        </StepContainer>
    );
}