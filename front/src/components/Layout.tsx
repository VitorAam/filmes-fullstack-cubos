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
            <Flex flexDir={'column'} position={'fixed'} zIndex={-1}>
                <Box w={'100svw'} h={'50svh'} bgGradient="linear(to-b, mauve.1, backgroundLayer, mauve.1)" position={'absolute'} />
                <Box backgroundImage={'/background.svg'} backgroundPosition={'center'} backgroundSize={'cover'} backgroundRepeat={'no-repeat'} w={'100vw'} h={'50svh'} />
                <Box bgColor={'mauve.1'} w={'100svw'} h={'100svh'} />
            </Flex>
            <Box flex={'1'}>{children}</Box>
            <Footer />
        </Flex>
    )
}