import { Button } from "@chakra-ui/react"
import type { ReactElement, ComponentProps } from "react"

type PrimaryButtonProps = {
    children: ReactElement
} & ComponentProps<typeof Button>

export const PrimaryButton = ({ children, ...rest }: PrimaryButtonProps) => {
    return (
        <Button
            borderRadius={'2px'}
            bgColor={'purple.8'}
            color={'white'}
            fontWeight={400}
            _hover={{ backgroundColor: 'purple.9' }}
            _active={{ backgroundColor: 'purple.7' }}
            _disabled={{backgroundColor: 'mauve.9', color: 'mauveAlpha.10'}}
            p={'12px 20px'}
            {...rest}
        >
            {children}
        </Button>
    )
}