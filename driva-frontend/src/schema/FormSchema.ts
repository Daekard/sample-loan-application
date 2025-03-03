import {PersonalDetailsSchema} from "./PersonalDetailsSchema.ts";
import {LoanDetailsSchema} from "./LoanDetailsSchema.ts";
import {z} from "zod";

/**
 * Defines the schema for each of the forms used in the multi-step form
 */
export const FormSchema = z.object({
    loanDetails: LoanDetailsSchema,
    personalDetails: PersonalDetailsSchema
})

export type FormSchemaData = z.infer<typeof FormSchema>;