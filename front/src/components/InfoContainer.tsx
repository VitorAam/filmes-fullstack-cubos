import { Box, Flex, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"

interface InfoContainerProps {
    info: string | Array<string> | number,
    title: string,
    fontSize?: '16px' | '14px',
    type?: 'text' | 'genres'
    desktopSize?: string
    maxW?: string | number
}

export const InfoContainer = ({ info, title, fontSize, type, desktopSize, maxW }: InfoContainerProps) => {
    const { isDark } = useContext(ThemeContext)

    return (
        <Flex w={{ base: 'full', md: desktopSize ?? 'max-content' }} maxW={{ base: 'full', md: maxW ?? '416px' }} h={'min-content'} flexDir={'column'} fontSize={fontSize ?? '14px'} p={'16px'} gap={'8px'} textAlign={'left'} bgColor={'rgba(35, 34, 37, 0.6)'}  >
            <Text color={isDark ? 'mauve.11' : 'mauve.3'} fontWeight={700}>{title.toUpperCase()}</Text>
            {type !== 'genres' ? (
                <Text color={isDark ? 'mauve.12' : 'mauve.4'}>{info}</Text>
            ) : (
                <Flex gap={2} wrap={'wrap'} >
                    {(info as Array<string>)?.map(genre => <Box key={genre} bgColor={'purpleAlpha.3'} p={2} color={'purple.11'} fontWeight={600} fontSize={'12px'} >{genre.toUpperCase()}</Box>)}
                </Flex>
            )}
        </Flex>
    )
}