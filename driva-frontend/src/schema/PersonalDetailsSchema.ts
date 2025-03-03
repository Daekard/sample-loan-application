import {z} from "zod";
import {SelectOption} from "../types/types.ts";

export const EmploymentStatus: SelectOption[] = [
    {value: "EMPLOYED", label: "Employed"},
    {value: "UNEMPLOYED", label: "Unemployed"},
    {value: "SELF_EMPLOYED", label: "Self Employed"}
] as const;

const EmploymentStatusValues: string[] = EmploymentStatus.map((status) => status.value as string);

export const PersonalDetailsSchema = z.object({
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    email: z.string().nonempty("Email is required").email("Invalid email address"),
    employmentStatus: z.enum([EmploymentStatusValues[0], ...EmploymentStatusValues.slice(1)]),
    employerName: z.string()
}).refine((data) => data.employmentStatus === 'EMPLOYED' ? data.employerName !== '' : true, {
    message: 'Employer name is required',
    path: ['employerName']
})

export type PersonalDetailsData = z.infer<typeof PersonalDetailsSchema>;