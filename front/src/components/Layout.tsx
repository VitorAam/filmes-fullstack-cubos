import { Box, Flex } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"

interface LayoutProps {
    children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
    return (
        <Flex flexDir={'column'} minH={'100vh'} justifyContent={'space-between'}  >
            <Header />
            <Box>{children}</Box>
            <Footer />
        </Flex>
    )
}