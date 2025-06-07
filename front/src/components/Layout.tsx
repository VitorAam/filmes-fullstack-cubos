import { Box, Flex } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface LayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Flex flexDir={'column'} minH={'100svh'}>
            <Header />
            <Box bgColor={'mauve.1'} flex={'1'}>{children}</Box>
            <Footer />
        </Flex>
    )
}