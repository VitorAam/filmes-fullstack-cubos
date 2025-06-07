import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react"
import type { ReactElement } from "react";

interface FormField {
    error: boolean;
    errorMessage: string;
    label: string;
    children: ReactElement
}

export const FormField = ({ error, errorMessage, label, children }: FormField) => {
    return (
        <FormControl isInvalid={error}>
            <FormLabel htmlFor="email" color={'mauve.12'} fontWeight={700} fontSize={'12px'} >{label}</FormLabel>
            {children}
            <FormErrorMessage>{errorMessage}</FormErrorMessage>
        </FormControl>
    )
}