import { Box, Text } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <Box textAlign={'center'} p={{ base: 5, md: 6 }} bgColor={'mauve.1'} borderTop={'1px solid'} borderColor={'mauveAlpha.6'} >
            <Text color={'mauve.11'} >2025 © Todos os direitos reservados a <Text as={'span'} fontWeight={600} >Cubos Movies</Text></Text>
        </Box>
    )
}