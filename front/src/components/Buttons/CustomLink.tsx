import { Link } from "@chakra-ui/react"
import type { ReactElement, ComponentProps } from "react"

type CustomLinkProps = {
    children: ReactElement | string
} & ComponentProps<typeof Link>

export const CustomLink = ({ children, ...rest }: CustomLinkProps) => {
    return (
        <Link
            borderRadius={'2px'}
            color={'purple.8'}
            textDecoration={'underline'}
            {...rest}
        >
            {children}
        </Link>
    )
}