import { Flex } from "@chakra-ui/react"
import { Background } from "./Background"
import { Header } from "./Header"
import { Outlet } from "react-router-dom"
import { Footer } from "./Footer"

export const Layout = () => {
  return (
    <Flex flexDir="column" minH="100svh">
      <Header />
      <Background />
      <Flex flex="1">
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  )
}