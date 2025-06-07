import { Box, Text } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <Box textAlign={'center'} p={{ base: 5, md: 6 }} >
            <Text>2025 © Todos os direitos reservados a <Text as={'span'} fontWeight={600} >Cubos Movies</Text></Text>
        </Box>
    )
}