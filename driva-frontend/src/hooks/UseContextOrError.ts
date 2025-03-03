import {Context, useContext} from "react";

/**
 * Custom hook to ensure the context is available.
 * If the context is not available, an error is thrown.
 * @param context The context being requested
 */
export const useContextOrError = <T>(context: Context<T | null>) => {
    const contextValue = useContext(context)
    if (!contextValue) {
        throw Error("Context not found")
    }
    return contextValue;
}