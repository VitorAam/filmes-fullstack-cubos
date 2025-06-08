import { Box, Flex, Text } from "@chakra-ui/react"
import { SecondaryButton } from "./Buttons/SecondaryButton"
import { PrimaryButton } from "./Buttons/PrimaryButton"

interface DetailsHeaderProps {
    title: string
    id: string
}

export const DetailsHeader = ({ title, id }: DetailsHeaderProps) => {
    return (
        <Flex h={'min-content'} alignItems={'center'} w={'full'} justifyContent={'space-between'} flexDir={{ base: 'column-reverse', md: 'row' }} gap={2} >
            <Box textAlign={{base: 'center', md: 'left'}} >
                <Text color={'mauve.12'} fontSize={'32px'} fontWeight={600} >{title}</Text>
                <Text fontSize={{base: '14px', md:'16px'}} color={{ base: 'mauve.11', md: 'mauve.12' }}  >Título original: {title}</Text>
            </Box>

            <Flex gap={{ base: 2, md: 4 }} w={{base: 'full', md: 'max-content'}} justifyContent={'center'} >
                <SecondaryButton maxW={'91px'} fontWeight={400} onClick={() => console.log(id)} >
                    <Text>Deletar</Text>
                </SecondaryButton>
                <PrimaryButton w={'full'} maxW={{ base: '283px', md: '82px' }} onClick={() => console.log(id)} >
                    <Text>Editar</Text>
                </PrimaryButton>
            </Flex>
        </Flex >
    )
}