import { Button, Flex, Image, Text, Icon } from "@chakra-ui/react"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Moon from "./icons/Moon"
import Sun from "./icons/Sun"

export const Header = () => {
    const { isDark, toggleTheme } = useContext(ThemeContext)

    return (
        <Flex p={{ base: 5, md: 6 }} borderBottom={'1px solid'} borderColor={'mauveAlpha.6'} bgColor={'mauve.1'} justifyContent={'space-between'} >
            <Flex gap={4} alignItems={'center'} >
                <Image display={{ base: 'none', md: 'inline' }} w={'160px'} h={'36px'} src={`/cubos-logo-desktop${isDark ? '' : '-light'}.svg`} />
                <Image display={{ base: 'inline', md: 'none' }} src={`/cubos-logo-mobile${isDark ? '' : '-light'}.svg`} />
                <Text color={'mauve.12'} fontWeight={700} fontSize={'20px'}>Movies</Text>
            </Flex>

            <Flex gap={2} >
                <Button borderRadius={'2px'} onClick={toggleTheme} w={'64px'} h={'44px'} bgColor={'purpleAlpha.2'} _hover={{backgroundColor: 'purpleAlpha.3'}} _active={{backgroundColor: 'purpleAlpha.1'}}>
                    <Icon h={'24px'} w={'24px'} as={isDark ? Sun : Moon} />
                </Button>
                <Button borderRadius={'2px'} w={'90px'} h={'44px'} bgColor={'purple.8'} color={'mauve.12'} >Logout</Button>
            </Flex>
        </Flex>
    )
}