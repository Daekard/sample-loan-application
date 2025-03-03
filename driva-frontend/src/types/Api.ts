export type BaseEntity = {
    id?: number;
}

export enum FeeType {
    APPLICATION = "APPLICATION",
    PROCESSING = "PROCESSING"
}

export type LenderOffer = {
    lenderName: string;
    interestRate: number;
    monthlyPayment: number;
    fee: number | null;
    feeType: FeeType | null;
} & BaseEntity;

