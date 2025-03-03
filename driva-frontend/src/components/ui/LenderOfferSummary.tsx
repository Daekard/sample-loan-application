import {FeeType, LenderOffer} from "../../types/Api.ts";

export interface LenderOfferSummaryProps {
    lenderOffer: LenderOffer;
    index: number;
}

export function LenderOfferSummary({lenderOffer, index}: LenderOfferSummaryProps) {

    const getFeeTypeLabel = (feeType: FeeType | null) => {
        switch (feeType) {
            case FeeType.APPLICATION:
                return "Application";
            case FeeType.PROCESSING:
                return "Processing";
            default:
                return "";
        }
    }

    return (
        <div className="p-4 lender-offer" data-testid={`lenderOffer-${index}`}>
            <h2 className="text-xl font-bold rounded-sm p-4 bg-emerald-100">{lenderOffer.lenderName}</h2>
            <div className="field p-4">
                <label>Interest Rate:</label>
                <span>{lenderOffer.interestRate}% APR</span>
            </div>
            <div className="field p-4">
                <label>Monthly Repayment:</label>
                <span>${lenderOffer.monthlyPayment.toFixed(2)}</span>
            </div>
            <div className="field p-4">
                <label>Fee:</label>
                <span>${lenderOffer.fee ? `${lenderOffer.fee.toFixed(2)} ${getFeeTypeLabel(lenderOffer.feeType)} Fee` : "0"} </span>
            </div>
        </div>
    )
}