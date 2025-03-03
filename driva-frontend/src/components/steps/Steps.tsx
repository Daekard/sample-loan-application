import PersonalDetails from "./PersonalDetails.tsx";
import LoanDetails from "./LoanDetails.tsx";
import ReviewOffers from "./ReviewOffers.tsx";
import {FormSchemaData} from "../../schema/FormSchema.ts";
import {FieldPath} from "react-hook-form";
import * as React from "react";

/**
 * Represents a step in a form or a process flow. Each step is characterized by a title, an optional path
 * denoting the corresponding property in the form schema, a React component responsible
 * for the UI, and the step index.
 */
export type Step = {
    title: string;
    path?: FieldPath<FormSchemaData>;
    component: React.ReactElement;
}

/**
 * Defines each step in the user journey
 */
export const Steps: Step[] = [
    {
        title: "Personal Details",
        path: "personalDetails",
        component: <PersonalDetails/>,
    },
    {
        title: "Loan Details",
        path: "loanDetails",
        component: <LoanDetails/>,
    },
    {
        title: "Review Offers",
        component: <ReviewOffers/>,
    }
];