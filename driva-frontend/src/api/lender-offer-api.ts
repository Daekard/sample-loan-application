import {LenderOffer} from "../types/Api.ts";
import {api} from "./client.ts";
import {PersonalDetailsData} from "../schema/PersonalDetailsSchema.ts";
import {LoanDetailsData} from "../schema/LoanDetailsSchema.ts";

// @see LenderOffeRrequestDto.java
export type LenderOfferRequestDto = {
    applicant: PersonalDetailsData;
    loanDetails: LoanDetailsData;
}

// Corresponding API endpoint: POST /lender-offers
export const getLenderOffers = (input: LenderOfferRequestDto): Promise<LenderOffer[]> => {
    return api.post<LenderOffer[]>('/lender-offers', input);
}