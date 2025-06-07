import { Flex, Image, Text, Icon } from "@chakra-ui/react"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import Moon from "./icons/Moon"
import Sun from "./icons/Sun"
import { SecondaryButton } from "./Buttons/SecondaryButton"
import { PrimaryButton } from "./Buttons/PrimaryButton"
import { useLocation, useNavigate } from "react-router-dom"

export const Header = () => {
    const { isDark, toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const location = useLocation();
    const pathname = location.pathname;
    const isLogged = false

    return (
        <Flex p={{ base: 5, md: 6 }} borderBottom={'1px solid'} borderColor={'mauveAlpha.6'} bgColor={'header'} justifyContent={'space-between'} >
            <Flex gap={4} alignItems={'center'} >
                <Image display={{ base: 'none', md: 'inline' }} w={'160px'} h={'36px'} src={`/cubos-logo-desktop${isDark ? '' : '-light'}.svg`} />
                <Image display={{ base: 'inline', md: 'none' }} src={`/cubos-logo-mobile${isDark ? '' : '-light'}.svg`} />
                <Text color={'mauve.12'} fontWeight={700} fontSize={'20px'}>Movies</Text>
            </Flex>

            <Flex gap={2} >
                <SecondaryButton onClick={toggleTheme} w={'64px'} h={'44px'}>
                    <Icon h={'24px'} w={'24px'} as={isDark ? Sun : Moon} />
                </SecondaryButton>
                {isLogged ? (
                    <PrimaryButton h="44px">
                        <Text>Logout</Text>
                    </PrimaryButton>
                ) : pathname === "/cadastro" ? (
                    <PrimaryButton h="44px" onClick={() => navigate("/login")}>
                        <Text>Login</Text>
                    </PrimaryButton>
                ) : (
                    <PrimaryButton h="44px" onClick={() => navigate("/cadastro")}>
                        <Text>Cadastrar</Text>
                    </PrimaryButton>
                )}
            </Flex>
        </Flex>
    )
}