import { Button } from "@chakra-ui/react"
import type { ReactElement, ComponentProps } from "react"

type SecondaryButtonProps = {
    children: ReactElement
} & ComponentProps<typeof Button>

export const SecondaryButton = ({ children, ...rest }: SecondaryButtonProps) => {
    return (
        <Button
            borderRadius={'2px'}
            bgColor={'purpleAlpha.2'}
            color={'purpleAlpha.12'}
            _hover={{ backgroundColor: 'purpleAlpha.3' }}
            _active={{ backgroundColor: 'purpleAlpha.1' }}
            _disabled={{backgroundColor:'mauveAlpha.3', color: 'mauveAlpha.10'}}
            {...rest}
        >
            {children}
        </Button>
    )
}