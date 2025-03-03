import {z} from "zod";
import {SelectOption} from "../types/types.ts";

// Constants for loan details validation
export const MinLoanAmount = 2000;
export const MaxLoanAmount = 50000;

export const MinDepositAmount = 0;
export const MaxDepositAmount = 48000;

export const MinLoanTermYears = 1;
export const MaxLoanTermYears = 7;

export const LoanTypes: SelectOption[] = [
    {value: "PERSONAL", label: "Personal Loan"},
    {value: "VEHICLE", label: "Vehicle"},
    {value: "HOME_IMPROVEMENT", label: "Home Improvement"},
    {value: "DEBT_CONSOLIDATION", label: "Debt Consolidation"},
] as const;

export const LoanTermOptions: SelectOption[] = [
    {value: 1, label: "1 Year"},
    {value: 2, label: "2 Years"},
    {value: 3, label: "3 Years"},
    {value: 4, label: "4 Years"},
    {value: 5, label: "5 Years"},
    {value: 6, label: "6 Years"},
    {value: 7, label: "7 Years"}
] as const;

const LoanTypeValues: string[] = LoanTypes.map((type) => type.value as string);

export const LoanDetailsSchema = z.object({
    amount: z.coerce.number()
        .min(2000, `Purchase price must be at least $${MinLoanAmount}`)
        .max(50000, `Purchase price must be at most $${MaxLoanAmount}`),
    deposit: z.coerce.string().nonempty(`Deposit must be at least $${MinDepositAmount}`)
        .pipe(z.coerce.number()
            .min(0, `Deposit must be at least $${MinDepositAmount}`)
            .max(50000, `Deposit must be at most $${MaxDepositAmount}`)),
    loanTerm: z.coerce.number().int()
        .min(MinLoanTermYears, `Loan term must be at least ${MinLoanTermYears} Year`)
        .max(MaxLoanTermYears, `Loan term must be at most ${MaxLoanTermYears} Years`),
    loanType: z.enum([LoanTypeValues[0], ...LoanTypeValues.slice(1)]),
}).refine((data) => {
    return !(data.amount - data.deposit < MinLoanAmount);
}, {
    message: `The minimum loan amount is $${MinLoanAmount}. Adjust purchase price or deposit.`,
    path: ['deposit']
})

export type LoanDetailsData = z.infer<typeof LoanDetailsSchema>;
