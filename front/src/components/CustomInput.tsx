import { Input } from "@chakra-ui/react"
import type { ComponentProps } from "react";

type CustomInputProps = {
    placeholder?: string;
} & ComponentProps<typeof Input>

export const CustomInput = ({ placeholder, ...rest }: CustomInputProps) => {
    return (
        <Input
            border={'1px solid'}
            borderColor={'mauve.6'}
            borderRadius={'4px'}
            bgColor={'mauve.2'}
            color={'mauve.12'}
            _placeholder={{ color: 'mauve.9', fontWeight: 400 }}
            _hover={{ borderColor: 'mauve.6' }}
            _focus={{ borderColor: 'purple.8', boxShadow: 'none' }}
            placeholder={placeholder}
            {...rest}
        />
    )
}